import type { CheckoutErrors, CheckoutFormValues } from '../types';
import styles from './Products.module.css';

interface Props {
  values: CheckoutFormValues;
  errors: CheckoutErrors;
  onChange: (key: keyof CheckoutFormValues, value: string) => void;
  onSubmit: () => void;
}

export default function CheckoutForm({ values, errors, onChange, onSubmit }: Props) {
  return (
    <div className={styles.checkoutCard}>
      <h3>Checkout Details</h3>

      <div className={styles.formGrid}>
        <div>
          <label>Full Name</label>
          <input
            className={styles.searchInput}
            value={values.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
          {errors.fullName ? <span className={styles.errorText}>{errors.fullName}</span> : null}
        </div>

        <div>
          <label>Email</label>
          <input
            className={styles.searchInput}
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          {errors.email ? <span className={styles.errorText}>{errors.email}</span> : null}
        </div>

        <div>
          <label>Phone</label>
          <input
            className={styles.searchInput}
            value={values.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
          {errors.phone ? <span className={styles.errorText}>{errors.phone}</span> : null}
        </div>

        <div>
          <label>Address</label>
          <input
            className={styles.searchInput}
            value={values.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
          {errors.address ? <span className={styles.errorText}>{errors.address}</span> : null}
        </div>

        <div>
          <label>City</label>
          <input
            className={styles.searchInput}
            value={values.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
          {errors.city ? <span className={styles.errorText}>{errors.city}</span> : null}
        </div>

        <div>
          <label>State</label>
          <input
            className={styles.searchInput}
            value={values.state}
            onChange={(e) => onChange('state', e.target.value)}
          />
          {errors.state ? <span className={styles.errorText}>{errors.state}</span> : null}
        </div>

        <div>
          <label>Pincode</label>
          <input
            className={styles.searchInput}
            value={values.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
          />
          {errors.pincode ? <span className={styles.errorText}>{errors.pincode}</span> : null}
        </div>

        <div>
          <label>Payment Method</label>
          <select
            className={styles.select}
            value={values.paymentMethod}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>

      <button className={styles.primaryButton} onClick={onSubmit}>
        Place Order
      </button>
    </div>
  );
}