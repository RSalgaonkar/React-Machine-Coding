import InvoicePreview from './InvoicePreview';
import type { OrderRecord } from '../redux/productsTypes';
import styles from './ProductsAdvanced.module.css';

interface Props {
  orders: OrderRecord[];
}

export default function OrderHistoryList({ orders }: Props) {
  if (!orders.length) {
    return <div className={styles.emptyState}>No orders yet.</div>;
  }

  return (
    <div className={styles.orderHistoryList}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderMeta}>
            <div>
              <strong>{order.id}</strong>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>₹{order.total}</div>
          </div>

          <div className={styles.orderItemsPreview}>
            {order.items.map((item) => (
              <span key={item.id}>
                {item.title} x {item.quantity}
              </span>
            ))}
          </div>

          <InvoicePreview order={order} />
        </div>
      ))}
    </div>
  );
}