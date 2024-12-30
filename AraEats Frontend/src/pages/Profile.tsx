import React from 'react'
import Nav from '../components/Nav'
import ProfileContent from '../components/Oauth0/ProfileContent'

export default function Profile({ accountType }) {
    return (
    <>
        <Nav />
        <ProfileContent accountType={accountType} />
    </>
    )
}