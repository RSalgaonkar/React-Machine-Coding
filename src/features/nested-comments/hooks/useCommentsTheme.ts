import { useEffect, useState } from 'react';
import type { CommentsTheme } from '../types';

const STORAGE_KEY = 'nested-comments-theme';

export const useCommentsTheme = () => {
  const [theme, setTheme] = useState<CommentsTheme>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as CommentsTheme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');

    setTheme(nextTheme);
    document.documentElement.dataset.nestedCommentsTheme = nextTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.dataset.nestedCommentsTheme = next;
      return next;
    });
  };

  return {
    theme,
    toggleTheme,
  };
};