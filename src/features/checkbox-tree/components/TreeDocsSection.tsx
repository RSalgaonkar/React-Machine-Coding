import styles from './CheckboxTree.module.css';

interface Props {
  items: string[];
}

export default function TreeDocsSection({ items }: Props) {
  return (
    <section className={styles.docsSection}>
      <h3>What this feature demonstrates</h3>
      <ul className={styles.docsList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}