import type { CheckoutErrors, CheckoutFormValues } from '../types';

export const validateCheckoutForm = (values: CheckoutFormValues): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  if (!values.fullName.trim()) errors.fullName = 'Full name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Invalid email';
  if (!values.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^\d{10}$/.test(values.phone)) errors.phone = 'Phone must be 10 digits';
  if (!values.address.trim()) errors.address = 'Address is required';
  if (!values.city.trim()) errors.city = 'City is required';
  if (!values.state.trim()) errors.state = 'State is required';
  if (!values.pincode.trim()) errors.pincode = 'Pincode is required';
  else if (!/^\d{6}$/.test(values.pincode)) errors.pincode = 'Pincode must be 6 digits';

  return errors;
};