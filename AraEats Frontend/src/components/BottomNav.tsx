import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useMatch } from "react-router";
import { LoginButton, LogoutButton } from './Oauth0/LoginLogout';
import ProfileSVG from "../assets/svg/profile-svg";
import ExploreSVG from "../assets/svg/magnifying-glass-svg";
import HomeSVG from "../assets/svg/home-svg";
import ForYouSVG from "../assets/svg/film-reel-svg";
import "../styles/nav.css";

type Props = {
    isAuthenticated: boolean;
}

export default function BottomNav({ isAuthenticated }: Props) {
    const match = useMatch('/profile');
    const [DisplayProfileButtons, setDisplayProfileButtons] = useState<boolean>(false);
    const profileButtonsRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside both .nav-profile-button and .nav-profile-buttons
            if (
                profileButtonRef.current && !profileButtonRef.current.contains(event.target as Node) &&
                profileButtonsRef.current && !profileButtonsRef.current.contains(event.target as Node)
            ) {
                setDisplayProfileButtons(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav>
                <NavLink to="/">
                    <div>
                        <HomeSVG />
                        <p>Home</p>
                    </div>
                </NavLink>

                <NavLink to="/profile">
                    <div>
                        <ExploreSVG />
                        <p>Explore</p>
                    </div>
                </NavLink>

                <NavLink to="/profile">
                    <div>
                        <ForYouSVG />
                        <p>For You</p>
                    </div>
                </NavLink>

                <div 
                    ref={profileButtonRef}
                    className={`nav-profile-button${DisplayProfileButtons ? ' hover' : match ? ' active' : ''}`}
                    onClick={() => { setDisplayProfileButtons(!DisplayProfileButtons) }}
                >
                    <ProfileSVG />
                    <p>My Account</p>
                </div>
            </nav>

            {DisplayProfileButtons && (
                <div className='nav-profile-buttons' ref={profileButtonsRef}>
                    {!isAuthenticated && <LoginButton />}
                    {isAuthenticated && <div><Link to="/profile"><p>View Profile</p></Link></div>}
                    {isAuthenticated && <LogoutButton />}
                </div>
            )}
        </>
    );
}