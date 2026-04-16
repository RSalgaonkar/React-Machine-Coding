// import { Link } from 'react-router-dom';
// import ProductGrid from '../components/products/ProductGrid';
// import PageHeader from '../components/ui/PageHeader';

// export default function ProductsPage() {
//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Product Listing"
//         description="Product grid with add-to-cart flow and shared cart state."
//       />

//       <ProductGrid />

//       <Link
//         to="/checkout"
//         className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white"
//       >
//         Go to Checkout
//       </Link>
//     </div>
//   );
// }

import {
  CartDrawer,
  ProductFilters,
  ProductGrid,
  ProductHeader,
  ProductQuickViewModal,
  ProductStatsBar,
  useProducts,
} from '../features/products';

export default function ProductsPage() {
  const {
    state,
    categories,
    filteredProducts,
    quickViewProduct,
    activeCartItems,
    freeShippingRemaining,
    formatCurrency,
    setSearch,
    setCategory,
    setSortBy,
    toggleWishlist,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    saveForLater,
    openCart,
    closeCart,
    openQuickView,
    closeQuickView,
  } = useProducts();

  return (
    <section className="page">
      <ProductHeader
        cartCount={activeCartItems.length}
        wishlistCount={state.wishlist.length}
        onOpenCart={openCart}
      />

      <ProductStatsBar
        totalProducts={filteredProducts.length}
        cartItems={activeCartItems.length}
        freeShippingRemaining={
          freeShippingRemaining === 0 ? 'Unlocked' : formatCurrency(freeShippingRemaining)
        }
      />

      <ProductFilters
        categories={categories}
        selectedCategory={state.selectedCategory}
        search={state.search}
        sortBy={state.sortBy}
        onSearch={setSearch}
        onCategory={setCategory}
        onSort={setSortBy}
      />

      <ProductGrid
        products={filteredProducts}
        wishlist={state.wishlist}
        formatCurrency={formatCurrency}
        onWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onQuickView={openQuickView}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        formatCurrency={formatCurrency}
        isWishlisted={quickViewProduct ? state.wishlist.includes(quickViewProduct.id) : false}
        onClose={closeQuickView}
        onWishlist={() => {
          if (quickViewProduct) toggleWishlist(quickViewProduct.id);
        }}
        onAddToCart={() => {
          if (quickViewProduct) addToCart(quickViewProduct.id);
        }}
      />

      <CartDrawer
        isOpen={state.isCartOpen}
        items={activeCartItems}
        formatCurrency={formatCurrency}
        onClose={closeCart}
        onIncrement={incrementQty}
        onDecrement={decrementQty}
        onRemove={removeFromCart}
        onSaveForLater={saveForLater}
      />
    </section>
  );
}