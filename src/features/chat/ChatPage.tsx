import ChatLayout from './components/ChatLayout';
import { useChatController } from './hooks/useChatController';
import styles from './ChatPage.module.css';

export default function ChatPage() {
  const chat = useChatController();

  return (
    <section className={styles.page}>
      <div className={styles.headerBlock}>
        <h2 className={styles.title}>Chat Feature</h2>
        <p className={styles.subtitle}>
          Production-style chat module with reducer state, local persistence, typing simulation, unread tracking, and socket-ready integration.
        </p>
      </div>

      <ChatLayout {...chat} />
    </section>
  );
}