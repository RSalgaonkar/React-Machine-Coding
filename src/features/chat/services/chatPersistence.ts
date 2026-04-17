import type { ChatState } from '../types/chat.types';

const STORAGE_KEY = 'react-machine-coding-chat';

export function loadChatState(): ChatState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChatState;
  } catch {
    return null;
  }
}

export function saveChatState(state: ChatState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // noop
  }
}