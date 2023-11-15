import { useState } from 'react';

import { MainLayout } from '@/layout/mainLayout';

export function UserRegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          Role:
          <br />
          <label>
            <input
              type="radio"
              value="buyer"
              checked={role === 'buyer'}
              onChange={handleRoleChange}
            />
            Buyer
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="seller"
              checked={role === 'seller'}
              onChange={handleRoleChange}
            />
            Seller
          </label>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <div>
        <span className="text-sm text-muted-foreground">
          Already have an account?
          <a className="font-bold hover:underline ml-1" href="/login">
            Log in here
          </a>
        </span>
      </div>
    </MainLayout>
  );
}
