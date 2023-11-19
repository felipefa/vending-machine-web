import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

import { BuyProductFormProps } from './types';
import { productsService } from '@/services/products';
import { formatCurrency } from '@/utils/formatCurrency';

export function BuyProductForm({
  callbackOnSuccess,
  product,
}: BuyProductFormProps) {
  const { updateDeposit, user, userIdToken } = useAuth();

  const [amountWanted, setAmountWanted] = React.useState<string>('');
  const [amountWantedError, setAmountWantedError] = React.useState<string>('');
  const [requestError, setRequestError] = React.useState<string>('');

  const costFormatted = formatCurrency(product.cost);

  const totalCostFormatted = React.useMemo(() => {
    if (
      !amountWanted ||
      Number.isNaN(Number(amountWanted)) ||
      Number(amountWanted) <= 0
    ) {
      return '';
    }

    const totalCost = formatCurrency(Number(amountWanted) * product.cost);

    return `Total ${totalCost}`;
  }, [amountWanted, product]);

  function onChangeAmountWanted(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (Number.isNaN(Number(value))) {
      setAmountWantedError('Amount must be a number');
    } else {
      setAmountWantedError('');
    }

    setAmountWanted(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!amountWanted) {
      setAmountWantedError('Amount is required');
      return;
    } else if (Number.isNaN(Number(amountWanted))) {
      setAmountWantedError('Amount must be a number');
    } else if (Number(amountWanted) <= 0) {
      setAmountWantedError('Amount must be greater than 0');
    }

    if (!user?.id || !userIdToken) {
      setRequestError('You must be logged in to buy a product');
      return;
    }

    if (!product) {
      setRequestError('Product not found');
      return;
    }

    if (Number(amountWanted) > product.amountAvailable) {
      setRequestError('Not enough products available');
      return;
    }

    const totalCost = Number(amountWanted) * product.cost;

    if (user.deposit < totalCost) {
      const difference = totalCost - user.deposit;
      setRequestError(`You need ${formatCurrency(difference)} more`);
      return;
    }

    try {
      const response = await productsService.buy(
        product.id,
        Number(amountWanted),
        userIdToken
      );

      if (response.status === 200) {
        updateDeposit(0);
        callbackOnSuccess(product.amountAvailable - Number(amountWanted));
      }
    } catch (error) {
      console.error(error);

      if ((error as Error).message) {
        setRequestError((error as Error).message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xl font-bold">Buy product</p>
      <div className="flex justify-between">
        <p className="py-2">{product.productName}</p>
        <p className="py-2">
          {amountWanted ? `${amountWanted} x ` : ''}
          {costFormatted}
        </p>
      </div>
      <p className="text-right">{totalCostFormatted}</p>
      <div className="py-2">
        <Label htmlFor="productName">Amount</Label>
        <Input
          id="productName"
          onChange={onChangeAmountWanted}
          value={amountWanted}
        />
        <p className="py-1 text-sm text-muted-foreground text-red-300">
          {amountWantedError}
        </p>
      </div>
      <div className="pt-4 flex flex-1">
        <Button className="flex flex-1" type="submit">
          Buy
        </Button>
      </div>
      <p className="py-1 text-sm text-muted-foreground text-red-300">
        {requestError}
      </p>
    </form>
  );
}
