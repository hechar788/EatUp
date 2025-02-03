import React, { useState } from "react"

type UserData = {
    businessName: string | undefined;
    address: string | undefined;
    pc_firstName: string | undefined;
    pc_lastName: string | undefined;
    pc_email: string | undefined;
    pc_phone: string | undefined;
}

export default function MerchantSignupForm() {
    let [index, setIndex] = useState(0);
    let [merchantData, setMerchantData] = useState<UserData>(
        {
            businessName: undefined, address: undefined, 
            pc_firstName: undefined, pc_lastName: undefined, pc_email: undefined, pc_phone: undefined
        }
    );

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
                onChange={e => updateProperty('address', e.target.value)}
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

    const updateProperty = (property: string, value: string) => {
        setMerchantData((prevMerchantData) => ({
            ...prevMerchantData,
            [property]: value,
        }));
    };

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
        </>
    )
}