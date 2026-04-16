import type { Product } from '../types';
import styles from './Products.module.css';

interface Props {
  product: Product | null;
  formatCurrency: (value: number) => string;
  isWishlisted: boolean;
  onClose: () => void;
  onWishlist: () => void;
  onAddToCart: () => void;
}

export default function ProductQuickViewModal({
  product,
  formatCurrency,
  isWishlisted,
  onClose,
  onWishlist,
  onAddToCart,
}: Props) {
  if (!product) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Quick view">
      <div className={styles.modalCard}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close quick view">
          ✕
        </button>

        <div className={styles.modalLayout}>
          <img src={product.thumbnail} alt={product.title} className={styles.modalImage} />

          <div className={styles.modalContent}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> {formatCurrency(product.price)}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Tags:</strong> {product.tags.join(', ')}</p>

            <div className={styles.productActions}>
              <button className={styles.secondaryButton} onClick={onWishlist}>
                {isWishlisted ? 'Remove Wishlist' : 'Add Wishlist'}
              </button>
              <button className={styles.primaryButton} onClick={onAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}