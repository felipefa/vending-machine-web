import { useNavigate } from 'react-router-dom';

import { MainLayout } from '@/layout/mainLayout';

export function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <MainLayout>
      <>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </>
    </MainLayout>
  );
}
