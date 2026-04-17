import { useState } from 'react';
import styles from '../ChatLayout.module.css';

interface MessageInputProps {
  onSend: (text: string) => Promise<void>;
  onTyping: (value: string) => void;
}

export default function MessageInput({ onSend, onTyping }: MessageInputProps) {
  const [value, setValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!value.trim() || isSending) return;

    const message = value;
    setValue('');
    setIsSending(true);

    try {
      await onSend(message);
      onTyping('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.messageInputWrap}>
      <input
        className={styles.messageInput}
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          setValue(nextValue);
          onTyping(nextValue);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            void handleSend();
          }
        }}
      />

      <button
        type="button"
        className={styles.sendButton}
        onClick={() => void handleSend()}
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}