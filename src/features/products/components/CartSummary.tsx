import styles from './Products.module.css';

interface Props {
  subtotal: string;
  discount: string;
  shipping: string;
  tax: string;
  total: string;
  couponCode: string;
  appliedCoupon: string | null;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  shippingMethod: 'standard' | 'express';
  onShippingChange: (value: 'standard' | 'express') => void;
}

export default function CartSummary({
  subtotal,
  discount,
  shipping,
  tax,
  total,
  couponCode,
  appliedCoupon,
  onCouponChange,
  onApplyCoupon,
  shippingMethod,
  onShippingChange,
}: Props) {
  return (
    <div className={styles.summaryCard}>
      <h3>Order Summary</h3>

      <div className={styles.couponRow}>
        <input
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value)}
          placeholder="Coupon code"
          className={styles.searchInput}
        />
        <button className={styles.secondaryButton} onClick={onApplyCoupon}>
          Apply
        </button>
      </div>

      {appliedCoupon ? <p className={styles.successText}>Coupon applied: {appliedCoupon}</p> : null}

      <div className={styles.shippingSelector}>
        <label>
          <input
            type="radio"
            checked={shippingMethod === 'standard'}
            onChange={() => onShippingChange('standard')}
          />
          Standard
        </label>
        <label>
          <input
            type="radio"
            checked={shippingMethod === 'express'}
            onChange={() => onShippingChange('express')}
          />
          Express
        </label>
      </div>

      <div className={styles.summaryRow}><span>Subtotal</span><span>{subtotal}</span></div>
      <div className={styles.summaryRow}><span>Discount</span><span>- {discount}</span></div>
      <div className={styles.summaryRow}><span>Shipping</span><span>{shipping}</span></div>
      <div className={styles.summaryRow}><span>Tax</span><span>{tax}</span></div>
      <div className={styles.totalRow}><span>Total</span><span>{total}</span></div>
    </div>
  );
}