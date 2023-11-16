import { DialogTitle } from '@radix-ui/react-dialog';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

import { RegisterFormProps, UserRole } from './types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function RegisterForm({ closeForm }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [usernameError, setUsernameError] = React.useState<string>('');
  const [role, setRole] = React.useState<UserRole | null>(null);
  const [roleError, setRoleError] = React.useState<string>('');

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

  function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUsername(value);
    setUsernameError('');
  }

  function onChangeRole(newRole: UserRole) {
    setRole(newRole);
    setRoleError('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setEmailError('Email is required');
    }

    if (!password) {
      setPasswordError('Password is required');
    }

    if (!username) {
      setUsernameError('Username is required');
    }

    if (!role) {
      setRoleError('Role is required');
    }

    if (!email || !password || !username || !role) {
      return;
    }

    const isSignedIn = await signUp({
      email,
      password,
      username,
      role,
    });

    if (isSignedIn) {
      closeForm();
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Register</DialogTitle>
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
        <div className="py-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            onChange={onChangeUsername}
            type="username"
            value={username}
          />
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {usernameError}
          </p>
        </div>
        <div className="py-2">
          <Label htmlFor="role">Role</Label>
          <RadioGroup id="role" onValueChange={onChangeRole} value={role || ''}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buyer" id="buyer" />
              <Label htmlFor="buyer">Buyer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seller" id="seller" />
              <Label htmlFor="seller">Seller</Label>
            </div>
          </RadioGroup>
          <p className="py-1 text-sm text-muted-foreground text-red-300">
            {roleError}
          </p>
        </div>
        <div className="pt-4 flex flex-1">
          <Button className="flex flex-1" type="submit">
            Register
          </Button>
        </div>
      </form>
    </>
  );
}
