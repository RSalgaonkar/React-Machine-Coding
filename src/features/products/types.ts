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

export interface CheckoutErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface ProductsState {
  products: Product[];
  search: string;
  selectedCategory: 'All' | ProductCategory;
  sortBy: ProductSortBy;
  cart: CartItem[];
  wishlist: number[];
  recentlyViewed: number[];
  couponCode: string;
  appliedCoupon: string | null;
  shippingMethod: ShippingMethod;
  isCartOpen: boolean;
  quickViewProductId: number | null;
  checkoutForm: CheckoutFormValues;
  checkoutErrors: CheckoutErrors;
  orderPlaced: boolean;
  lastRemovedItem: CartItem | null;
}