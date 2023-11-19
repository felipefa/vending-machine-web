import { api } from '@/lib/api';

import { Coin } from './types';

export const coinsService = {
  deposit: (coin: Coin, userIdToken: string) =>
    api('/deposit', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userIdToken}` },
      data: { coin },
    }),
  reset: (userIdToken: string) =>
    api('/reset', {
      method: 'POST',
      headers: { Authorization: `Bearer ${userIdToken}` },
    }),
};
