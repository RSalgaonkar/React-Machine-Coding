import { productsData } from '../../data/productsData';
import { useCart } from '../../context/CartContext';

function ProductIcon({ type }: { type: 'mouse' | 'keyboard' | 'monitor' }) {
  if (type === 'mouse') {
    return (
      <svg viewBox="0 0 48 48" className="h-16 w-16 text-blue-600" fill="none">
        <rect x="14" y="6" width="20" height="36" rx="10" stroke="currentColor" strokeWidth="3" />
        <line x1="24" y1="12" x2="24" y2="18" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (type === 'keyboard') {
    return (
      <svg viewBox="0 0 48 48" className="h-16 w-16 text-blue-600" fill="none">
        <rect x="6" y="14" width="36" height="20" rx="4" stroke="currentColor" strokeWidth="3" />
        <path d="M12 22h2M18 22h2M24 22h2M30 22h2M36 22h0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-16 w-16 text-blue-600" fill="none">
      <rect x="8" y="8" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="3" />
      <path d="M18 38h12M24 30v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductGrid() {
  const { addToCart } = useCart();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {productsData.map((product) => (
        <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-32 items-center justify-center rounded-2xl bg-slate-50">
            <ProductIcon type={product.imageType} />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.category}</p>
          <p className="mt-3 text-xl font-bold text-slate-900">₹{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}