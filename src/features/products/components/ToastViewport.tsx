import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch } from '../../../app/hooks';
import { removeToast } from '../redux/productsSlice';
import type { ToastMessage } from '../redux/productsTypes';
import styles from './ProductsAdvanced.module.css';

interface Props {
  toasts: ToastMessage[];
}

export default function ToastViewport({ toasts }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.toastViewport} aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}
          >
            <span>{toast.message}</span>
            <button onClick={() => dispatch(removeToast(toast.id))}>✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}