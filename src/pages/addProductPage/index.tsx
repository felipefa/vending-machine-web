import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddProductPage() {
  const [amountAvailable, setAmountAvailable] = React.useState<string>('');
  const [amountAvailableError, setAmountAvailableError] =
    React.useState<string>('');
  const [cost, setCost] = React.useState<string>('');
  const [costError, setCostError] = React.useState<string>('');
  const [productName, setProductName] = React.useState<string>('');
  const [productNameError, setProductNameError] = React.useState<string>('');

  function onChangeAmountAvailable(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setAmountAvailable(value);
    setAmountAvailableError('');
  }

  function onChangeCost(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setCost(value);
    setCostError('');
  }

  function onChangeProductName(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setProductName(value);
    setProductNameError('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!productName) {
      setProductNameError('Product name is required');
    }

    if (!cost) {
      setCostError('Cost is required');
    } else if (Number.isNaN(Number(cost))) {
      setCostError('Cost must be a number');
    } else if (Number(cost) <= 0) {
      setCostError('Cost must be greater than 0');
    }

    if (!amountAvailable) {
      setAmountAvailableError('Amount is required');
    } else if (Number.isNaN(Number(amountAvailable))) {
      setAmountAvailableError('Amount must be a number');
    } else if (Number(amountAvailable) <= 0) {
      setAmountAvailableError('Amount must be greater than 0');
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit}>
        <p className="text-xl font-bold">Add product</p>
        <div className="py-2">
          <Label htmlFor="productName">Product name</Label>
          <Input
            id="productName"
            onChange={onChangeProductName}
            value={productName}
          />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {productNameError}
          </p>
        </div>
        <div className="py-2">
          <Label htmlFor="cost">Cost</Label>
          <Input id="cost" onChange={onChangeCost} value={cost} />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {costError}
          </p>
        </div>
        <div className="py-2">
          <Label htmlFor="amountAvailable">Amount available</Label>
          <Input
            id="amountAvailable"
            onChange={onChangeAmountAvailable}
            value={amountAvailable}
          />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {amountAvailableError}
          </p>
        </div>
        <div className="pt-4 flex flex-1">
          <Button className="flex flex-1" type="submit">
            Add product
          </Button>
        </div>
      </form>
    </div>
  );
}
