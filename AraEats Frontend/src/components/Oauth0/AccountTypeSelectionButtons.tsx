import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function AccountTypeSelectionButtons() {
  const { loginWithRedirect } = useAuth0();

  const handleAccountTypeUpdate = async (type: 'merchant' | 'customer'
  ) => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      },
      authorizationParams: { accountType: type }
    });
  }

  return (
    <>
      <button onClick={() => handleAccountTypeUpdate('customer')}>Customer</button>
      <button onClick={() => handleAccountTypeUpdate('merchant')}>Food Merchant</button>
    </>
  );
}