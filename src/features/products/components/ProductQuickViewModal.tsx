import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { Product } from '../redux/productsTypes';
import { formatCurrency } from '../utils/pricing';
import styles from './ProductsAdvanced.module.css';

interface Props {
  product: Product | null;
  isWishlisted: boolean;
  isCompared: boolean;
  onClose: () => void;
  onWishlist: () => void;
  onCompare: () => void;
  onAddToCart: () => void;
  formatCurrency: (amount: number) => string;

}

export default function ProductQuickViewModal({
  product,
  isWishlisted,
  isCompared,
  onClose,
  onWishlist,
  onCompare,
  onAddToCart,
  formatCurrency
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, Boolean(product), onClose);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Product quick view"
        >
          <motion.div
            ref={ref}
            className={styles.modalCard}
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
          >
            <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
              ✕
            </button>

            <div className={styles.modalLayout}>
              <img src={product.thumbnail} alt={product.title} className={styles.modalImage} />

              <div className={styles.modalContent}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> {formatCurrency(product.price)}</p>
                <p><strong>Rating:</strong> ⭐ {product.rating}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Stock:</strong> {product.stock}</p>

                <div className={styles.productActions}>
                  <button onClick={onWishlist}>
                    {isWishlisted ? 'Remove Wishlist' : 'Add Wishlist'}
                  </button>
                  <button onClick={onCompare}>
                    {isCompared ? 'Remove Compare' : 'Add Compare'}
                  </button>
                  <button onClick={onAddToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}