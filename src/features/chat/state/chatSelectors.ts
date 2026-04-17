import type { ChatState } from '../types/chat.types';

export function selectActiveConversation(state: ChatState) {
  return (
    state.conversations.find(
      (conversation) => conversation.id === state.activeConversationId
    ) ?? null
  );
}

export function selectActiveMessages(state: ChatState) {
  if (!state.activeConversationId) return [];
  return state.messagesByConversation[state.activeConversationId] ?? [];
}

export function selectIsTyping(state: ChatState) {
  if (!state.activeConversationId) return false;
  return state.typingByConversation[state.activeConversationId] ?? false;
}