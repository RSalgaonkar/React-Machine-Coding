import { useEffect, useRef, useState } from 'react';
import type { WorkspaceEvent } from '../types/workspace.types';
import { formatTime } from '../utils/time';
import styles from '../styles/workspace.module.css';

interface Props {
  events: WorkspaceEvent[];
  highlightedEventId: string | null;
  onHighlight: (eventId: string | null) => void;
}

export default function EventTimeline({
  events,
  highlightedEventId,
  onHighlight,
}: Props) {
  const [isReplaying, setIsReplaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleReplay = () => {
    if (!events.length) return;

    setIsReplaying(true);
    let index = 0;

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      const current = events[index];
      onHighlight(current?.id ?? null);

      index += 1;

      if (index >= events.length) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
        }
        setIsReplaying(false);
      }
    }, 700);
  };

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3>Event timeline</h3>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleReplay}
          disabled={isReplaying}
        >
          {isReplaying ? 'Replaying…' : 'Replay'}
        </button>
      </div>

      <ul className={styles.timelineList}>
        {events.map((event) => (
          <li
            key={event.id}
            className={`${styles.timelineItem} ${
              highlightedEventId === event.id ? styles.timelineItemActive : ''
            }`}
            onMouseEnter={() => onHighlight(event.id)}
            onMouseLeave={() => onHighlight(null)}
          >
            <div className={styles.timelineTop}>
              <strong>{event.type}</strong>
              <span>{formatTime(event.createdAt)}</span>
            </div>
            <p>{event.message}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}