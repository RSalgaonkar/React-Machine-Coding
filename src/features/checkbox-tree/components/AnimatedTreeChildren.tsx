import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
}

export default function AnimatedTreeChildren({ isVisible, children }: Props) {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}