import styles from './CheckboxTree.module.css';

interface Props {
  title: string;
  subtitle: string;
}

export default function TreeHeader({ title, subtitle }: Props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}