import { downloadInvoice } from '../utils/invoice';
import type { OrderRecord } from '../redux/productsTypes';
import styles from './ProductsAdvanced.module.css';

interface Props {
  order: OrderRecord;
}

export default function InvoicePreview({ order }: Props) {
  return (
    <div className={styles.invoiceCard}>
      <h4>Invoice</h4>
      <p>Order ID: {order.id}</p>
      <p>Total: ₹{order.total}</p>
      <button onClick={() => downloadInvoice(order)}>Download Invoice</button>
    </div>
  );
}