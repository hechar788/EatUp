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
        <label key="name-input">
            <h1>Business Name</h1>
            <input
                type="text"
                onChange={e => updateProperty('name', e.target.value)}
            />
        </label>,
        <label key="address-input">
            <h1>Business Address</h1>
            <input
                type="text"
                onChange={e => updateProperty('address', e.target.value)}
            />
        </label>,
        <label key="email-input">
            <h1>Primary Business Contact</h1>
            <input
                type="email"
                onChange={e => updateProperty('email', e.target.value)}
            />
        </label>,
        <label key="dob-input">
            <h1>Date of Birth</h1>
            <input
                type="text"
            />
        </label>,
        <label key="ph-input">
            <h1>Phone Number</h1>
            <input
                type="text"
            />
        </label>
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
                    <button onClick={(e) => {
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
                        <button onClick={(e) => {
                            e.preventDefault();
                            index < formElements.length - 1
                            setIndex((prevIndex) => { return prevIndex + 1 })
                        }
                        }>Continue</button> : <button>Finish</button>
                }
            </form>
        </>
    )
}