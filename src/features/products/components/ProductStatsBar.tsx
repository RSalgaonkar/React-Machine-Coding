import styles from './Products.module.css';

interface Props {
  totalProducts: number;
  cartItems: number;
  freeShippingRemaining: string;
}

export default function ProductStatsBar({
  totalProducts,
  cartItems,
  freeShippingRemaining,
}: Props) {
  return (
    <div className={styles.statsBar}>
      <div className={styles.statCard}>
        <strong>{totalProducts}</strong>
        <span>Visible products</span>
      </div>
      <div className={styles.statCard}>
        <strong>{cartItems}</strong>
        <span>Cart items</span>
      </div>
      <div className={styles.statCard}>
        <strong>{freeShippingRemaining}</strong>
        <span>Left for free shipping</span>
      </div>
    </div>
  );
}