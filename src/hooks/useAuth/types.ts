export type AuthProviderProps = {
  children: React.ReactNode;
};

export type User = {
  createdAt: Date;
  deposit: number;
  email: string;
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
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  signUp: (user: SignUpUser) => Promise<boolean>;
  user: User | null;
  userIdToken: string | null;
};
