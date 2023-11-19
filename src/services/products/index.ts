import { api } from '@/lib/api';

import { ProductData } from './types';

export const productsService = {
  create: (data: ProductData, userIdToken: string) =>
    api('/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userIdToken}` },
      data,
    }),
  getAll: () => api.get(`/products`),
  getOneById: (id: string) => api.get(`/products/${id}`),
  update: (
    productId: string,
    data: Partial<ProductData>,
    userIdToken: string
  ) =>
    api(`/products/${productId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${userIdToken}` },
      data,
    }),
  delete: (productId: string, userIdToken: string) =>
    api(`/products/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userIdToken}` },
    }),
  buy: (productId: string, productAmount: number, userIdToken: string) =>
    api('/buy', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userIdToken}` },
      data: { productAmount, productId },
    }),
};
