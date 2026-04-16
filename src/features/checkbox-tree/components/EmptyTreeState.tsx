import styles from './CheckboxTree.module.css';

interface Props {
  title: string;
  description: string;
}

export default function EmptyTreeState({ title, description }: Props) {
  return (
    <div className={styles.emptyState}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}