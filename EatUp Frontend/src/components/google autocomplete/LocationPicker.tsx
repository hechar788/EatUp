import React, { Dispatch, SetStateAction } from "react"
import AutoCompAddress from "./AutoCompAddress"
import { Location } from "../../lib/types";
import '../../styles/addressForm/locationPicker.css'
import '../../styles/addressForm/autoCompAddress.css';


type Props = {
    setLocationPopupVisible: Dispatch<SetStateAction<boolean>>;
    setLocation: Dispatch<SetStateAction<Location>>;
}

export default function LocationPicker(
    { setLocationPopupVisible, setLocation }: Props
) {
    return (

        <div className="popUpWindow" onClick={() => setLocationPopupVisible(false)}>
            <div className="address-selection-container" onClick={(e) => { e.stopPropagation() }}>
                <h1>Enter your neighbourhood address</h1>
                <AutoCompAddress setCountry={setLocation} />
                <button className='close' onClick={() => setLocationPopupVisible(false)}>Close</button>
            </div>
        </div>

    )
}