// import CheckoutSummary from '../components/products/CheckoutSummary';
// import PageHeader from '../components/ui/PageHeader';

// export default function CheckoutPage() {
//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Checkout"
//         description="Cart review page with quantity increment/decrement and computed total."
//       />
//       <CheckoutSummary />
//     </div>
//   );
// }

import { CartSummary, CheckoutForm, useProducts } from '../features/products';
import styles from '../features/products/components/Products.module.css';

export default function CheckoutPage() {
  const {
    state,
    activeCartItems,
    savedForLaterItems,
    subtotal,
    discount,
    shipping,
    tax,
    grandTotal,
    formatCurrency,
    setCouponCode,
    applyCoupon,
    setShippingMethod,
    updateCheckoutField,
    placeOrder,
    removeFromCart,
    incrementQty,
    decrementQty,
    saveForLater,
    undoRemove,
  } = useProducts();

  return (
    <section className="page">
      <h2>Checkout</h2>

      {state.orderPlaced ? (
        <div className={styles.successBanner}>
          Order placed successfully. This checkout flow is now portfolio-ready.
        </div>
      ) : null}

      {state.lastRemovedItem ? (
        <div className={styles.undoBanner}>
          Item removed from cart.
          <button onClick={undoRemove}>Undo</button>
        </div>
      ) : null}

      <div className={styles.checkoutLayout}>
        <div>
          <div className={styles.checkoutCard}>
            <h3>Cart Items</h3>

            {activeCartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              activeCartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.thumbnail} alt={item.title} className={styles.cartItemImage} />
                  <div className={styles.cartItemBody}>
                    <h4>{item.title}</h4>
                    <div>{formatCurrency(item.price)}</div>
                    <div className={styles.qtyControls}>
                      <button onClick={() => decrementQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => incrementQty(item.id)}>+</button>
                    </div>
                    <div className={styles.inlineActions}>
                      <button onClick={() => saveForLater(item.id)}>Save for later</button>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {savedForLaterItems.length > 0 ? (
            <div className={styles.checkoutCard}>
              <h3>Saved For Later</h3>
              {savedForLaterItems.map((item) => (
                <div key={item.id} className={styles.savedItemRow}>
                  <span>{item.title}</span>
                  <button onClick={() => saveForLater(item.id)}>Move to cart</button>
                </div>
              ))}
            </div>
          ) : null}

          <CheckoutForm
            values={state.checkoutForm}
            errors={state.checkoutErrors}
            onChange={updateCheckoutField}
            onSubmit={placeOrder}
          />
        </div>

        <CartSummary
          subtotal={formatCurrency(subtotal)}
          discount={formatCurrency(discount)}
          shipping={formatCurrency(shipping)}
          tax={formatCurrency(tax)}
          total={formatCurrency(grandTotal)}
          couponCode={state.couponCode}
          appliedCoupon={state.appliedCoupon}
          onCouponChange={setCouponCode}
          onApplyCoupon={applyCoupon}
          shippingMethod={state.shippingMethod}
          onShippingChange={setShippingMethod}
        />
      </div>
    </section>
  );
}