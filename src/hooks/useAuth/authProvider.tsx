import React from 'react';

import { AuthContext } from './authContext';
import { AuthProviderProps, SignUpUser, User } from './types';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userIdToken, setUserIdToken] = React.useState<string | null>(null);

  async function signUp(newUser: SignUpUser) {
    console.log(newUser);
    setUser(null);
    setUserIdToken('');
    return true;
  }

  async function signIn(email: string, password: string) {
    console.log(email, password);
    setUser(null);
    setUserIdToken('');
    return true;
  }

  async function signOut() {
    setUser(null);
    setUserIdToken(null);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!userIdToken,
        signIn,
        signOut,
        signUp,
        user,
        userIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
