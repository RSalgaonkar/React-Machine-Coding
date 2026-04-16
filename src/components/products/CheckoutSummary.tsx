import { useCart } from '../../context/CartContext';

export default function CheckoutSummary() {
  const { cart, totalPrice, incrementQuantity, decrementQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="h-9 w-9 rounded-full border border-slate-300 text-lg"
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>
              <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="h-9 w-9 rounded-full border border-slate-300 text-lg"
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <div className="text-right font-semibold text-slate-900">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-2xl font-bold text-slate-900">
        Total: ₹{totalPrice}
      </div>
    </div>
  );
}