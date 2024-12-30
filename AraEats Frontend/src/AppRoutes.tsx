import React from "react";
import Home from './pages/Home';
import Profile from './pages/Profile';
import AccountTypeSelection from './pages/AccountTypeSelection';
import { Navigate, Routes, Route } from "react-router";

export default function AppRoutes({isAuthenticated, accountType}) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={isAuthenticated ? <Profile accountType={accountType} /> : <Navigate to="/" />} />
        <Route path="/account-type-selection" element={accountType === 'new_user' ? <AccountTypeSelection /> : <Navigate to="/profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  