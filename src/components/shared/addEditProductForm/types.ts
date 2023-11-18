import { Product } from '@/pages/manageProductPage/types';

export type AddEditProductFormProps = {
  mode: 'add' | 'edit';
  product?: Product;
  callbackOnSuccess?: (product: Product) => void;
};
