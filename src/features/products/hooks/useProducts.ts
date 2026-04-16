import { useEffect, useMemo, useReducer } from 'react';
import { productsData } from '../data/productsData';
import { productsReducer } from '../reducer/productsReducer';
import {
  FREE_SHIPPING_THRESHOLD,
  formatCurrency,
  getDiscount,
  getGrandTotal,
  getShipping,
  getSubtotal,
  getTax,
} from '../utils/pricing';
import { filterProducts, getCategories, sortProducts } from '../utils/productFilters';
import { safeStorage } from '../utils/safeStorage';
import { validateCheckoutForm } from '../utils/validation';
import type { ProductSortBy, ProductsState } from '../types';

const STORAGE_KEY = 'portfolio-products-state';

const initialState: ProductsState = {
  products: productsData,
  search: '',
  selectedCategory: 'All',
  sortBy: 'featured',
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  couponCode: '',
  appliedCoupon: null,
  shippingMethod: 'standard',
  isCartOpen: false,
  quickViewProductId: null,
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
  orderPlaced: false,
  lastRemovedItem: null,
};

export const useProducts = () => {
  const persisted = safeStorage.get<ProductsState>(STORAGE_KEY, initialState);
  const [state, dispatch] = useReducer(productsReducer, persisted);

  useEffect(() => {
    safeStorage.set(STORAGE_KEY, state);
  }, [state]);

  const categories = useMemo(() => getCategories(state.products), [state.products]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts({
      products: state.products,
      search: state.search,
      selectedCategory: state.selectedCategory,
    });

    return sortProducts(filtered, state.sortBy);
  }, [state.products, state.search, state.selectedCategory, state.sortBy]);

  const quickViewProduct = useMemo(
    () => state.products.find((product) => product.id === state.quickViewProductId) ?? null,
    [state.products, state.quickViewProductId]
  );

  const activeCartItems = useMemo(
    () => state.cart.filter((item) => !item.savedForLater),
    [state.cart]
  );

  const savedForLaterItems = useMemo(
    () => state.cart.filter((item) => item.savedForLater),
    [state.cart]
  );

  const subtotal = useMemo(() => getSubtotal(activeCartItems), [activeCartItems]);
  const discount = useMemo(
    () => getDiscount(subtotal, state.appliedCoupon),
    [subtotal, state.appliedCoupon]
  );
  const shipping = useMemo(
    () => getShipping(subtotal, state.shippingMethod),
    [subtotal, state.shippingMethod]
  );
  const tax = useMemo(() => getTax(subtotal - discount), [subtotal, discount]);
  const grandTotal = useMemo(
    () => getGrandTotal({ subtotal, discount, shipping, tax }),
    [subtotal, discount, shipping, tax]
  );

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const setSearch = (value: string) => dispatch({ type: 'search/set', payload: value });
  const setCategory = (value: ProductsState['selectedCategory']) =>
    dispatch({ type: 'category/set', payload: value });
  const setSortBy = (value: ProductSortBy) => dispatch({ type: 'sort/set', payload: value });

  const toggleWishlist = (productId: number) =>
    dispatch({ type: 'wishlist/toggle', payload: productId });

  const addRecentlyViewed = (productId: number) =>
    dispatch({ type: 'recentlyViewed/add', payload: productId });

  const addToCart = (productId: number) => {
    const product = state.products.find((item) => item.id === productId);
    if (!product || product.stock <= 0) return;
    dispatch({ type: 'cart/add', payload: product });
  };

  const removeFromCart = (productId: number) =>
    dispatch({ type: 'cart/remove', payload: productId });

  const undoRemove = () =>
    dispatch({ type: 'cart/undoRemove', payload: state.lastRemovedItem });

  const incrementQty = (productId: number) =>
    dispatch({ type: 'cart/increment', payload: productId });

  const decrementQty = (productId: number) =>
    dispatch({ type: 'cart/decrement', payload: productId });

  const updateQty = (productId: number, quantity: number) =>
    dispatch({ type: 'cart/quantity', payload: { productId, quantity } });

  const saveForLater = (productId: number) =>
    dispatch({ type: 'cart/saveForLater', payload: productId });

  const setCouponCode = (value: string) =>
    dispatch({ type: 'coupon/input', payload: value.toUpperCase() });

  const applyCoupon = () => {
    const code = state.couponCode.trim().toUpperCase();
    const validCoupons = ['SAVE10', 'FLAT500'];
    dispatch({
      type: 'coupon/apply',
      payload: validCoupons.includes(code) ? code : null,
    });
  };

  const setShippingMethod = (value: ProductsState['shippingMethod']) =>
    dispatch({ type: 'shipping/set', payload: value });

  const openCart = () => dispatch({ type: 'cart/open' });
  const closeCart = () => dispatch({ type: 'cart/close' });

  const openQuickView = (productId: number) => {
    addRecentlyViewed(productId);
    dispatch({ type: 'quickView/open', payload: productId });
  };

  const closeQuickView = () => dispatch({ type: 'quickView/close' });

  const updateCheckoutField = (
    key: keyof ProductsState['checkoutForm'],
    value: string
  ) => {
    dispatch({ type: 'checkout/formUpdate', payload: { key, value } });
  };

  const placeOrder = () => {
    const errors = validateCheckoutForm(state.checkoutForm);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'checkout/errors', payload: errors });
      return false;
    }

    dispatch({ type: 'checkout/placeOrder' });
    return true;
  };

  return {
    state,
    categories,
    filteredProducts,
    quickViewProduct,
    activeCartItems,
    savedForLaterItems,
    subtotal,
    discount,
    shipping,
    tax,
    grandTotal,
    freeShippingRemaining,
    formatCurrency,
    setSearch,
    setCategory,
    setSortBy,
    toggleWishlist,
    addToCart,
    removeFromCart,
    undoRemove,
    incrementQty,
    decrementQty,
    updateQty,
    saveForLater,
    setCouponCode,
    applyCoupon,
    setShippingMethod,
    openCart,
    closeCart,
    openQuickView,
    closeQuickView,
    updateCheckoutField,
    placeOrder,
  };
};