import styles from './Products.module.css';

interface Props {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

export default function ProductHeader({ cartCount, wishlistCount, onOpenCart }: Props) {
  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>Products Showcase</h2>
        <p className={styles.subtitle}>
          Premium ecommerce experience with cart, checkout, filters, and smart pricing.
        </p>
      </div>

      <div className={styles.headerActions}>
        <button className={styles.iconButton} aria-label="Wishlist">
          ❤️ {wishlistCount}
        </button>
        <button className={styles.primaryButton} onClick={onOpenCart} aria-label="Open cart">
          Cart ({cartCount})
        </button>
      </div>
    </div>
  );
}