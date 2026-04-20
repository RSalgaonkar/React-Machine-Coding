import React from 'react';
import styles from '../styles/DecisionLab.module.css';

interface Participant {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  isOnline: boolean;
}

interface ParticipantStripProps {
  participants: Participant[];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ParticipantStrip({ participants }: ParticipantStripProps) {
  const onlineCount = participants.filter((p) => p.isOnline).length;

  return (
    <section className={styles.surfaceCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Active collaborators</h2>
          <p className={styles.sectionSubheading}>People involved in this decision room</p>
        </div>
        <span className={styles.headerMeta}>{onlineCount} online</span>
      </div>

      <div className={styles.participantGrid}>
        {participants.map((participant) => (
          <article key={participant.id} className={styles.participantCard}>
            <div className={styles.participantTop}>
              <div className={styles.avatarCircle}>{getInitials(participant.name)}</div>
              <span
                className={`${styles.presenceBadge} ${
                  participant.isOnline ? styles.online : styles.offline
                }`}
              >
                {participant.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            <h3 className={styles.participantName}>{participant.name}</h3>
            <p className={styles.participantRole}>{participant.role}</p>
            {participant.specialty ? (
              <p className={styles.participantMeta}>{participant.specialty}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ParticipantStrip;