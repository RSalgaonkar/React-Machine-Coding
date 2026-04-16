import type { Product } from '../types';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

interface Props {
  products: Product[];
  wishlist: number[];
  formatCurrency: (value: number) => string;
  onWishlist: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

export default function ProductGrid({
  products,
  wishlist,
  formatCurrency,
  onWishlist,
  onAddToCart,
  onQuickView,
}: Props) {
  if (!products.length) {
    return <div className={styles.emptyBlock}>No products matched your filters.</div>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          formatCurrency={formatCurrency}
          onWishlist={() => onWishlist(product.id)}
          onAddToCart={() => onAddToCart(product.id)}
          onQuickView={() => onQuickView(product.id)}
        />
      ))}
    </div>
  );
}