import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader'
import LocationPicker from '../components/google autocomplete/LocationPicker';
import StarSVG from '../assets/svg/star-svg';
import fakeMerchantData from '../lib/fakeMerchantData.json';
import { Location, CuisineType } from '../lib/types';
import '../styles/home/home.css'

type Props = {
    isAuthenticated: boolean
}

export default function Home({ isAuthenticated }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCuisineType, setSelectedCuisineType] = useState<CuisineType | null>(null);
    const [locationPopupVisible, setLocationPopupVisible] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>({
        address: 'Christchurch, New Zealand',
        vicinity: 'Christchurch'
    });

    useEffect(() => {
        if (locationPopupVisible) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else { document.body.style.overflow = ''; } // Re-enable scrolling 
        return () => { document.body.style.overflow = ''; }
    }, [locationPopupVisible]);

    // Filter merchants based on selected cuisine type
    const filteredMerchants = React.useMemo(() => {
        if (selectedCuisineType) {
            return fakeMerchantData.filter(merchant => 
                merchant.category.toLowerCase() === selectedCuisineType.toLowerCase()
            );
        } else {
            return fakeMerchantData; // Show all merchants if no cuisine type selected
        }
    }, [selectedCuisineType]);

    return (
        <>
            <HomeHeader 
                setSelectedCuisineType={setSelectedCuisineType} 
                searchParams={searchParams} 
                setSearchParams={setSearchParams} 
                location={location} 
                setLocationPopupVisible={setLocationPopupVisible} 
            />

            {locationPopupVisible && (
                <LocationPicker 
                    setLocationPopupVisible={setLocationPopupVisible} 
                    setLocation={setLocation} 
                />
            )}

            <div className="home-list-main">
                {filteredMerchants.length > 0 ? (
                    filteredMerchants.map((merchant, index) => (
                        <Link to={`/merchants/${merchant.id}`}>
                        <div className="merchant-container" key={index}>
                            <img src={`/src/assets/merchantPhotos/${merchant.filename}`} alt={merchant.name} />
                            <div>
                                <h4>{merchant.name}</h4>
                                <div className="merchant-rating">
                                    <div>{merchant.rating} <StarSVG /> <p>(100)</p></div> - <p>{merchant.category}</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No merchants found for {selectedCuisineType || 'any cuisine'}</p>
                    </div>
                )}
            </div>
            <BottomNav isAuthenticated={isAuthenticated} />
        </>
    )
}