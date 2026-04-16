import styles from './Products.module.css';

export default function CartEmptyState() {
  return (
    <div className={styles.emptyBlock}>
      <h3>Your cart is empty</h3>
      <p>Add products to see pricing, shipping, and checkout summary.</p>
    </div>
  );
}