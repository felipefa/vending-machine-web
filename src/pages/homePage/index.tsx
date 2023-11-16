import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/layout/mainLayout';

export function HomePage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <MainLayout>
      {isSignedIn ? (
        <></>
      ) : (
        <>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </>
      )}
    </MainLayout>
  );
}
