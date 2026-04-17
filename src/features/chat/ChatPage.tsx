import ChatLayout from './components/ChatLayout';
import { useChat } from './hooks/useChat';
import styles from './ChatPage.module.css';

export default function ChatPage() {
  const chat = useChat();

  return (
    <section className={styles.page}>
      <div className={styles.headerBlock}>
        <h2 className={styles.title}>Chat Feature</h2>
        <p className={styles.subtitle}>
          End-to-end machine coding chat module integrated into the existing app.
        </p>
      </div>

      <ChatLayout {...chat} />
    </section>
  );
}