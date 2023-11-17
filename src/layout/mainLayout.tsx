import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { useAuth } from '@/hooks/useAuth';

export function MainLayout() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isSignedIn && <Header />}
      <div className="flex flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
