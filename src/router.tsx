import { createBrowserRouter, redirect } from 'react-router-dom';

import { MainLayout } from '@/layout/mainLayout';
import { LandingPage } from '@/pages/landingPage';
import { SellerHomePage } from '@/pages/sellerHomePage';
import { AddProductPage } from '@/pages/addProductPage';
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
        element: <div>Manage Products</div>,
        loader: checkLogin,
      },
    ],
  },
]);
