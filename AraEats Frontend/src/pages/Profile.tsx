import React from 'react';
import Nav from '../components/BottomNav'
import ProfileContent from '../components/Oauth0/ProfileContent'

type Props = {
    accountType: 'new_user' | 'merchant' | 'customer',
    isAuthenticated: boolean
}

export default function Profile({ accountType, isAuthenticated }: Props) {
    return (
    <>
        <ProfileContent accountType={accountType} />
        <Nav isAuthenticated={isAuthenticated}/>
    </>
    )
}