import React, { useState } from 'react';
import CuisineTypeCarousel from './CuisineTypeCarousel';
import AutoCompAddress from './AutoCompAddress';
import LocationSVG from '../../assets/svg/location-pin-svg';
import '../../styles/home/homeHeader.css';


export default function HomeHeader() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const changeLocationPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const savePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <>
       <div className="home-header-container">
            <span>
                <LocationSVG />
                <p>Christchruch, New Zealand</p>
                {/* Location change to the City and Country of prompt */}
                <a onClick={() => { changeLocationPopup() }}><strong>Change...</strong></a>
            </span>
            {/* Popup Window */}
            {isPopupVisible && (
                    <div className="popUpWindow">
                        <button className='close' onClick={closePopup}>Close</button>
                        <button className='save' onClick={savePopup}>Save Location</button>
                        <AutoCompAddress />
                    </div>
                )}
            <form>
                <input type="text" placeholder='Search Here...' />
            </form>
        </div>
        <CuisineTypeCarousel />
        </>

    )
}