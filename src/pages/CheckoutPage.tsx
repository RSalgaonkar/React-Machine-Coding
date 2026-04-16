import CheckoutSummary from '../components/products/CheckoutSummary';
import PageHeader from '../components/ui/PageHeader';

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Checkout"
        description="Cart review page with quantity increment/decrement and computed total."
      />
      <CheckoutSummary />
    </div>
  );
}