import { createBrowserRouter, redirect } from 'react-router-dom';

import { MainLayout } from '@/layout/mainLayout';
import { AddCoinsPage } from '@/pages/addCoinsPage';
import { AddProductPage } from '@/pages/addProductPage';
import { BuyerHomePage } from '@/pages/buyerHomePage';
import { BuyProductsPage } from '@/pages/buyProductsPage';
import { LandingPage } from '@/pages/landingPage';
import { ManageProductsPage } from '@/pages/manageProductsPage';
import { SellerHomePage } from '@/pages/sellerHomePage';
import { userIdTokenStorage } from '@/services/localStorage';

async function checkLogin() {
  const userIdToken = userIdTokenStorage.get();

  if (!userIdToken) {
    return redirect('/');
  }

  return null;
}

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: MainLayout,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },
      {
        path: 'seller',
        element: <SellerHomePage />,
        loader: checkLogin,
      },
      {
        path: 'add-product',
        element: <AddProductPage />,
        loader: checkLogin,
      },
      {
        path: 'manage-products',
        element: <ManageProductsPage />,
        loader: checkLogin,
      },
      {
        path: 'buyer',
        element: <BuyerHomePage />,
        loader: checkLogin,
      },
      {
        path: 'add-coins',
        element: <AddCoinsPage />,
        loader: checkLogin,
      },
      {
        path: 'buy-products',
        element: <BuyProductsPage />,
        loader: checkLogin,
      },
    ],
  },
]);
