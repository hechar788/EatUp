import React from 'react';
import CuisineTypeCarousel from './CuisineTypeCarousel';
import LocationSVG from '../../assets/svg/location-pin-svg';
import '../../styles/home/homeHeader.css';


export default function HomeHeader({country, setLocationPopupVisible}) {
    return (
        <>
       <div className="home-header-container">

            <span className="home-header-span">
                <LocationSVG />
                <p>{`${country.vicinity}, New Zealand`}</p>
                <a onClick={() => { setLocationPopupVisible(true) }}><strong>Change...</strong></a>
            </span>

            <form>
                <input type="text" placeholder='Search Here...' />
            </form>
        </div>

        <CuisineTypeCarousel />
        </>

    )
}