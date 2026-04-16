// import type { CartItem, ShippingMethod } from '../types';

// export const FREE_SHIPPING_THRESHOLD = 5000;
// export const STANDARD_SHIPPING = 99;
// export const EXPRESS_SHIPPING = 249;
// export const TAX_RATE = 0.18;

// export const formatCurrency = (value: number) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(value);

// export const getSubtotal = (cart: CartItem[]) =>
//   cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// export const getDiscount = (subtotal: number, appliedCoupon: string | null) => {
//   if (!appliedCoupon) return 0;
//   if (appliedCoupon === 'SAVE10') return Math.floor(subtotal * 0.1);
//   if (appliedCoupon === 'FLAT500') return subtotal >= 5000 ? 500 : 0;
//   return 0;
// };

// export const getShipping = (subtotal: number, shippingMethod: ShippingMethod) => {
//   if (subtotal >= FREE_SHIPPING_THRESHOLD && shippingMethod === 'standard') {
//     return 0;
//   }

//   return shippingMethod === 'standard' ? STANDARD_SHIPPING : EXPRESS_SHIPPING;
// };

// export const getTax = (taxableAmount: number) => Math.floor(taxableAmount * TAX_RATE);

// export const getGrandTotal = ({
//   subtotal,
//   discount,
//   shipping,
//   tax,
// }: {
//   subtotal: number;
//   discount: number;
//   shipping: number;
//   tax: number;
// }) => subtotal - discount + shipping + tax;

import type { CartItem, ShippingMethod } from '../redux/productsTypes';

export const FREE_SHIPPING_THRESHOLD = 5000;
export const STANDARD_SHIPPING_CHARGE = 99;
export const EXPRESS_SHIPPING_CHARGE = 249;
export const TAX_RATE = 0.18;

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getSubtotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getDiscount = (
  subtotal: number,
  appliedCoupon: string | null
) => {
  if (appliedCoupon === 'SAVE10') {
    return Math.floor(subtotal * 0.1);
  }

  if (appliedCoupon === 'FLAT500' && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 500;
  }

  return 0;
};

export const getShipping = (
  subtotal: number,
  shippingMethod: ShippingMethod
) => {
  if (shippingMethod === 'standard') {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_CHARGE;
  }

  return EXPRESS_SHIPPING_CHARGE;
};

export const getTax = (taxableAmount: number) => {
  return Math.floor(taxableAmount * TAX_RATE);
};

export const getGrandTotal = ({
  subtotal,
  discount,
  shipping,
  tax,
}: {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
}) => {
  return subtotal - discount + shipping + tax;
};

export const getPricingSummary = ({
  items,
  appliedCoupon,
  shippingMethod,
}: {
  items: CartItem[];
  appliedCoupon: string | null;
  shippingMethod: ShippingMethod;
}) => {
  const subtotal = getSubtotal(items);
  const discount = getDiscount(subtotal, appliedCoupon);
  const shipping = getShipping(subtotal, shippingMethod);
  const tax = getTax(subtotal - discount);
  const total = getGrandTotal({
    subtotal,
    discount,
    shipping,
    tax,
  });

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
};