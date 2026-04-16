import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import type { Product, CartItem } from './productsTypes';

export const selectProductsState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductsState],
  (state) => state.products
);

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  (state) => {
    const normalized = state.debouncedSearch.trim().toLowerCase();

    let filtered = state.products.filter((product: Product) => {
      const matchesSearch =
        !normalized ||
        product.title.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(normalized));

      const matchesCategory =
        state.selectedCategory === 'All' || product.category === state.selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (state.sortBy) {
      case 'price-low-high':
        filtered = [...filtered].sort((a: Product, b: Product) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered = [...filtered].sort((a: Product, b: Product) => b.price - a.price);
        break;
      case 'rating-high':
        filtered = [...filtered].sort((a: Product, b: Product) => b.rating - a.rating);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a: Product, b: Product) =>
          a.title.localeCompare(b.title)
        );
        break;
      default:
        filtered = [...filtered].sort(
          (a: Product, b: Product) =>
            Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending))
        );
        break;
    }

    return filtered;
  }
);

export const selectActiveCartItems = createSelector(
  [selectProductsState],
  (state) => state.cart.filter((item: CartItem) => !item.savedForLater)
);

export const selectSavedForLaterItems = createSelector(
  [selectProductsState],
  (state) => state.cart.filter((item: CartItem) => item.savedForLater)
);

export const selectCompareProducts = createSelector(
  [selectProductsState],
  (state) => state.products.filter((product: Product) => state.compare.includes(product.id))
);

export const selectQuickViewProduct = createSelector(
  [selectProductsState],
  (state) =>
    state.products.find((product: Product) => product.id === state.quickViewProductId) ?? null
);

export const selectPricing = createSelector(
  [selectActiveCartItems, selectProductsState],
  (cart, state) => {
    const subtotal = cart.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    const discount =
      state.appliedCoupon === 'SAVE10'
        ? Math.floor(subtotal * 0.1)
        : state.appliedCoupon === 'FLAT500' && subtotal >= 5000
        ? 500
        : 0;

    const shipping =
      subtotal >= 5000 && state.shippingMethod === 'standard'
        ? 0
        : state.shippingMethod === 'standard'
        ? 99
        : 249;

    const tax = Math.floor((subtotal - discount) * 0.18);
    const total = subtotal - discount + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
      freeShippingRemaining: Math.max(0, 5000 - subtotal),
    };
  }
);