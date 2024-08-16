import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '805933778908-0uotvtnd9m79updcappqrpq21qhdbcq6.apps.googleusercontent.com'; 

export const GoogleAuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};
