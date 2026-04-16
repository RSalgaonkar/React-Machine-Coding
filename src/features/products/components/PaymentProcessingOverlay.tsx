import { AnimatePresence, motion } from 'framer-motion';
import styles from './ProductsAdvanced.module.css';

interface Props {
  open: boolean;
}

export default function PaymentProcessingOverlay({ open }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.processingOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.processingCard}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <div className={styles.loaderCircle} />
            <h3>Processing Payment...</h3>
            <p>Please wait while we confirm your order.</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}