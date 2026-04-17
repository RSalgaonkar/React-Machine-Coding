import { useState } from 'react';
import styles from '../ChatLayout.module.css';

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  };

  return (
    <div className={styles.messageInputWrap}>
      <input
        className={styles.messageInput}
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSend();
          }
        }}
      />

      <button type="button" className={styles.sendButton} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}