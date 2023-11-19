import * as React from 'react';

import { userIdTokenStorage, userStorage } from '@/services/localStorage';
import { usersService } from '@/services/users';
import { formatCurrency } from '@/utils/formatCurrency';

import { AuthContext } from './authContext';
import { AuthProviderProps, SignUpUser, User } from './types';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userIdToken, setUserIdToken] = React.useState<string | null>(null);

  const depositFormatted = React.useMemo(
    () => formatCurrency(user?.deposit ?? 0),
    [user?.deposit]
  );

  function updateDeposit(deposit: number) {
    setUser((oldUser) => {
      if (oldUser) {
        const newUser = { ...oldUser, deposit };

        userStorage.set(newUser);

        return newUser;
      }

      return oldUser;
    });
  }

  async function signUp(newUser: SignUpUser) {
    try {
      const userCreationRequest = await usersService.create(newUser);

      if (userCreationRequest.status === 201 && userCreationRequest.data.user) {
        const userLoginRequest = await usersService.login(
          newUser.email,
          newUser.password
        );

        const user = userLoginRequest.data.user as User;
        const userIdToken = userLoginRequest.data.userIdToken as string;

        if (userLoginRequest.status === 200 && user && userIdToken) {
          setUser(user);
          setUserIdToken(userIdToken);

          userStorage.set(user);
          userIdTokenStorage.set(userIdToken);

          return true;
        } else {
          throw new Error('User created but there was an error signing in');
        }
      } else {
        throw new Error('Error creating user');
      }
    } catch (error) {
      console.log(error);

      userStorage.remove();
      userIdTokenStorage.remove();

      setUser(null);
      setUserIdToken(null);

      return false;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userLoginRequest = await usersService.login(email, password);

      const user = userLoginRequest.data.user as User;
      const userIdToken = userLoginRequest.data.userIdToken as string;

      if (userLoginRequest.status === 200 && user && userIdToken) {
        setUser(user);
        setUserIdToken(userIdToken);

        userStorage.set(user);
        userIdTokenStorage.set(userIdToken);

        return true;
      } else {
        throw new Error('Something went wrong while trying to sign in');
      }
    } catch (error) {
      console.log(error);

      userStorage.remove();
      userIdTokenStorage.remove();

      setUser(null);
      setUserIdToken(null);

      return false;
    }
  }

  function signOut() {
    try {
      userStorage.remove();
      userIdTokenStorage.remove();

      window.location.reload();

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  React.useEffect(() => {
    function checkSessionStorage() {
      try {
        const user = userStorage.get();
        const userIdToken = userIdTokenStorage.get();

        if (user && userIdToken) {
          setUser(user);
          setUserIdToken(userIdToken);
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkSessionStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        depositFormatted,
        isSignedIn: !!userIdToken,
        signIn,
        signOut,
        signUp,
        updateDeposit,
        user,
        userIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
