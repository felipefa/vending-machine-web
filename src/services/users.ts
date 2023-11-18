import { SignUpUser } from '@/hooks/useAuth/types';
import { api } from '@/lib/api';

export const usersService = {
  create: (data: SignUpUser) => api.post('/users', data),
  getOneById: (id: string, userIdToken: string) =>
    api(`/users/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${userIdToken}` },
    }),
  update: (username: string, userIdToken: string) =>
    api('/users', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${userIdToken}` },
      data: { username },
    }),
  delete: (userIdToken: string) =>
    api('/users', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userIdToken}` },
    }),
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
};
