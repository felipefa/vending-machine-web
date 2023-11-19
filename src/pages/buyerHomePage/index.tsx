import { Coins, ShoppingBasket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CardMenuItem } from '@/components/shared/cardMenuItem';

export function BuyerHomePage() {
  const navigate = useNavigate();

  function handleAddCoinsClick() {
    navigate('/add-coins');
  }

  function handleBuyProductsClick() {
    navigate('/buy-products');
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 flex-wrap items-center justify-center gap-6 p-4">
      <CardMenuItem
        label="Add coins"
        icon={<Coins className="w-16 h-16" />}
        onClick={handleAddCoinsClick}
      />
      <CardMenuItem
        label="Buy products"
        icon={<ShoppingBasket className="w-16 h-16" />}
        onClick={handleBuyProductsClick}
      />
    </div>
  );
}
