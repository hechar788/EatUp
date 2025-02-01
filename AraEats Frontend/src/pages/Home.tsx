import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav'
import HomeHeader from '../components/home/HomeHeader'
import LocationPicker from '../components/google autocomplete/LocationPicker';
import '../styles/home/home.css'

type Props = {
    isAuthenticated: boolean
}

export default function Home({ isAuthenticated }: Props) {
    const [locationPopupVisible, setLocationPopupVisible] = useState(false);
    const [country, setCountry] = useState(
        {
            address: 'Christchurch, New Zealand',
            vicinity: 'Christchurch'
        }
    );

    useEffect(() => {
        if (locationPopupVisible) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = ''; // Re-enable scrolling
        }

        // Clean up the effect when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [locationPopupVisible]);

    return (
        <>
            <HomeHeader country={country} setLocationPopupVisible={setLocationPopupVisible} />
            <LocationPicker locationPopupVisible={locationPopupVisible} setLocationPopupVisible={setLocationPopupVisible} setCountry={setCountry} />
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