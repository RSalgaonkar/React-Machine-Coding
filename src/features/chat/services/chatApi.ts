import type { Conversation, Message } from '../types/chat.types';
import { seedChatState } from '../data/seedChatData';

const API_BASE_URL = import.meta.env.VITE_CHAT_API_URL || '/api';

function simulateDelay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchConversations(): Promise<Conversation[]> {
  await simulateDelay();
  return seedChatState.conversations;
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  await simulateDelay();
  return seedChatState.messagesByConversation[conversationId] ?? [];
}

export async function sendMessageRequest(message: Message): Promise<Message> {
  await simulateDelay();
  return {
    ...message,
    status: 'sent',
  };
}

export async function markConversationReadRequest(conversationId: string): Promise<{ success: true; conversationId: string }> {
  await simulateDelay();
  return { success: true, conversationId };
}

export async function fetchBootstrapData() {
  const [conversations] = await Promise.all([fetchConversations()]);
  const messageEntries = await Promise.all(
    conversations.map(async (conversation) => [
      conversation.id,
      await fetchMessages(conversation.id),
    ] as const)
  );

  return {
    ...seedChatState,
    conversations,
    messagesByConversation: Object.fromEntries(messageEntries),
  };
}

export { API_BASE_URL };