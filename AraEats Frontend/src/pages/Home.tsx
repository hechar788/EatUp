import React from 'react';
import BottomNav from '../components/BottomNav'
import HomeHeader from '../components/home/HomeHeader'
import '../styles/home/home.css'

type Props = {
    isAuthenticated: boolean
}

export default function Home({isAuthenticated}: Props){
    return (
        <>
        <HomeHeader />
        <div className="home-list-main">
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
            <div><p>Merchant Template</p></div>
        </div>
        <BottomNav isAuthenticated={isAuthenticated} />
        </>
    )
}