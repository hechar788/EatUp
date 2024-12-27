import React from "react"
import { NavLink } from "react-router";
import { LoginButton, LogoutButton } from './Oauth0/LoginLogout'
import { useAuth0 } from '@auth0/auth0-react';

// Only using OAuth0 SDK here to determine whether user is logged in before displaying the profile button 

export default function Nav() {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
            {isAuthenticated && <NavLink to="/profile"><button>Profile</button></NavLink>}
        </>
    )
}