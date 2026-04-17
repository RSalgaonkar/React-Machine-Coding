import type { ChatAction, ChatState, Conversation, Message } from '../types/chat.types';

function updateConversationMeta(
  conversations: Conversation[],
  conversationId: string,
  updates: Partial<Conversation>
) {
  const next = conversations.map((conversation) =>
    conversation.id === conversationId
      ? { ...conversation, ...updates }
      : conversation
  );

  return next.sort((a, b) => {
    if (a.id === conversationId) return -1;
    if (b.id === conversationId) return 1;
    return 0;
  });
}

function appendMessage(
  messagesByConversation: ChatState['messagesByConversation'],
  conversationId: string,
  message: Message
) {
  return {
    ...messagesByConversation,
    [conversationId]: [...(messagesByConversation[conversationId] ?? []), message],
  };
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'BOOTSTRAP':
      return action.payload;

    case 'HYDRATION_COMPLETE':
      return { ...state, isBootstrapped: true };

    case 'SELECT_CONVERSATION': {
      const { conversationId } = action.payload;

      return {
        ...state,
        activeConversationId: conversationId,
        conversations: state.conversations.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unreadCount: 0 }
            : conversation
        ),
      };
    }

    case 'SEND_MESSAGE': {
      const { conversationId, message } = action.payload;

      return {
        ...state,
        messagesByConversation: appendMessage(state.messagesByConversation, conversationId, message),
        conversations: updateConversationMeta(state.conversations, conversationId, {
          lastMessage: message.text,
          updatedAt: message.createdAt,
        }),
        typingByConversation: {
          ...state.typingByConversation,
          [conversationId]: false,
        },
      };
    }

    case 'RECEIVE_MESSAGE': {
      const { conversationId, message } = action.payload;
      const isActive = state.activeConversationId === conversationId;

      return {
        ...state,
        messagesByConversation: appendMessage(state.messagesByConversation, conversationId, {
          ...message,
          status: isActive ? 'read' : 'sent',
        }),
        conversations: updateConversationMeta(state.conversations, conversationId, {
          lastMessage: message.text,
          updatedAt: message.createdAt,
          unreadCount: isActive
            ? 0
            : (state.conversations.find((item) => item.id === conversationId)?.unreadCount ?? 0) + 1,
        }),
        typingByConversation: {
          ...state.typingByConversation,
          [conversationId]: false,
        },
      };
    }

    case 'MARK_CONVERSATION_READ': {
      const { conversationId } = action.payload;

      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unreadCount: 0 }
            : conversation
        ),
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: (state.messagesByConversation[conversationId] ?? []).map((message) =>
            message.senderId !== state.currentUserId ? { ...message, status: 'read' } : message
          ),
        },
      };
    }

    case 'SET_TYPING': {
      const { conversationId, isTyping } = action.payload;
      return {
        ...state,
        typingByConversation: {
          ...state.typingByConversation,
          [conversationId]: isTyping,
        },
      };
    }

    default:
      return state;
  }
}