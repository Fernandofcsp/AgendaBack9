import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '805933778908-b9ds0nhv2ce7navd3drsu5c8mljbjeop.apps.googleusercontent.com'; 

export const GoogleAuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};
