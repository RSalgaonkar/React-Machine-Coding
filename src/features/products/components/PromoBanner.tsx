import { useEffect, useState } from 'react';
import { getRemainingTimeParts } from '../utils/time';
import styles from './ProductsAdvanced.module.css';

interface Props {
  promoEndsAt: string;
}

export default function PromoBanner({ promoEndsAt }: Props) {
  const [time, setTime] = useState(getRemainingTimeParts(promoEndsAt));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getRemainingTimeParts(promoEndsAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [promoEndsAt]);

  return (
    <div className={styles.promoBanner}>
      {time.expired
        ? 'Promo ended'
        : `Flash deal ends in ${time.hours}h ${time.minutes}m ${time.seconds}s`}
    </div>
  );
}