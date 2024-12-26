import React from 'react'
import './App.css'
import { LoginButton, LogoutButton } from './components/Oauth0/LoginLogoutButtons'
import Profile from './components/Oauth0/Profile'

export default function App() {
  return (
    <>
    <LoginButton />
    <LogoutButton />
    <Profile />
    </>
)
}

