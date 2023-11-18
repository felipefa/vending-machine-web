import { api } from '@/lib/api';

import { ProductData } from './types';

export const productsService = {
  create: (data: ProductData, userIdToken: string) =>
    api.post('/products', {
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
    api.patch(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${userIdToken}` },
      data,
    }),
  delete: (productId: string, userIdToken: string) =>
    api.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${userIdToken}` },
    }),
};
