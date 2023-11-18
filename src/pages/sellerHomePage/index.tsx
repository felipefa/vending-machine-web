import { Package, PackagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CardMenuItem } from '@/components/shared/cardMenuItem';

export function SellerHomePage() {
  const navigate = useNavigate();

  function handleAddProductClick() {
    navigate('/add-product');
  }

  function handleManageProductsClick() {
    navigate('/manage-products');
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 flex-wrap items-center justify-center gap-6 p-4">
      <CardMenuItem
        label="Add Product"
        icon={<PackagePlus className="w-16 h-16" />}
        onClick={handleAddProductClick}
      />
      <CardMenuItem
        label="Manage Products"
        icon={<Package className="w-16 h-16" />}
        onClick={handleManageProductsClick}
      />
    </div>
  );
}
