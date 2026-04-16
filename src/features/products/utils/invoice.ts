import type { OrderRecord } from '../redux/productsTypes';

export const generateInvoiceText = (order: OrderRecord) => {
  const lines = [
    'INVOICE',
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    `Customer: ${order.customer.fullName}`,
    `Email: ${order.customer.email}`,
    '',
    'Items:',
    ...order.items.map(
      (item) => `- ${item.title} x ${item.quantity} = ₹${item.price * item.quantity}`
    ),
    '',
    `Subtotal: ₹${order.subtotal}`,
    `Discount: ₹${order.discount}`,
    `Shipping: ₹${order.shipping}`,
    `Tax: ₹${order.tax}`,
    `Total: ₹${order.total}`,
    '',
    `Coupon: ${order.coupon ?? 'N/A'}`,
  ];

  return lines.join('\n');
};

export const downloadInvoice = (order: OrderRecord) => {
  const blob = new Blob([generateInvoiceText(order)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `invoice-${order.id}.txt`;
  anchor.click();

  URL.revokeObjectURL(url);
};