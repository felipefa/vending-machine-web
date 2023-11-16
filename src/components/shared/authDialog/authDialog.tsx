import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';
import { FormType } from './types';

export function AuthDialog() {
  const [formType, setFormType] = React.useState<FormType>(null);

  const showForm = formType !== null;

  function closeForm() {
    setFormType(null);
  }

  function onFormOpenChange(open: boolean) {
    setFormType((oldValue) => (open ? oldValue : null));
  }

  function onLoginClick() {
    setFormType('login');
  }

  function onRegisterClick() {
    setFormType('register');
  }

  return (
    <Dialog open={showForm} onOpenChange={onFormOpenChange}>
      <DialogTrigger asChild>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-1 gap-4 p-4 sm:max-w-[425px] items-center justify-center">
            <Button
              className="flex flex-1"
              onClick={onLoginClick}
              variant="outline"
            >
              Login
            </Button>
            <Button
              className="flex flex-1"
              onClick={onRegisterClick}
              variant="ghost"
            >
              Register
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {formType === 'login' ? <LoginForm closeForm={closeForm} /> : null}
        {formType === 'register' ? (
          <RegisterForm closeForm={closeForm} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
