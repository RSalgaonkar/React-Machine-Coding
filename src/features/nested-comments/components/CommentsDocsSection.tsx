import { nestedCommentsDocs } from '../docs/nestedCommentsDocs';
import styles from './NestedComments.module.css';

export default function CommentsDocsSection() {
  return (
    <section className={styles.docsSection}>
      <h3>Feature Notes</h3>
      <ul className={styles.docsList}>
        {nestedCommentsDocs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}