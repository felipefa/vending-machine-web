import * as React from 'react';

import vendingMachineSvg from '@/assets/vending-machine.svg';
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
        <div className="flex flex-col flex-1 text-center justify-center py-6">
          <div className="flex items-center justify-center min-w-full">
            <img className="sm:max-w-[425px]" src={vendingMachineSvg} />
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Vending Machine
          </h1>
          <div className="flex flex-col py-6 justify-center min-w-full [&:not(:first-child)]:mt-6 md:max-w-lg">
            <p className="text-xl">Craving a quick snack? Look no further!</p>
            <p className="text-xl">
              Introducing the cutting-edge vending machine app that brings your
              favourite snacks and drinks to your fingertips.
            </p>
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="flex flex-1 gap-4 p-4 sm:max-w-[425px] items-center justify-center">
              <Button
                className="flex flex-1"
                onClick={onLoginClick}
                variant="default"
              >
                Login
              </Button>
              <Button
                className="flex flex-1"
                onClick={onRegisterClick}
                variant="outline"
              >
                Register
              </Button>
            </div>
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
