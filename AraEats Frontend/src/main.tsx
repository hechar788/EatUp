import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="ara-eats.au.auth0.com"
    clientId="Ly3pLbGXeO2fMSMtVcHcpm8IbR5FehQX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
)
