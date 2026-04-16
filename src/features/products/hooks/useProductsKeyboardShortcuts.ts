import { useEffect } from 'react';

interface Params {
  onCartOpen: () => void;
  onCheckoutNext: () => void;
  onCheckoutPrev: () => void;
  onApplyCoupon: () => void;
}

export const useProductsKeyboardShortcuts = ({
  onCartOpen,
  onCheckoutNext,
  onCheckoutPrev,
  onApplyCoupon,
}: Params) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key.toLowerCase() === 'c') {
        onCartOpen();
      }

      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        onCheckoutNext();
      }

      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        onCheckoutPrev();
      }

      if (event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        onApplyCoupon();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCartOpen, onCheckoutNext, onCheckoutPrev, onApplyCoupon]);
};