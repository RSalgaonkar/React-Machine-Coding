import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  applyCoupon,
  autofillMockAddress,
  completeOrder,
  setCheckoutErrors,
  setCheckoutStep,
  setCouponCode,
  setShippingMethod,
  startPaymentProcessing,
  updateCheckoutField,
} from '../redux/productsSlice';
import {
  selectActiveCartItems,
  selectPricing,
  selectProductsState,
} from '../redux/productsSelectors';
import { useProductsKeyboardShortcuts } from '../hooks/useProductsKeyboardShortcuts';
import CheckoutProgress from '../components/CheckoutProgress';
import AddressAutofillMock from '../components/AddressAutofillMock';
import PaymentProcessingOverlay from '../components/PaymentProcessingOverlay';
import ToastViewport from '../components/ToastViewport';
import styles from '../components/ProductsAdvanced.module.css';

const validateStep = (state: ReturnType<typeof selectProductsState>) => {
  const errors: Record<string, string> = {};
  const form = state.checkoutForm;

  if (state.checkoutStep === 'address') {
    if (!form.fullName.trim()) errors.fullName = 'Full name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.state.trim()) errors.state = 'State is required';
    if (!form.pincode.trim()) errors.pincode = 'Pincode is required';
  }

  return errors;
};

const steps = ['cart', 'address', 'payment', 'review'] as const;

export default function CheckoutAdvancedPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectProductsState);
  const cartItems = useAppSelector(selectActiveCartItems);
  const pricing = useAppSelector(selectPricing);

  const currentIndex = steps.indexOf(state.checkoutStep);

  const goNext = () => {
    const errors = validateStep(state);
    if (Object.keys(errors).length > 0) {
      dispatch(setCheckoutErrors(errors));
      return;
    }

    if (currentIndex < steps.length - 1) {
      dispatch(setCheckoutStep(steps[currentIndex + 1]));
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      dispatch(setCheckoutStep(steps[currentIndex - 1]));
    }
  };

  const submitOrder = () => {
    dispatch(startPaymentProcessing());

    window.setTimeout(() => {
      dispatch(
        completeOrder({
          id: `ORD-${nanoid(8)}`,
          createdAt: new Date().toISOString(),
          items: cartItems,
          subtotal: pricing.subtotal,
          discount: pricing.discount,
          shipping: pricing.shipping,
          tax: pricing.tax,
          total: pricing.total,
          customer: state.checkoutForm,
          coupon: state.appliedCoupon,
        })
      );
    }, 1800);
  };

  useProductsKeyboardShortcuts({
    onCartOpen: () => {},
    onCheckoutNext: goNext,
    onCheckoutPrev: goPrev,
    onApplyCoupon: () => dispatch(applyCoupon()),
  });

  return (
    <section className="page">
      <div className={styles.pageHeader}>
        <div>
          <h2>Advanced Checkout</h2>
          <p>Multi-step checkout with keyboard shortcuts, mock autofill, and fake payment processing.</p>
        </div>
      </div>

      <CheckoutProgress currentStep={state.checkoutStep} />

      <div className={styles.checkoutGrid}>
        <div className={styles.checkoutMain}>
          {state.checkoutStep === 'cart' && (
            <div className={styles.panel}>
              <h3>Cart Review</h3>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.checkoutItemRow}>
                  <span>{item.title} x {item.quantity}</span>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>
          )}

          {state.checkoutStep === 'address' && (
            <div className={styles.panel}>
              <div className={styles.rowBetween}>
                <h3>Delivery Address</h3>
                <AddressAutofillMock onAutofill={() => dispatch(autofillMockAddress())} />
              </div>

              <div className={styles.formGrid}>
                <input
                  className={styles.input}
                  placeholder="Full Name"
                  value={state.checkoutForm.fullName}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'fullName', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Email"
                  value={state.checkoutForm.email}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'email', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Phone"
                  value={state.checkoutForm.phone}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'phone', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Address"
                  value={state.checkoutForm.address}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'address', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="City"
                  value={state.checkoutForm.city}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'city', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="State"
                  value={state.checkoutForm.state}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'state', value: e.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Pincode"
                  value={state.checkoutForm.pincode}
                  onChange={(e) => dispatch(updateCheckoutField({ key: 'pincode', value: e.target.value }))}
                />
              </div>
            </div>
          )}

          {state.checkoutStep === 'payment' && (
            <div className={styles.panel}>
              <h3>Payment</h3>
              <select
                className={styles.input}
                value={state.checkoutForm.paymentMethod}
                onChange={(e) =>
                  dispatch(updateCheckoutField({ key: 'paymentMethod', value: e.target.value }))
                }
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>

              <div className={styles.shippingOptions}>
                <label>
                  <input
                    type="radio"
                    checked={state.shippingMethod === 'standard'}
                    onChange={() => dispatch(setShippingMethod('standard'))}
                  />
                  Standard
                </label>

                <label>
                  <input
                    type="radio"
                    checked={state.shippingMethod === 'express'}
                    onChange={() => dispatch(setShippingMethod('express'))}
                  />
                  Express
                </label>
              </div>
            </div>
          )}

          {state.checkoutStep === 'review' && (
            <div className={styles.panel}>
              <h3>Review & Place Order</h3>
              <p>Name: {state.checkoutForm.fullName}</p>
              <p>Email: {state.checkoutForm.email}</p>
              <p>Payment: {state.checkoutForm.paymentMethod}</p>
              <button onClick={submitOrder}>Confirm Order</button>
            </div>
          )}

          <div className={styles.stepActions}>
            <button onClick={goPrev} disabled={currentIndex === 0}>
              Previous
            </button>
            {state.checkoutStep !== 'review' ? (
              <button onClick={goNext}>Next</button>
            ) : null}
          </div>
        </div>

        <aside className={styles.summaryPanel}>
          <div className={styles.panel}>
            <h3>Order Summary</h3>

            <div className={styles.couponBox}>
              <input
                className={styles.input}
                placeholder="Coupon"
                value={state.couponCode}
                onChange={(e) => dispatch(setCouponCode(e.target.value))}
              />
              <button onClick={() => dispatch(applyCoupon())}>Apply</button>
            </div>

            <div className={styles.checkoutItemRow}><span>Subtotal</span><strong>₹{pricing.subtotal}</strong></div>
            <div className={styles.checkoutItemRow}><span>Discount</span><strong>₹{pricing.discount}</strong></div>
            <div className={styles.checkoutItemRow}><span>Shipping</span><strong>₹{pricing.shipping}</strong></div>
            <div className={styles.checkoutItemRow}><span>Tax</span><strong>₹{pricing.tax}</strong></div>
            <div className={styles.checkoutItemRow}><span>Total</span><strong>₹{pricing.total}</strong></div>
          </div>
        </aside>
      </div>

      <PaymentProcessingOverlay open={state.isPaymentProcessing} />
      <ToastViewport toasts={state.toasts} />
    </section>
  );
}