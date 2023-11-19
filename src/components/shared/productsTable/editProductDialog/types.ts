import { Product } from '../types';

export type EditProductDialogProps = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
