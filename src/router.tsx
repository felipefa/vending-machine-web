import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { UserLoginPage } from './pages/userLoginPage';
import { UserRegistrationPage } from './pages/userRegistrationPage';
import { HomePage } from './pages/homePage';

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<HomePage />} />,
    <Route path="login" element={<UserLoginPage />} />,
    <Route path="register" element={<UserRegistrationPage />} />,
  ])
);
