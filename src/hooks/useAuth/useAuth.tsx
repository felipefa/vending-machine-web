import React from 'react';

import { AuthContext } from './authContext';
import { AuthContextData } from './types';

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
