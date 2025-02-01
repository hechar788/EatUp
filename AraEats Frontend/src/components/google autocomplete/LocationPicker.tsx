import React, { Dispatch, SetStateAction } from "react"
import AutoCompAddress from "./AutoCompAddress"
import '../../styles/addressForm/locationPicker.css'

type Props = {
    locationPopupVisible: boolean;
    setLocationPopupVisible: Dispatch<SetStateAction<boolean>>;
    setCountry: Dispatch<SetStateAction<{
        address: string,
        vicinity: string
    }>>;
}

export default function LocationPicker(
    {locationPopupVisible, setLocationPopupVisible, setCountry}: Props
    ) {
    return (
        locationPopupVisible && (
            <div className="popUpWindow">
                <div className="address-selection-container">
                    <h1>Enter your neighbourhoods address</h1>
                    <AutoCompAddress setCountry={setCountry} />
                    <button className='close' onClick={()=>setLocationPopupVisible(false)}>Close</button>
                </div>
            </div>
        )
    )
}