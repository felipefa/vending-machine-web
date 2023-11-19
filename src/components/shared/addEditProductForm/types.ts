import { Product } from '../productsTable/types';

export type AddEditProductFormProps = {
  mode: 'add' | 'edit';
  product?: Product;
  callbackOnSuccess?: (product: Product) => void;
};
