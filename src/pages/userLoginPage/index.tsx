import React, { useState } from 'react';

import { MainLayout } from '@/layout/mainLayout';

interface User {
  username: string;
  password: string;
}

export function UserLoginPage() {
  const [user, setUser] = useState<User>({ username: '', password: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user); // replace with actual login logic
  };

  return (
    <MainLayout>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div>
        <span className="text-sm text-muted-foreground">
          Don't have an account yet?
          <a className="font-bold hover:underline ml-1" href="/register">
            Sign up here
          </a>
        </span>
      </div>
    </MainLayout>
  );
}
