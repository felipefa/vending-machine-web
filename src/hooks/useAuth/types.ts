export type AuthProviderProps = {
  children: React.ReactNode;
};

export type User = {
  createdAt: Date;
  deposit: number;
  email: string;
  id: string;
  role: 'buyer' | 'seller';
  username: string;
};

export type SignUpUser = {
  email: string;
  password: string;
  role: 'buyer' | 'seller';
  username: string;
};

export type AuthContextData = {
  depositFormatted?: string;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => boolean;
  signUp: (user: SignUpUser) => Promise<boolean>;
  updateDeposit: (newDeposit: number) => void;
  user: User | null;
  userIdToken: string | null;
};
