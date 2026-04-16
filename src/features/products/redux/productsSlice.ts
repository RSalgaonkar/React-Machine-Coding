import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { productsSeed } from '../data/productsSeed';
import type {
  CartItem,
  CheckoutStep,
  OrderRecord,
  Product,
  ProductSortBy,
  ProductsState,
  ShippingMethod,
  ToastMessage,
} from './productsTypes';

const initialState: ProductsState = {
  products: productsSeed,
  search: '',
  debouncedSearch: '',
  selectedCategory: 'All',
  sortBy: 'featured',

  cart: [],
  wishlist: [],
  compare: [],
  recentlyViewed: [],

  couponCode: '',
  appliedCoupon: null,
  shippingMethod: 'standard',

  isCartOpen: false,
  quickViewProductId: null,

  isLoadingProducts: false,
  promoEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),

  checkoutStep: 'cart',
  checkoutForm: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  },
  checkoutErrors: {},
  isPaymentProcessing: false,
  orderPlaced: false,

  orders: [],
  toasts: [],
};

const addToastMessage = (state: ProductsState, toast: Omit<ToastMessage, 'id'>) => {
  state.toasts.push({
    id: nanoid(),
    ...toast,
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDebouncedSearch(state, action: PayloadAction<string>) {
      state.debouncedSearch = action.payload;
    },
    setCategory(state, action: PayloadAction<ProductsState['selectedCategory']>) {
      state.selectedCategory = action.payload;
    },
    setSortBy(state, action: PayloadAction<ProductSortBy>) {
      state.sortBy = action.payload;
    },

    toggleWishlist(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((item) => item !== id);
      } else {
        state.wishlist.push(id);
      }
    },

    toggleCompare(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.compare.includes(id)) {
        state.compare = state.compare.filter((item) => item !== id);
      } else if (state.compare.length < 3) {
        state.compare.push(id);
      } else {
        addToastMessage(state, {
          type: 'info',
          message: 'You can compare up to 3 products.',
        });
      }
    },

    clearCompare(state) {
      state.compare = [];
    },

    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },

    openQuickView(state, action: PayloadAction<number>) {
      state.quickViewProductId = action.payload;
    },
    closeQuickView(state) {
      state.quickViewProductId = null;
    },

    addToRecentlyViewed(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.recentlyViewed = [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 8);
    },

    setProductsLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingProducts = action.payload;
    },

    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.cart.find(
        (item) => item.id === action.payload.id && !item.savedForLater
      );

      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, existing.stock);
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.isCartOpen = true;
      addToastMessage(state, {
        type: 'success',
        message: `${action.payload.title} added to cart`,
      });
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      addToastMessage(state, {
        type: 'info',
        message: 'Item removed from cart',
      });
    },

    incrementCartQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.quantity = Math.min(item.quantity + 1, item.stock);
      }
    },

    decrementCartQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.quantity = Math.max(item.quantity - 1, 1);
      }
    },

    toggleSaveForLater(state, action: PayloadAction<number>) {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.savedForLater = !item.savedForLater;
      }
    },

    setCouponCode(state, action: PayloadAction<string>) {
      state.couponCode = action.payload.toUpperCase();
    },

    applyCoupon(state) {
      const code = state.couponCode.trim().toUpperCase();
      if (['SAVE10', 'FLAT500'].includes(code)) {
        state.appliedCoupon = code;
        addToastMessage(state, {
          type: 'success',
          message: `Coupon ${code} applied`,
        });
      } else {
        state.appliedCoupon = null;
        addToastMessage(state, {
          type: 'error',
          message: 'Invalid coupon code',
        });
      }
    },

    setShippingMethod(state, action: PayloadAction<ShippingMethod>) {
      state.shippingMethod = action.payload;
    },

    setCheckoutStep(state, action: PayloadAction<CheckoutStep>) {
      state.checkoutStep = action.payload;
    },

    updateCheckoutField(
      state,
      action: PayloadAction<{ key: keyof ProductsState['checkoutForm']; value: string }>
    ) {
      state.checkoutForm[action.payload.key] = action.payload.value as never;
      state.checkoutErrors[action.payload.key] = '';
    },

    setCheckoutErrors(state, action: PayloadAction<ProductsState['checkoutErrors']>) {
      state.checkoutErrors = action.payload;
    },

    autofillMockAddress(state) {
      state.checkoutForm = {
        ...state.checkoutForm,
        fullName: 'Rashmith Salgaonkar',
        email: 'rashmith.dev@example.com',
        phone: '9876543210',
        address: 'Near Mapusa Market, Alto-Mapusa',
        city: 'Mapusa',
        state: 'Goa',
        pincode: '403507',
      };
      addToastMessage(state, {
        type: 'info',
        message: 'Mock address autofilled',
      });
    },

    startPaymentProcessing(state) {
      state.isPaymentProcessing = true;
    },

    completeOrder(state, action: PayloadAction<OrderRecord>) {
      state.isPaymentProcessing = false;
      state.orderPlaced = true;
      state.orders.unshift(action.payload);
      state.cart = [];
      state.appliedCoupon = null;
      state.couponCode = '';
      state.checkoutStep = 'cart';
      addToastMessage(state, {
        type: 'success',
        message: 'Order placed successfully',
      });
    },

    resetOrderPlaced(state) {
      state.orderPlaced = false;
    },

    addToast(state, action: PayloadAction<Omit<ToastMessage, 'id'>>) {
      addToastMessage(state, action.payload);
    },

    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const {
  setSearch,
  setDebouncedSearch,
  setCategory,
  setSortBy,
  toggleWishlist,
  toggleCompare,
  clearCompare,
  openCart,
  closeCart,
  openQuickView,
  closeQuickView,
  addToRecentlyViewed,
  setProductsLoading,
  addToCart,
  removeFromCart,
  incrementCartQty,
  decrementCartQty,
  toggleSaveForLater,
  setCouponCode,
  applyCoupon,
  setShippingMethod,
  setCheckoutStep,
  updateCheckoutField,
  setCheckoutErrors,
  autofillMockAddress,
  startPaymentProcessing,
  completeOrder,
  resetOrderPlaced,
  addToast,
  removeToast,
} = productsSlice.actions;

export default productsSlice.reducer;