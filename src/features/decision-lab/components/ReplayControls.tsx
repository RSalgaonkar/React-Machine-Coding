import React from 'react';
import styles from '../styles/DecisionLab.module.css';

interface ReplayState {
  isReplayMode: boolean;
  isPlaying: boolean;
  cursor: number;
}

interface ReplayControlsProps {
  replay: ReplayState;
  totalSteps: number;
  onStart: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (value: number) => void;
}

function ReplayControls({
  replay,
  totalSteps,
  onStart,
  onStop,
  onPrev,
  onNext,
  onSeek,
}: ReplayControlsProps) {
  return (
    <section className={styles.surfaceCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Replay controls</h2>
          <p className={styles.sectionSubheading}>Walk through activity step by step</p>
        </div>
        <span className={styles.headerMeta}>
          {replay.isReplayMode ? 'Replay mode' : 'Live mode'}
        </span>
      </div>

      <div className={styles.replayActionRow}>
        <button type="button" className={styles.secondaryButton} onClick={onPrev}>
          Previous
        </button>

        {replay.isReplayMode ? (
          <button type="button" className={styles.primaryButton} onClick={onStop}>
            Stop replay
          </button>
        ) : (
          <button type="button" className={styles.primaryButton} onClick={onStart}>
            Start replay
          </button>
        )}

        <button type="button" className={styles.secondaryButton} onClick={onNext}>
          Next
        </button>
      </div>

      <div className={styles.sliderBlock}>
        <input
          type="range"
          className={styles.timelineSlider}
          min={0}
          max={Math.max(totalSteps - 1, 0)}
          value={Math.min(replay.cursor, Math.max(totalSteps - 1, 0))}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
        <div className={styles.sliderMeta}>
          <span>Cursor: {replay.cursor}</span>
          <span>Total steps: {totalSteps}</span>
        </div>
      </div>
    </section>
  );
}

export default ReplayControls;