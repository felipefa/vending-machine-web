import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Coin, coins } from '@/services/coins/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { coinsService } from '@/services/coins';

export function AddCoinsPage() {
  const { depositFormatted, updateDeposit, userIdToken } = useAuth();

  const [requestError, setRequestError] = React.useState<string>('');

  async function handleOnCoinClick(coin: Coin) {
    try {
      if (!coin) {
        throw new Error('Missing coin');
      }

      if (!userIdToken) {
        throw new Error('Missing user token');
      }

      const response = await coinsService.deposit(coin, userIdToken);

      if (response.status === 200 && response.data.deposit) {
        updateDeposit(response.data.deposit);
        setRequestError('');
      }
    } catch (error) {
      console.error(error);

      if ((error as Error).message) {
        setRequestError((error as Error).message);
      }
    }
  }

  async function handleOnResetClick() {
    try {
      if (!userIdToken) {
        throw new Error('Missing user token');
      }

      const response = await coinsService.reset(userIdToken);

      if (response.status === 200) {
        updateDeposit(0);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-6 items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="text-xl text-muted-foreground">Balance</p>
        <p className="text-5xl font-bold py-2">{depositFormatted}</p>
        <Button onClick={handleOnResetClick} variant="ghost">
          Reset
        </Button>
      </div>
      <Separator className="w-16 sm:rotate-90" />
      <div className="mb-8">
        <p className="text-xl text-muted-foreground">Add coin</p>
        <div className="flex flex-1 gap-4 py-2">
          {coins.map((coin) => (
            <Button
              className="flex flex-1 p-6"
              key={coin}
              onClick={() => handleOnCoinClick(coin)}
              variant="outline"
            >
              {formatCurrency(coin)}
            </Button>
          ))}
        </div>
        <p className="py-1 text-sm text-muted-foreground text-red-300">
          {requestError}
        </p>
      </div>
    </div>
  );
}
