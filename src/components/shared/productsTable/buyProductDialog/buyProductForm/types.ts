import { Product } from '../../types';

export type BuyProductFormProps = {
  callbackOnSuccess: (newAmount: number) => void;
  product: Product;
};
