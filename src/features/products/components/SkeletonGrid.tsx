import styles from './ProductsAdvanced.module.css';

export default function SkeletonGrid() {
  return (
    <div className={styles.productGrid}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonButton} />
        </div>
      ))}
    </div>
  );
}