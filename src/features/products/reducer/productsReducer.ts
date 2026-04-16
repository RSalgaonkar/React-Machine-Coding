import type { ProductsState } from '../types';
import type { ProductsAction } from './productsReducer.types';
import {
  addToCartList,
  removeFromCartList,
  toggleSaveForLater,
  updateCartItemQuantity,
} from '../utils/productHelpers';

export const productsReducer = (
  state: ProductsState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case 'products/init':
      return {
        ...state,
        products: action.payload,
      };

    case 'search/set':
      return {
        ...state,
        search: action.payload,
      };

    case 'category/set':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'sort/set':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'wishlist/toggle':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };

    case 'recentlyViewed/add': {
      const next = [action.payload, ...state.recentlyViewed.filter((id) => id !== action.payload)];
      return {
        ...state,
        recentlyViewed: next.slice(0, 6),
      };
    }

    case 'cart/add':
      return {
        ...state,
        cart: addToCartList(state.cart, action.payload),
        isCartOpen: true,
      };

    case 'cart/remove': {
      const removed = state.cart.find((item) => item.id === action.payload) || null;

      return {
        ...state,
        cart: removeFromCartList(state.cart, action.payload),
        lastRemovedItem: removed,
      };
    }

    case 'cart/undoRemove':
      return action.payload
        ? {
            ...state,
            cart: [...state.cart, action.payload],
            lastRemovedItem: null,
          }
        : state;

    case 'cart/increment':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        ),
      };

    case 'cart/decrement':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };

    case 'cart/quantity':
      return {
        ...state,
        cart: updateCartItemQuantity(state.cart, action.payload.productId, action.payload.quantity),
      };

    case 'cart/saveForLater':
      return {
        ...state,
        cart: toggleSaveForLater(state.cart, action.payload),
      };

    case 'coupon/input':
      return {
        ...state,
        couponCode: action.payload,
      };

    case 'coupon/apply':
      return {
        ...state,
        appliedCoupon: action.payload,
      };

    case 'shipping/set':
      return {
        ...state,
        shippingMethod: action.payload,
      };

    case 'cart/open':
      return {
        ...state,
        isCartOpen: true,
      };

    case 'cart/close':
      return {
        ...state,
        isCartOpen: false,
      };

    case 'quickView/open':
      return {
        ...state,
        quickViewProductId: action.payload,
      };

    case 'quickView/close':
      return {
        ...state,
        quickViewProductId: null,
      };

    case 'checkout/formUpdate':
      return {
        ...state,
        checkoutForm: {
          ...state.checkoutForm,
          [action.payload.key]: action.payload.value,
        },
        checkoutErrors: {
          ...state.checkoutErrors,
          [action.payload.key]: '',
        },
      };

    case 'checkout/errors':
      return {
        ...state,
        checkoutErrors: action.payload,
      };

    case 'checkout/placeOrder':
      return {
        ...state,
        orderPlaced: true,
        cart: [],
        isCartOpen: false,
        appliedCoupon: null,
        couponCode: '',
      };

    case 'checkout/reset':
      return {
        ...state,
        orderPlaced: false,
      };

    default:
      return state;
  }
};