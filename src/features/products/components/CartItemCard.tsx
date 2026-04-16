import type { CartItem } from '../types';
import styles from './Products.module.css';

interface Props {
  item: CartItem;
  formatCurrency: (value: number) => string;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onSaveForLater: () => void;
}

export default function CartItemCard({
  item,
  formatCurrency,
  onIncrement,
  onDecrement,
  onRemove,
  onSaveForLater,
}: Props) {
  return (
    <div className={styles.cartItem}>
      <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
      <div className={styles.cartItemBody}>
        <h4>{item.title}</h4>
        <div className={styles.cartItemPrice}>{formatCurrency(item.price)}</div>

        <div className={styles.qtyControls}>
          <button onClick={onDecrement} aria-label={`Decrease quantity for ${item.title}`}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={onIncrement} aria-label={`Increase quantity for ${item.title}`}>
            +
          </button>
        </div>

        <div className={styles.inlineActions}>
          <button onClick={onSaveForLater}>Save for later</button>
          <button onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}