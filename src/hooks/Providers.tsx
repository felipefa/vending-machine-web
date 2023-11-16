import { ProviderProps } from './types';
import { AuthProvider } from './useAuth/authProvider';

export function Providers({ children }: ProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
