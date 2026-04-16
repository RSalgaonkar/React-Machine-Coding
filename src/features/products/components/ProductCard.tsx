import { isLowStock, isOutOfStock } from '../utils/productHelpers';
import type { Product } from '../types';
import styles from './Products.module.css';

interface Props {
  product: Product;
  isWishlisted: boolean;
  formatCurrency: (value: number) => string;
  onWishlist: () => void;
  onAddToCart: () => void;
  onQuickView: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  formatCurrency,
  onWishlist,
  onAddToCart,
  onQuickView,
}: Props) {
  const outOfStock = isOutOfStock(product.stock);
  const lowStock = isLowStock(product.stock);

  return (
    <article className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
        {product.isTrending && <span className={styles.badgeTrending}>Trending</span>}
        {lowStock && <span className={styles.badgeWarning}>Only {product.stock} left</span>}
        {outOfStock && <span className={styles.badgeDanger}>Out of stock</span>}
      </div>

      <div className={styles.productBody}>
        <div className={styles.productMetaRow}>
          <span className={styles.categoryBadge}>{product.category}</span>
          <button
            className={styles.iconButton}
            onClick={onWishlist}
            aria-label={`Toggle wishlist for ${product.title}`}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>

        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.ratingRow}>
          <span>⭐ {product.rating}</span>
          <span>({product.reviewCount} reviews)</span>
        </div>

        <div className={styles.priceRow}>
          <strong>{formatCurrency(product.price)}</strong>
          {product.originalPrice ? (
            <span className={styles.strikePrice}>{formatCurrency(product.originalPrice)}</span>
          ) : null}
        </div>

        <div className={styles.deliveryText}>Delivery: {product.estimatedDelivery}</div>

        <div className={styles.productActions}>
          <button className={styles.secondaryButton} onClick={onQuickView}>
            Quick View
          </button>
          <button
            className={styles.primaryButton}
            onClick={onAddToCart}
            disabled={outOfStock}
          >
            {outOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}