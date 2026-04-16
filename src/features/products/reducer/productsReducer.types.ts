import type {
  CartItem,
  CheckoutErrors,
  CheckoutFormValues,
  Product,
  ProductCategory,
  ProductSortBy,
  ShippingMethod,
} from '../types';

export type ProductsAction =
  | { type: 'products/init'; payload: Product[] }
  | { type: 'search/set'; payload: string }
  | { type: 'category/set'; payload: 'All' | ProductCategory }
  | { type: 'sort/set'; payload: ProductSortBy }
  | { type: 'wishlist/toggle'; payload: number }
  | { type: 'recentlyViewed/add'; payload: number }
  | { type: 'cart/add'; payload: Product }
  | { type: 'cart/remove'; payload: number }
  | { type: 'cart/undoRemove'; payload: CartItem | null }
  | { type: 'cart/increment'; payload: number }
  | { type: 'cart/decrement'; payload: number }
  | { type: 'cart/quantity'; payload: { productId: number; quantity: number } }
  | { type: 'cart/saveForLater'; payload: number }
  | { type: 'coupon/input'; payload: string }
  | { type: 'coupon/apply'; payload: string | null }
  | { type: 'shipping/set'; payload: ShippingMethod }
  | { type: 'cart/open' }
  | { type: 'cart/close' }
  | { type: 'quickView/open'; payload: number }
  | { type: 'quickView/close' }
  | { type: 'checkout/formUpdate'; payload: { key: keyof CheckoutFormValues; value: string } }
  | { type: 'checkout/errors'; payload: CheckoutErrors }
  | { type: 'checkout/placeOrder' }
  | { type: 'checkout/reset' };