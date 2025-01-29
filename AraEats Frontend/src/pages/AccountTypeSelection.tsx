import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AccountTypeSelectionButtons from "../components/signup/AccountTypeSelectionButtons";
import CustomerSignupForm from '../components/signup/CustomerSignupFom';
import MerchantSignupForm from '../components/signup/MerchantSignupForm';
import '../styles/signup/accountTypeSelection.css'

type UserSelectedAccountType = 'merchant' | 'customer' | undefined;
type Props = {
    accountType: 'new_user'
}

export default function AccountTypeSelection({ accountType }: Props) {
    const [userSelectedAccountType, setUserSelectedAccountType] = useState<UserSelectedAccountType>();
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

    useEffect(() => {
        console.log(accountType)
    }, [])

    return (
        <div className='account-type-selection-page'>
            {
                // !userSelectedAccountType &&
                <>
                    <h1>Haere Mai,</h1>
                    <h1>Welcome!</h1>
                    <h2 className='sub-header'> Are you a... </h2>
                    <AccountTypeSelectionButtons setUserSelectedAccountType={setUserSelectedAccountType} />
                </>
            }
            {
                userSelectedAccountType == 'customer' &&
                <CustomerSignupForm/>
            }
            {
                userSelectedAccountType == 'merchant' &&
                <MerchantSignupForm />
            }
        </div>
    )
}