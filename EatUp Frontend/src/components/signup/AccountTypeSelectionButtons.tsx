import React from 'react';

export default function AccountTypeSelectionButtons({setUserSelectedAccountType}) {
  return (
    <div>
      <button className='account-type-selection-button' onClick={() => setUserSelectedAccountType('customer')}><h3>Customer</h3></button>
      <h2> Or </h2>
      <button className='account-type-selection-button' onClick={() => setUserSelectedAccountType('merchant')}><h3>Food Merchant</h3></button>
    </div>
  );
}