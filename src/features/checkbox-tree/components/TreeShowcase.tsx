import type { TreeNode } from '../types';
import CheckboxTree from './CheckboxTree';
import styles from './CheckboxTree.module.css';

interface Props {
  data: TreeNode[];
}

export default function TreeShowcase({ data }: Props) {
  return (
    <section className={styles.showcaseSection}>
      <div className={styles.showcaseIntro}>
        <span className={styles.showcaseBadge}>Featured React Component</span>
        <h1 className={styles.showcaseTitle}>Advanced Checkbox Tree</h1>
        <p className={styles.showcaseDescription}>
          A production-style recursive tree built with React, TypeScript,
          Framer Motion, URL persistence, lazy-loaded children, keyboard
          navigation, and testable business logic.
        </p>
      </div>

      <CheckboxTree data={data} title="Checkbox Tree — Premium Demo" />
    </section>
  );
}