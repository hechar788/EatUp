import React from 'react';
import Home from './pages/Home';
import MerchantProfile from './pages/MerchantProfile';
import Explore from './pages/Explore';
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
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/merchants" element={<Home isAuthenticated={isAuthenticated} />}/>
        <Route path="/merchants/:id" element={<MerchantProfile isAuthenticated={isAuthenticated}/>}/>
        <Route path="/explore" element={<Explore isAuthenticated={isAuthenticated}/>}/>
        <Route path="/friends" element={<Explore isAuthenticated={isAuthenticated}/>}/>
        <Route path="/profile" element={isAuthenticated ? <Profile isAuthenticated={isAuthenticated} accountType={accountType} /> : <Navigate to="/" />} />
        <Route path="/account-type-selection" element={accountType === 'new_user' ? <AccountTypeSelection accountType={accountType}/> : <Navigate to="/profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}