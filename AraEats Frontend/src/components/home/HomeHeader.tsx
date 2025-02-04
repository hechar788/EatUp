import React, { useEffect } from 'react';
import { useSearchParams } from "react-router";
import CuisineTypeCarousel from './CuisineTypeCarousel';
import LocationSVG from '../../assets/svg/location-pin-svg';
import Searchbar from './Searchbar';
import '../../styles/home/homeHeader.css';


export default function HomeHeader({location, setLocationPopupVisible}) {
    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        category: ''
    });

    useEffect(()=>{
        console.log(searchParams)
    }, [searchParams])

    return (
        <>
       <div className="home-header-container">

            <span className="home-header-span">
                <LocationSVG />
                <p>{`${location.vicinity}, New Zealand`}</p>
                <a onClick={() => { setLocationPopupVisible(true) }}><strong>Change...</strong></a>
            </span>
            <Searchbar searchParams={searchParams} setSearchParams={setSearchParams}/>
            
        </div>
        <CuisineTypeCarousel searchParams={searchParams} setSearchParams={setSearchParams}/>
        </>

    )
}