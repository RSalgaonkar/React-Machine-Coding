import { useAppSelector } from '../../../app/hooks';
import { selectProductsState } from '../redux/productsSelectors';
import OrderHistoryList from '../components/OrderHistoryList';

export default function OrderHistoryPage() {
  const state = useAppSelector(selectProductsState);

  return (
    <section className="page">
      <h2>Order History</h2>
      <p>Review previous orders and download invoice files.</p>
      <OrderHistoryList orders={state.orders} />
    </section>
  );
}