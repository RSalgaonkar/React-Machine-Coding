import React from 'react';
import styles from '../styles/DecisionLab.module.css';

interface ActivityItem {
  id: string;
  actorName: string;
  message: string;
  timestamp: string | number;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <section className={styles.surfaceCardTall}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Activity Rail</h2>
          <p className={styles.sectionSubheading}>Live and replayable collaboration feed</p>
        </div>
        <span className={styles.countBadge}>{activities.length}</span>
      </div>

      <div className={styles.panelScroll}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.timelineRow}>
            <span className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <h3 className={styles.timelineActor}>{activity.actorName}</h3>
              <p className={styles.timelineMessage}>{activity.message}</p>
              <span className={styles.timelineTime}>
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;