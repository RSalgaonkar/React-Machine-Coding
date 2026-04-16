import { Link } from 'react-router-dom';
import type { CartItem } from '../types';
import CartEmptyState from './CartEmptyState';
import CartItemCard from './CartItemCard';
import styles from './Products.module.css';

interface Props {
  isOpen: boolean;
  items: CartItem[];
  formatCurrency: (value: number) => string;
  onClose: () => void;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
  onSaveForLater: (productId: number) => void;
}

export default function CartDrawer({
  isOpen,
  items,
  formatCurrency,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onSaveForLater,
}: Props) {
  return (
    <aside className={`${styles.cartDrawer} ${isOpen ? styles.cartDrawerOpen : ''}`}>
      <div className={styles.cartDrawerHeader}>
        <h3>Your Cart</h3>
        <button onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      <div className={styles.cartDrawerBody}>
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              formatCurrency={formatCurrency}
              onIncrement={() => onIncrement(item.id)}
              onDecrement={() => onDecrement(item.id)}
              onRemove={() => onRemove(item.id)}
              onSaveForLater={() => onSaveForLater(item.id)}
            />
          ))
        )}
      </div>

      <div className={styles.cartDrawerFooter}>
        <Link to="/checkout" className={styles.primaryButton} onClick={onClose}>
          Go to Checkout
        </Link>
      </div>
    </aside>
  );
}