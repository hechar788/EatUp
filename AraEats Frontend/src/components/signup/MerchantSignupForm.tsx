import React, { useState } from "react"
import LocationPicker from "../google autocomplete/LocationPicker";

type Location = {
    address: string | undefined,
    vicinity: string | undefined
}

type MerchantSignupData = {
    businessName: string | undefined;
    address: string | undefined;
    pc_firstName: string | undefined;
    pc_lastName: string | undefined;
    pc_email: string | undefined;
    pc_phone: string | undefined;
}

export default function MerchantSignupForm() {
    const [index, setIndex] = useState(0);
    const [location, setLocation] = useState<Location>();
    const [locationPopupVisible, setLocationPopupVisible] = useState<boolean>(false);
    const [merchantData, setMerchantData] = useState<MerchantSignupData>(
        {
            businessName: undefined, address: undefined, 
            pc_firstName: undefined, pc_lastName: undefined, pc_email: undefined, pc_phone: undefined
        }
    );

    const updateProperty = (property: string, value: string) => {
        setMerchantData((prevMerchantData) => ({
            ...prevMerchantData,
            [property]: value,
        }));
    };

    const formElements = [
        <>
        <div className="form-header-wrapper">
        <h1 className="merchant-signup-header">Kia ora anō,</h1>
        <h1 className="merchant-signup-header">Fill in some business details to continue.</h1>
        </div>
        <label key="name-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('businessName', e.target.value)}
            />
            <div className="label-text">Business Name</div>
        </label>
        <label key="address-input">
            <input
                type="text"
                required
                value={location?.address}
                onClick={e => setLocationPopupVisible(true)}
            />
            <div className="label-text">Business Address</div>
        </label>
        </>,
        <>
        <h1 className="merchant-signup-header">Ka Pai,</h1>
        <h1 className="merchant-signup-header-second">Now fill in your Primary Contacts details.</h1>
        <label key="pc-name-input">
            <input
                type="email"
                required
                onChange={e => updateProperty('pc_firstName', e.target.value)}
            />
            <div className="label-text">First Name</div>
        </label>
        <label key="pc-surname-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('pc_lastName', e.target.value)}
            />
            <div className="label-text">Surname</div>
        </label>
        <label key="pc-email-input">
            <input
                type="email"
                required
                onChange={e => updateProperty('pc_email', e.target.value)}
            />
            <div className="label-text">Email</div>
        </label>
        <label key="ph-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('pc_phone', e.target.value)}
            />
            <div className="label-text">Phone Number</div>
        </label>
        </>
    ]

    return (
        <>
            <form>
                {
                    index > 0 &&
                    <button className='go-back-button' onClick={(e) => {
                        e.preventDefault();
                        setIndex((prevIndex) => { return prevIndex - 1 })
                    }
                    }>Go Back</button>
                }

                {
                    formElements[index]
                }

                {
                    index < formElements.length - 1 ?
                        <button className="continue-button" onClick={(e) => {
                            e.preventDefault();
                            index < formElements.length - 1
                            setIndex((prevIndex) => { return prevIndex + 1 })
                        }
                        }>Continue</button> : <button className="continue-button merchant-finish-button">Finish</button>
                }
            </form>

            {
                    locationPopupVisible && <LocationPicker setLocation={setLocation} setLocationPopupVisible={setLocationPopupVisible}/>
            }
        </>
    )
}