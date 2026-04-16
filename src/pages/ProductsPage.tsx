import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import PageHeader from '../components/ui/PageHeader';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Listing"
        description="Product grid with add-to-cart flow and shared cart state."
      />

      <ProductGrid />

      <Link
        to="/checkout"
        className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white"
      >
        Go to Checkout
      </Link>
    </div>
  );
}