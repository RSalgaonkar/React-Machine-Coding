import type { ChatState } from '../types/chat.types';

export const initialChatState: ChatState = {
  currentUserId: 'u1',
  activeConversationId: 'c1',
  typingByConversation: {
    c1: true,
    c2: false,
    c3: false,
  },
  conversations: [
    {
      id: 'c1',
      participant: {
        id: 'u2',
        name: 'Aarav Sharma',
        avatar: 'AS',
        status: 'online',
      },
      lastMessage: 'Can we review the chat module today?',
      updatedAt: '10:42 AM',
      unreadCount: 2,
    },
    {
      id: 'c2',
      participant: {
        id: 'u3',
        name: 'Neha Patil',
        avatar: 'NP',
        status: 'offline',
        lastSeen: 'Yesterday',
      },
      lastMessage: 'I pushed the fixes for the products page.',
      updatedAt: '9:15 AM',
      unreadCount: 0,
    },
    {
      id: 'c3',
      participant: {
        id: 'u4',
        name: 'Rohan Naik',
        avatar: 'RN',
        status: 'online',
      },
      lastMessage: 'Looks good. Ship it.',
      updatedAt: 'Yesterday',
      unreadCount: 0,
    },
  ],
  messagesByConversation: {
    c1: [
      {
        id: 'm1',
        conversationId: 'c1',
        senderId: 'u2',
        text: 'Hey Rashmith, did you get time to check the machine coding app?',
        createdAt: '10:35 AM',
        status: 'read',
      },
      {
        id: 'm2',
        conversationId: 'c1',
        senderId: 'u1',
        text: 'Yes, I reviewed the structure and it looks good.',
        createdAt: '10:37 AM',
        status: 'read',
      },
      {
        id: 'm3',
        conversationId: 'c1',
        senderId: 'u2',
        text: 'Can we review the chat module today?',
        createdAt: '10:42 AM',
        status: 'sent',
      },
    ],
    c2: [
      {
        id: 'm4',
        conversationId: 'c2',
        senderId: 'u3',
        text: 'I pushed the fixes for the products page.',
        createdAt: '9:15 AM',
        status: 'read',
      },
    ],
    c3: [
      {
        id: 'm5',
        conversationId: 'c3',
        senderId: 'u4',
        text: 'Looks good. Ship it.',
        createdAt: 'Yesterday',
        status: 'read',
      },
    ],
  },
};