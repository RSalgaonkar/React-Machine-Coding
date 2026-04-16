import type { CartItem, Product } from '../types';

export const isLowStock = (stock: number) => stock > 0 && stock <= 5;
export const isOutOfStock = (stock: number) => stock <= 0;

export const addToCartList = (cart: CartItem[], product: Product): CartItem[] => {
  const existing = cart.find((item) => item.id === product.id && !item.savedForLater);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id && !item.savedForLater
        ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
        : item
    );
  }

  return [...cart, { ...product, quantity: 1 }];
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: number,
  quantity: number
): CartItem[] => {
  return cart
    .map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item
    )
    .filter((item) => item.quantity > 0);
};

export const removeFromCartList = (cart: CartItem[], productId: number): CartItem[] => {
  return cart.filter((item) => item.id !== productId);
};

export const toggleSaveForLater = (cart: CartItem[], productId: number): CartItem[] => {
  return cart.map((item) =>
    item.id === productId ? { ...item, savedForLater: !item.savedForLater } : item
  );
};