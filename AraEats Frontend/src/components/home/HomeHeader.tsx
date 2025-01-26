import React from 'react';
import CuisineTypeCarousel from './CuisineTypeCarousel';
import LocationSVG from '../../assets/svg/location-pin-svg';
import '../../styles/home/homeHeader.css'

export default function HomeHeader() {
    let changeLocationPopup = () => {
        console.log('Change button clicked.')
    }

    return (
        <>
       <div className="home-header-container">
            <span>
                <LocationSVG />
                <p>Christchruch, New Zealand</p>
                <a onClick={() => { changeLocationPopup() }}><strong>Change...</strong></a>
            </span>
            <form>
                <input type="text" placeholder="Start typing..."/>
            </form>
        </div>
        <CuisineTypeCarousel />
        </>

    )
}