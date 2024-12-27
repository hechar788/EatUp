import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Home />}></Route>
      </Routes>
    </BrowserRouter>
)
}

