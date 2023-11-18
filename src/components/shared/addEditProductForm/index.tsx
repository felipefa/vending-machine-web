import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { productsService } from '@/services/products';

import { AddEditProductFormProps } from './types';

export function AddEditProductForm({
  mode,
  product,
  callbackOnSuccess,
}: AddEditProductFormProps) {
  const { userIdToken } = useAuth();
  const navigate = useNavigate();

  const [amountAvailable, setAmountAvailable] = React.useState<string>(
    String(product?.amountAvailable || '')
  );
  const [amountAvailableError, setAmountAvailableError] =
    React.useState<string>('');
  const [cost, setCost] = React.useState<string>(String(product?.cost || ''));
  const [costError, setCostError] = React.useState<string>('');
  const [productName, setProductName] = React.useState<string>(
    product?.productName || ''
  );
  const [productNameError, setProductNameError] = React.useState<string>('');
  const [requestError, setRequestError] = React.useState<string>('');

  const formTitle = mode === 'add' ? 'Add product' : 'Edit product';

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
    try {
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

      if (!userIdToken) {
        return;
      }

      if (mode === 'add') {
        const response = await productsService.create(
          {
            amountAvailable: Number(amountAvailable),
            cost: Number(cost),
            productName,
          },
          userIdToken
        );

        if (response.status === 201) {
          navigate('/manage-products');
        } else {
          setRequestError('Something went wrong. Please try again later');
        }
      } else if (mode === 'edit' && product?.id) {
        const response = await productsService.update(
          product.id,
          {
            amountAvailable: Number(amountAvailable),
            cost: Number(cost),
            productName,
          },
          userIdToken
        );

        if (response.status === 200) {
          callbackOnSuccess?.(response.data.product);
        } else {
          setRequestError('Something went wrong. Please try again later');
        }
      }
    } catch (error) {
      console.error(error);

      setRequestError('Something went wrong. Please try again later');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xl font-bold">{formTitle}</p>
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
        <Label htmlFor="cost">Cost (in cents)</Label>
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
          {formTitle}
        </Button>
      </div>
      <p className="py-1 text-sm text-muted-foreground text-red-300">
        {requestError}
      </p>
    </form>
  );
}
