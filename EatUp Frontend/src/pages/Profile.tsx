import React from 'react';
import BottomNav from '../components/BottomNav'
import ProfileContent from '../components/Oauth0/ProfileContent'

type Props = {
    accountType: 'new_user' | 'merchant' | 'customer',
}

export default function Profile({ accountType }: Props) {
    return (
    <>
        <ProfileContent accountType={accountType} />
        <BottomNav />
    </>
    )
}