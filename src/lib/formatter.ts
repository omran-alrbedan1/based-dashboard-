import { format } from 'date-fns';
import { Shipping } from '@/types/payment.types';

export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7)
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatDateTime = (date: string | Date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'Pp');
};

export const formatAddress = (shipping: Shipping) => {
  return `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`;
};