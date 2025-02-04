import React from 'react';
import CuisineTypeCarousel from './CuisineTypeCarousel';
import LocationSVG from '../../assets/svg/location-pin-svg';
import Searchbar from './Searchbar';
import '../../styles/home/homeHeader.css';


export default function HomeHeader({location, setLocationPopupVisible}) {
    return (
        <>
       <div className="home-header-container">

            <span className="home-header-span">
                <LocationSVG />
                <p>{`${location.vicinity}, New Zealand`}</p>
                <a onClick={() => { setLocationPopupVisible(true) }}><strong>Change...</strong></a>
            </span>
            <Searchbar />
            
        </div>

        <CuisineTypeCarousel />
        </>

    )
}