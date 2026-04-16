export type ProductCategory =
  | 'Accessories'
  | 'Workspace'
  | 'Audio'
  | 'Laptop'
  | 'Mobile';

export type ProductSortBy =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating-high'
  | 'name-asc';

export type ShippingMethod = 'standard' | 'express';
export type CheckoutStep = 'cart' | 'address' | 'payment' | 'review';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  category: ProductCategory;
  stock: number;
  brand: string;
  tags: string[];
  isTrending?: boolean;
  estimatedDelivery: string;
}

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
}

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'card' | 'upi';
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customer: CheckoutFormValues;
  coupon: string | null;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ProductsState {
  products: Product[];
  search: string;
  debouncedSearch: string;
  selectedCategory: 'All' | ProductCategory;
  sortBy: ProductSortBy;

  cart: CartItem[];
  wishlist: number[];
  compare: number[];
  recentlyViewed: number[];

  couponCode: string;
  appliedCoupon: string | null;
  shippingMethod: ShippingMethod;

  isCartOpen: boolean;
  quickViewProductId: number | null;

  isLoadingProducts: boolean;
  promoEndsAt: string;

  checkoutStep: CheckoutStep;
  checkoutForm: CheckoutFormValues;
  checkoutErrors: Partial<Record<keyof CheckoutFormValues, string>>;
  isPaymentProcessing: boolean;
  orderPlaced: boolean;

  orders: OrderRecord[];

  toasts: ToastMessage[];
}