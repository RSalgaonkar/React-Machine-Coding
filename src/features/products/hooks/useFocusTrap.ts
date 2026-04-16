import { useEffect } from 'react';

const SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = (
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onClose?: () => void
) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const root = ref.current;
    const focusable = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    root.addEventListener('keydown', handleKeyDown);
    return () => root.removeEventListener('keydown', handleKeyDown);
  }, [active, onClose, ref]);
};