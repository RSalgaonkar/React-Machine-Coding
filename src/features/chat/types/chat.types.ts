export type UserStatus = 'online' | 'offline';
export type MessageStatus = 'sending' | 'sent' | 'read';

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
  status: MessageStatus;
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
  isBootstrapped: boolean;
}

export type ChatAction =
  | { type: 'BOOTSTRAP'; payload: ChatState }
  | { type: 'SELECT_CONVERSATION'; payload: { conversationId: string } }
  | { type: 'SEND_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'RECEIVE_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'MARK_CONVERSATION_READ'; payload: { conversationId: string } }
  | { type: 'SET_TYPING'; payload: { conversationId: string; isTyping: boolean } }
  | { type: 'HYDRATION_COMPLETE' };