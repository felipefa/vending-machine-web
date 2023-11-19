export type Product = {
  amountAvailable: number;
  cost: number;
  id: string;
  productName: string;
  sellerId: string;
};

export type ProductsTableProps = {
  mode: 'manage' | 'buy';
};
