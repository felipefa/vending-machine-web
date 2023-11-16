import { AuthDialog } from '@/components/shared/authDialog';
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/layout/mainLayout';

export function HomePage() {
  const { isSignedIn } = useAuth();

  return <MainLayout>{isSignedIn ? <></> : <AuthDialog />}</MainLayout>;
}
