import { useEffect, useState } from 'react';
import type { TreeTheme } from '../types';

const STORAGE_KEY = 'checkbox-tree-theme';

export const useCheckboxTreeTheme = () => {
  const [theme, setTheme] = useState<TreeTheme>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as TreeTheme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');

    setTheme(nextTheme);
    document.documentElement.dataset.checkboxTreeTheme = nextTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.dataset.checkboxTreeTheme = next;
      return next;
    });
  };

  return {
    theme,
    toggleTheme,
  };
};