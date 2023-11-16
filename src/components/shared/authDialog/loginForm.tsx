import { DialogTitle } from '@radix-ui/react-dialog';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

import { LoginFormProps } from './types';

export function LoginForm({ closeForm }: LoginFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setEmail(value);
    setEmailError('');
  }

  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setPassword(value);
    setPasswordError('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setEmailError('Email is required');
    }

    if (!password) {
      setPasswordError('Password is required');
    }

    if (!email || !password) {
      return;
    }

    const isSignedIn = await signIn(email, password);

    if (isSignedIn) {
      closeForm();
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" onChange={onChangeEmail} value={email} />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {emailError}
          </p>
        </div>
        <div className="py-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            onChange={onChangePassword}
            type="password"
            value={password}
          />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {passwordError}
          </p>
        </div>
        <div className="pt-4 flex flex-1">
          <Button className="flex flex-1" type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
}
