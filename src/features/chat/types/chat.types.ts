export type UserStatus = 'online' | 'offline';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
  status: 'sent' | 'read';
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
}

export interface ChatState {
  currentUserId: string;
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  activeConversationId: string | null;
  typingByConversation: Record<string, boolean>;
}