import React from 'react';
import Home from './pages/Home';
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
        <Route path="/profile" element={isAuthenticated ? <Profile isAuthenticated={isAuthenticated} accountType={accountType} /> : <Navigate to="/" />} />
        <Route path="/account-type-selection" element={accountType === 'new_user' ? <AccountTypeSelection /> : <Navigate to="/profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  