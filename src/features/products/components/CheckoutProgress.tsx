import type { CheckoutStep } from '../redux/productsTypes';
import styles from './ProductsAdvanced.module.css';

const steps: CheckoutStep[] = ['cart', 'address', 'payment', 'review'];

interface Props {
  currentStep: CheckoutStep;
}

export default function CheckoutProgress({ currentStep }: Props) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className={styles.checkoutProgress}>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`${styles.checkoutStep} ${
            index <= currentIndex ? styles.checkoutStepActive : ''
          }`}
        >
          <span>{index + 1}</span>
          <label>{step}</label>
        </div>
      ))}
    </div>
  );
}