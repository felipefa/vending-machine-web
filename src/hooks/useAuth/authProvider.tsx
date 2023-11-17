import * as React from 'react';

import { usersService } from '@/services/users';

import { AuthContext } from './authContext';
import { AuthProviderProps, SignUpUser, User } from './types';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userIdToken, setUserIdToken] = React.useState<string | null>(null);

  async function signUp(newUser: SignUpUser) {
    try {
      const userCreationRequest = await usersService.create(newUser);

      if (userCreationRequest.status === 201 && userCreationRequest.data.user) {
        const userLoginRequest = await usersService.login(
          newUser.email,
          newUser.password
        );

        if (
          userLoginRequest.status === 200 &&
          userLoginRequest.data.user &&
          userLoginRequest.data.userIdToken
        ) {
          setUser(userLoginRequest.data.user as User);
          setUserIdToken(userLoginRequest.data.userIdToken as string);

          sessionStorage.setItem(
            'user',
            JSON.stringify(userLoginRequest.data.user)
          );
          sessionStorage.setItem(
            'userIdToken',
            userLoginRequest.data.userIdToken
          );

          return true;
        } else {
          throw new Error('User created but there was an error signing in');
        }
      } else {
        throw new Error('Error creating user');
      }
    } catch (error) {
      console.log(error);

      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userIdToken');

      setUser(null);
      setUserIdToken(null);

      return false;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userLoginRequest = await usersService.login(email, password);

      if (
        userLoginRequest.status === 200 &&
        userLoginRequest.data.user &&
        userLoginRequest.data.userIdToken
      ) {
        setUser(userLoginRequest.data.user as User);
        setUserIdToken(userLoginRequest.data.userIdToken as string);

        sessionStorage.setItem(
          'user',
          JSON.stringify(userLoginRequest.data.user)
        );
        sessionStorage.setItem(
          'userIdToken',
          userLoginRequest.data.userIdToken
        );

        return true;
      } else {
        throw new Error('Something went wrong while trying to sign in');
      }
    } catch (error) {
      console.log(error);

      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userIdToken');

      setUser(null);
      setUserIdToken(null);

      return false;
    }
  }

  function signOut() {
    try {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userIdToken');

      setUser(null);
      setUserIdToken(null);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  React.useEffect(() => {
    function checkSessionStorage() {
      try {
        const user = sessionStorage.getItem('user');
        const userIdToken = sessionStorage.getItem('userIdToken');

        if (user && userIdToken) {
          setUser(JSON.parse(user));
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
