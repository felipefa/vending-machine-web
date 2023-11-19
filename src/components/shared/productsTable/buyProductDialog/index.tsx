import { ShoppingBasket } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { BuyProductForm } from './buyProductForm';
import { BuyProductDialogProps } from './types';

export function BuyProductDialog({
  product,
  setProducts,
}: BuyProductDialogProps) {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  function onOpenChange(open: boolean) {
    setShowDialog(open);
  }

  function onButtonClick() {
    setShowDialog(true);
  }

  function onFormSubmitSuccessfully(newAmount: number) {
    setProducts((oldProducts) =>
      oldProducts.map((oldProduct) =>
        oldProduct.id === product.id
          ? { ...oldProduct, amountAvailable: newAmount }
          : oldProduct
      )
    );
    setShowDialog(false);
  }

  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onButtonClick} variant="outline">
          <ShoppingBasket className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <BuyProductForm
          callbackOnSuccess={onFormSubmitSuccessfully}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
}
