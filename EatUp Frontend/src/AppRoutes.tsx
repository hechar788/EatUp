import React from 'react';

import Home from './pages/Home';
import MerchantPublicProfile from './pages/MerchantPublicProfile';

import Explore from './pages/Explore';
import Reels from './pages/Reels';

import Profile from './pages/Profile';
import AccountTypeSelection from './pages/AccountTypeSelection';
import { Navigate, Routes, Route } from "react-router";

type Props = {
  isAuthenticated: boolean;
  accountType: 'new_user' | 'merchant' | 'customer';
};

export default function AppRoutes({isAuthenticated, accountType}: Props) {
    return (
      <Routes>
        <Route path="/" element={<Explore />} />
        
        <Route path="/merchants" element={<Home />}/>
        <Route path="/merchants/:id/:page" element={<MerchantPublicProfile />}/>

        <Route path="/explore" element={<Explore/>}/>
        <Route path="/reels/:merchantid/:postid" element={<Reels />}/>

        <Route path="/friends" element={<Explore/>}/>

        <Route path="/profile" element={isAuthenticated ? <Profile accountType={accountType} /> : <Navigate to="/" />} />
        <Route path="/account-type-selection" element={accountType === 'new_user' ? <AccountTypeSelection accountType={accountType}/> : <Navigate to="/profile" />} />

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
  );
}