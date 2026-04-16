import { useEffect, useState } from 'react';
import type { TreeTheme } from '../types';

export const useCheckboxTreeTheme = () => {
  const [theme, setTheme] = useState<TreeTheme>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    toggleTheme,
  };
};