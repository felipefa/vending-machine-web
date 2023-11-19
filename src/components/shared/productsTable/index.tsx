import { Trash } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { productsService } from '@/services/products';

import { BuyProductDialog } from './buyProductDialog';
import { EditProductDialog } from './editProductDialog';
import { Product, ProductsTableProps } from './types';

export function ProductsTable({ mode }: ProductsTableProps) {
  const { user, userIdToken } = useAuth();

  const [products, setProducts] = React.useState<Product[]>([]);

  const tableTitle = mode === 'buy' ? 'Buy Products' : 'Manage Products';

  async function deleteProduct(productId: string) {
    try {
      if (!userIdToken) {
        return;
      }

      const response = await productsService.delete(productId, userIdToken);

      if (response.status === 200) {
        setProducts((oldProducts) =>
          oldProducts.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productsService.getAll();

        if (response.status === 200 && response.data.products) {
          if (mode === 'buy') {
            setProducts(response.data.products);
            return;
          }

          if (mode === 'manage' && user?.id) {
            setProducts(
              response.data.products.filter(
                (product: Product) => product.sellerId === user.id
              )
            );
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (mode === 'buy' || (mode === 'manage' && user?.id)) {
      fetchProducts();
    }
  }, [mode, user?.id]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col flex-1 max-w-[300px] sm:max-w-[500px] md:max-w-[750px]">
        <p className="mb-6 text-center text-xl">{tableTitle}</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:text-lg">Product Name</TableHead>
              <TableHead className="md:text-lg text-right">Cost</TableHead>
              <TableHead className="md:text-lg text-right">Amount</TableHead>
              {mode === 'buy' && (
                <TableHead className="md:text-lg text-right">Buy</TableHead>
              )}
              {mode === 'manage' && (
                <>
                  <TableHead className="md:text-lg text-right">Edit</TableHead>
                  <TableHead className="md:text-lg text-right">
                    Delete
                  </TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="md:text-lg">
                  {product.productName}
                </TableCell>
                <TableCell className="md:text-lg text-right">
                  {product.cost}
                </TableCell>
                <TableCell className="md:text-lg text-right">
                  {product.amountAvailable}
                </TableCell>
                {mode === 'buy' && (
                  <TableCell className="text-right">
                    <BuyProductDialog
                      product={product}
                      setProducts={setProducts}
                    />
                  </TableCell>
                )}
                {mode === 'manage' && (
                  <>
                    <TableCell className="text-right">
                      <EditProductDialog
                        product={product}
                        setProducts={setProducts}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        variant="destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
