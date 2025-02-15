import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import BottomNav from '../components/BottomNav'
import HomeHeader from '../components/home/HomeHeader'
import LocationPicker from '../components/google autocomplete/LocationPicker';
import { Location } from '../lib/types';
import fakeMerchantData from '../lib/fakeMerchantData.json';
import '../styles/home/home.css'

type Props = {
    isAuthenticated: boolean
}

export default function Home({ isAuthenticated }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [locationPopupVisible, setLocationPopupVisible] = useState<boolean>(false);
    const [location, setLocation] = useState<Location | undefined>(
        {
            address: 'Christchurch, New Zealand',
            vicinity: 'Christchurch'
        }
    );

    useEffect(() => {
        if (locationPopupVisible) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else { document.body.style.overflow = ''; } // Re-enable scrolling 
        return () => { document.body.style.overflow = ''; }
    }, [locationPopupVisible]);

    return (
        <>
            <HomeHeader searchParams={searchParams} setSearchParams={setSearchParams} location={location} setLocationPopupVisible={setLocationPopupVisible} />

            {
                locationPopupVisible && <LocationPicker setLocationPopupVisible={setLocationPopupVisible} setLocation={setLocation} />
            }

            <div className="home-list-main">
                {fakeMerchantData.map((merchant, index) => (
                    <div key={index}>
                        <img src={`/src/assets/merchant-photos/${merchant.filename}`}/>
                        <p>{merchant.name} - {merchant.category} - Rating: {merchant.rating}</p>
                    </div>
                ))}
            </div>
            <BottomNav isAuthenticated={isAuthenticated} />
        </>
    )
}