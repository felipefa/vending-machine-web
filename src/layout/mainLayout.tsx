import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { useAuth } from '@/hooks/useAuth';

import { MainLayoutProps } from './types';

export function MainLayout({ children }: MainLayoutProps) {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isSignedIn && <Header />}
      <div className="flex flex-1">{children}</div>
      <Footer />
    </div>
  );
}
