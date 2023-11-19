import { Pencil } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddEditProductForm } from '@/components/shared/addEditProductForm';

import { Product } from '../types';
import { EditProductDialogProps } from './types';

export function EditProductDialog({
  product,
  setProducts,
}: EditProductDialogProps) {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  function onOpenChange(open: boolean) {
    setShowDialog(open);
  }

  function onButtonClick() {
    setShowDialog(true);
  }

  function onFormSubmitSuccessfully(newProduct: Product) {
    setProducts((oldProducts) =>
      oldProducts.map((oldProduct) =>
        oldProduct.id === newProduct.id ? newProduct : oldProduct
      )
    );
    setShowDialog(false);
  }

  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onButtonClick} variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddEditProductForm
          callbackOnSuccess={onFormSubmitSuccessfully}
          mode="edit"
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
}
