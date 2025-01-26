import React from 'react';
import AccountTypeSelectionButtons from "../components/Oauth0/AccountTypeSelectionButtons";
import '../styles/accountTypeSelection.css'

export default function AccountTypeSelection(){
    return (
        <div className='account-type-selection-page'>
        <h1>Haere Mai,</h1>
        <h1>Welcome!</h1>
        <h2 className='sub-header'> Are you a... </h2>
        <AccountTypeSelectionButtons />
        </div>   
    )
}