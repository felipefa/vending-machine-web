import { RouterProvider } from 'react-router-dom';

import { Providers } from './hooks/Providers';
import { router } from './router';

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
