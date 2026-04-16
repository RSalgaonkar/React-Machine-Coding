import styles from './ProductsAdvanced.module.css';

interface Props {
  onAutofill: () => void;
}

export default function AddressAutofillMock({ onAutofill }: Props) {
  return (
    <div className={styles.autofillCard}>
      <div>
        <strong>Quick Autofill</strong>
        <p>Use mock address data for demo checkout.</p>
      </div>
      <button onClick={onAutofill}>Autofill Address</button>
    </div>
  );
}