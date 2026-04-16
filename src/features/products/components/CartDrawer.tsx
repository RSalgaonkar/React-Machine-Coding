import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { CartItem } from '../redux/productsTypes';
import { formatCurrency } from '../utils/pricing';
import styles from './ProductsAdvanced.module.css';

interface Props {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onInc: (productId: number) => void;
  onDec: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          className={styles.drawerOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            className={styles.cartDrawer}
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className={styles.cartDrawerHeader}>
              <h3>Your Cart</h3>
              <button onClick={onClose} aria-label="Close cart">✕</button>
            </div>

            <div className={styles.cartDrawerBody}>
              {items.length === 0 ? (
                <div className={styles.emptyState}>Your cart is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
                    <div className={styles.cartItemBody}>
                      <h4>{item.title}</h4>
                      <div>{formatCurrency(item.price)}</div>
                      <div className={styles.qtyControls}>
                        <button onClick={() => onDec(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onInc(item.id)}>+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.cartDrawerFooter}>
              <Link to="/checkout-advanced" onClick={onClose}>
                Checkout
              </Link>
            </div>
          </motion.div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}