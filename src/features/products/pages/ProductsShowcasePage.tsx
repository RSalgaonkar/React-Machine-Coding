import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addToCart,
  addToRecentlyViewed,
  clearCompare,
  closeCart,
  closeQuickView,
  openCart,
  openQuickView,
  removeFromCart,
  setCategory,
  setDebouncedSearch,
  setProductsLoading,
  setSearch,
  setSortBy,
  toggleCompare,
  toggleWishlist,
  incrementCartQty,
  decrementCartQty,
} from '../redux/productsSlice';
import {
  selectCompareProducts,
  selectFilteredProducts,
  selectProducts,
  selectProductsState,
  selectQuickViewProduct,
  selectActiveCartItems,
  selectPricing,
} from '../redux/productsSelectors';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import PromoBanner from '../components/PromoBanner';
import SkeletonGrid from '../components/SkeletonGrid';
import CompareTray from '../components/CompareTray';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import CartDrawer from '../components/CartDrawer';
import ToastViewport from '../components/ToastViewport';
import { useProductsKeyboardShortcuts } from '../hooks/useProductsKeyboardShortcuts';
import styles from '../components/ProductsAdvanced.module.css';
import { formatCurrency } from '../utils/pricing';

export default function ProductsShowcasePage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectProductsState);
  const products = useAppSelector(selectProducts);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const compareProducts = useAppSelector(selectCompareProducts);
  const quickViewProduct = useAppSelector(selectQuickViewProduct);
  const cartItems = useAppSelector(selectActiveCartItems);

  const debouncedSearch = useDebouncedValue(state.search, 450);

  useEffect(() => {
    dispatch(setDebouncedSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(setProductsLoading(true));
    const timer = window.setTimeout(() => {
      dispatch(setProductsLoading(false));
    }, 900);
    return () => window.clearTimeout(timer);
  }, [dispatch, state.debouncedSearch, state.selectedCategory, state.sortBy]);

  useProductsKeyboardShortcuts({
    onCartOpen: () => dispatch(openCart()),
    onCheckoutNext: () => {},
    onCheckoutPrev: () => {},
    onApplyCoupon: () => {},
  });

  return (
    <section className="page">
      <PromoBanner promoEndsAt={state.promoEndsAt} />

      <div className={styles.pageHeader}>
        <div>
          <h2>Advanced Products Showcase</h2>
          <p>Redux Toolkit ecommerce module with comparison, quick view, cart drawer, and motion.</p>
        </div>
        <button onClick={() => dispatch(openCart())}>Open Cart ({cartItems.length})</button>
      </div>

      <div className={styles.filtersRow}>
        <input
          className={styles.input}
          placeholder="Search products..."
          value={state.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <select
          className={styles.input}
          value={state.selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value as typeof state.selectedCategory))}
        >
          <option value="All">All</option>
          <option value="Accessories">Accessories</option>
          <option value="Workspace">Workspace</option>
          <option value="Audio">Audio</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
        </select>

        <select
          className={styles.input}
          value={state.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as typeof state.sortBy))}
        >
          <option value="featured">Featured</option>
          <option value="price-low-high">Price Low to High</option>
          <option value="price-high-low">Price High to Low</option>
          <option value="rating-high">Top Rated</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </div>

      {state.isLoadingProducts ? (
        <SkeletonGrid />
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              className={styles.productCard}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <img src={product.thumbnail} alt={product.title} className={styles.productImage} />

              <div className={styles.productBody}>
                <div className={styles.productTopRow}>
                  <span>{product.category}</span>
                  <div className={styles.cardActions}>
                    <button onClick={() => dispatch(toggleWishlist(product.id))}>
                      {state.wishlist.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button onClick={() => dispatch(toggleCompare(product.id))}>
                      {state.compare.includes(product.id) ? 'Compared' : 'Compare'}
                    </button>
                  </div>
                </div>

                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <strong>₹{product.price}</strong>

                <div className={styles.cardButtons}>
                  <button
                    onClick={() => {
                      dispatch(addToRecentlyViewed(product.id));
                      dispatch(openQuickView(product.id));
                    }}
                  >
                    Quick View
                  </button>
                  <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <CompareTray
        items={compareProducts}
        onToggle={(id) => dispatch(toggleCompare(id))}
        onClear={() => dispatch(clearCompare())}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        formatCurrency={formatCurrency}
        isWishlisted={quickViewProduct ? state.wishlist.includes(quickViewProduct.id) : false}
        isCompared={quickViewProduct ? state.compare.includes(quickViewProduct.id) : false}
        onClose={() => dispatch(closeQuickView())}
        onWishlist={() => quickViewProduct && dispatch(toggleWishlist(quickViewProduct.id))}
        onCompare={() => quickViewProduct && dispatch(toggleCompare(quickViewProduct.id))}
        onAddToCart={() => quickViewProduct && dispatch(addToCart(quickViewProduct))}
      />

      <CartDrawer
        open={state.isCartOpen}
        items={cartItems}
        onClose={() => dispatch(closeCart())}
        onInc={(id) => dispatch(incrementCartQty(id))}
        onDec={(id) => dispatch(decrementCartQty(id))}
        onRemove={(id) => dispatch(removeFromCart(id))}
      />

      <ToastViewport toasts={state.toasts} />
    </section>
  );
}