import { User } from '@/hooks/useAuth/types';

export const userStorage = {
  set: (user: User) => localStorage.setItem('user', JSON.stringify(user)),
  get: () => JSON.parse(localStorage.getItem('user') || '{}') as User,
  remove: () => localStorage.removeItem('user'),
};

export const userIdTokenStorage = {
  set: (idToken: string) => localStorage.setItem('idToken', idToken),
  get: () => localStorage.getItem('idToken'),
  remove: () => localStorage.removeItem('idToken'),
};
