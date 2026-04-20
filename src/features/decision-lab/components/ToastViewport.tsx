import React from 'react';
import styles from '../styles/DecisionLab.module.css';

interface ToastItem {
  id: string;
  title: string;
  message: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className={styles.toastViewport}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toastCard} ${
            toast.tone ? styles[`toast${toast.tone}`] : styles.toastinfo
          }`}
        >
          <div className={styles.toastText}>
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>
          <button
            type="button"
            className={styles.toastClose}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;