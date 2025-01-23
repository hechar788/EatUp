import React from 'react';

// import { NavLink } from "react-router";
// import { LoginButton, LogoutButton } from './Oauth0/LoginLogout'
// import { useAuth0 } from '@auth0/auth0-react';

import ProfileSVG from "../assets/svg/profile-svg";
import ExploreSVG from "../assets/svg/magnifying-glass-svg";
import HomeSVG from "../assets/svg/home-svg";
import ForYouSVG from "../assets/svg/film-reel-svg";
import "../styles/nav.css"

// Only using OAuth0 SDK here to determine whether user is logged in before displaying the profile button 

export default function BottomNav() {
    // const { isAuthenticated } = useAuth0();

    return (
        <nav>
            <div>
                <HomeSVG />
                <p>Home</p>

            </div>
            <div>
                <ExploreSVG />
                <p>Explore</p>

            </div>
            <div>
                <ForYouSVG />
                <p>For You</p>

            </div>
            <div>
                <ProfileSVG />
                <p>Account</p>

            {/* THIS IS USED FOR DISPLAYING THE LOGIN/LOGOUT BUTTONS TO THE USER DEPENDING ON THE CURRENT AUTH FLOW, NEEDS TO BE UPDATED SO THAT WHEN THE PROFILE SVG IS CLICKED IT
                GIVES THE FOLLOWNIG OPTIONS TO THE USER
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
            {isAuthenticated && <NavLink to="/profile">View Profile</NavLink>} */}
            </div>
        </nav>
    )
}