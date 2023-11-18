import { Pencil, Trash } from 'lucide-react';
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

import { Product } from './types';

export function ManageProductsPage() {
  const { user, userIdToken } = useAuth();

  const [products, setProducts] = React.useState<Product[]>([]);

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
          setProducts(
            response.data.products.filter(
              (product: Product) => product.sellerId === user?.id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user?.id) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col flex-1 max-w-[300px] sm:max-w-[500px] md:max-w-[750px]">
        <p className="mb-6 text-center text-xl">Manage Products</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:text-lg">Product Name</TableHead>
              <TableHead className="md:text-lg text-right">Cost</TableHead>
              <TableHead className="md:text-lg text-right">Amount</TableHead>
              <TableHead className="md:text-lg text-right">Edit</TableHead>
              <TableHead className="md:text-lg text-right">Delete</TableHead>
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
                <TableCell className="text-right">
                  <Button variant="outline">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => deleteProduct(product.id)}
                    variant="destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
