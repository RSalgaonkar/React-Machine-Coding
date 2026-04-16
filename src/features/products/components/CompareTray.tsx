import type { Product } from '../redux/productsTypes';
import { formatCurrency } from '../utils/pricing';
import styles from './ProductsAdvanced.module.css';

interface Props {
  items: Product[];
  onToggle: (productId: number) => void;
  onClear: () => void;
}

export default function CompareTray({ items, onToggle, onClear }: Props) {
  if (!items.length) return null;

  return (
    <div className={styles.compareTray}>
      <div className={styles.compareTrayHeader}>
        <strong>Compare Products</strong>
        <button onClick={onClear}>Clear</button>
      </div>

      <div className={styles.compareGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.compareCard}>
            <h4>{item.title}</h4>
            <p>{formatCurrency(item.price)}</p>
            <p>⭐ {item.rating}</p>
            <p>Stock: {item.stock}</p>
            <p>{item.brand}</p>
            <button onClick={() => onToggle(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}