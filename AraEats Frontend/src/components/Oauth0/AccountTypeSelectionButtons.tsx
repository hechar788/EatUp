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
    <div>
      <button className='account-type-selection-button' onClick={() => handleAccountTypeUpdate('customer')}><h3>Customer</h3></button>
      <h2> Or </h2>
      <button className='account-type-selection-button' onClick={() => handleAccountTypeUpdate('merchant')}><h3>Food Merchant</h3></button>
    </div>
  );
}