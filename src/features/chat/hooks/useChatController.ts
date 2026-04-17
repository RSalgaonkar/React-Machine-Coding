import { useEffect, useMemo, useReducer, useRef } from 'react';
import { seedChatState } from '../data/seedChatData';
import { fetchBootstrapData, markConversationReadRequest, sendMessageRequest } from '../services/chatApi';
import { loadChatState, saveChatState } from '../services/chatPersistence';
import { chatSocket } from '../services/chatSocket';
import { chatReducer } from '../state/chatReducer';
import { selectActiveConversation, selectActiveMessages, selectIsTyping } from '../state/chatSelectors';
import type { Message } from '../types/chat.types';

export function useChatController() {
  const [state, dispatch] = useReducer(chatReducer, seedChatState);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const persisted = loadChatState();
    if (persisted) {
      dispatch({ type: 'BOOTSTRAP', payload: persisted });
      dispatch({ type: 'HYDRATION_COMPLETE' });
      return;
    }

    fetchBootstrapData().then((data) => {
      dispatch({ type: 'BOOTSTRAP', payload: data });
      dispatch({ type: 'HYDRATION_COMPLETE' });
    });
  }, []);

  useEffect(() => {
    if (!state.isBootstrapped) return;
    saveChatState(state);
  }, [state]);

  useEffect(() => {
    chatSocket.connect();

    chatSocket.onMessage((message) => {
      dispatch({
        type: 'RECEIVE_MESSAGE',
        payload: {
          conversationId: message.conversationId,
          message,
        },
      });
    });

    chatSocket.onTyping(({ conversationId, isTyping }) => {
      dispatch({
        type: 'SET_TYPING',
        payload: { conversationId, isTyping },
      });
    });
  }, []);

  useEffect(() => {
    if (!state.activeConversationId) return;

    dispatch({
      type: 'MARK_CONVERSATION_READ',
      payload: { conversationId: state.activeConversationId },
    });

    void markConversationReadRequest(state.activeConversationId);
  }, [state.activeConversationId]);

  const activeConversation = useMemo(() => selectActiveConversation(state), [state]);
  const activeMessages = useMemo(() => selectActiveMessages(state), [state]);
  const isTyping = useMemo(() => selectIsTyping(state), [state]);

  const selectConversation = (conversationId: string) => {
    dispatch({ type: 'SELECT_CONVERSATION', payload: { conversationId } });
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !state.activeConversationId) return;

    const optimisticMessage: Message = {
      id: crypto.randomUUID(),
      conversationId: state.activeConversationId,
      senderId: state.currentUserId,
      text: trimmed,
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sending',
    };

    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        conversationId: state.activeConversationId,
        message: optimisticMessage,
      },
    });

    const confirmedMessage = await sendMessageRequest({
      ...optimisticMessage,
      status: 'sent',
    });

    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        conversationId: state.activeConversationId,
        message: {
          ...confirmedMessage,
          id: `${confirmedMessage.id}-confirmed`,
        },
      },
    });

    chatSocket.emitMessage(confirmedMessage);
  };

  const handleTyping = (value: string) => {
    if (!state.activeConversationId) return;

    chatSocket.emitTyping(state.activeConversationId, value.trim().length > 0);

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      if (state.activeConversationId) {
        chatSocket.emitTyping(state.activeConversationId, false);
      }
    }, 1200);
  };

  return {
    currentUserId: state.currentUserId,
    conversations: state.conversations,
    activeConversation,
    activeMessages,
    isTyping,
    selectConversation,
    sendMessage,
    handleTyping,
  };
}