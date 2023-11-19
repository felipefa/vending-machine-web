import { Product } from '../types';

export type BuyProductDialogProps = {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
