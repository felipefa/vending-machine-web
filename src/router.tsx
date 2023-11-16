import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { HomePage } from './pages/homePage';

export const router = createBrowserRouter(
  createRoutesFromElements([<Route path="/" element={<HomePage />} />])
);
