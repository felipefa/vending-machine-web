import React from 'react';

import { AuthContextData } from './types';

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);
