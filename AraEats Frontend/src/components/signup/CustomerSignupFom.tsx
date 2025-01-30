import React, { useState } from "react"

type UserData = {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    dob: string | undefined;
    phone: string | undefined;
}

export default function CustomerSignupForm() {
    let [index, setIndex] = useState(0);
    let [userData, setUserData] = useState<UserData>({ name: undefined, surname: undefined, email: undefined, dob: undefined, phone: undefined });
    let formElements = [
        <>
        <div className="form-header-wrapper">
        <h1>Kia ora anō,</h1>
        <h1>Fill in some details to continue.</h1>
        </div>
        <label key="name-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('name', e.target.value)}
            />
            <div className="label-text">First Name</div>
        </label>

        <label key="surname-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('surname', e.target.value)}
            />
            <div className="label-text">Last Name</div>
        </label>

        <label key="email-input">
            <input
                type="email"
                required
                onChange={e => updateProperty('email', e.target.value)}
            />
            <div className="label-text">Email</div>
        </label>

        <label key="dob-input">
            <input
                type="text"
                required
            />
            <div className="label-text">Date of Birth</div>
        </label>
        </>,
        <>
        <div className="form-header-wrapper">
        <h1 className="second-index-form-element-header">Ka Pai,</h1>
        <h1>Now verify your mobile number.</h1>
        </div>
        <label key="ph-input">
            <input
                type="text"
                required
            />
            <div className="label-text phone-number">Phone Number</div>
        </label>
        </>
    ]

    const updateProperty = (property: string, value: string) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
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
                        }>Continue</button> : <button className="continue-button">Finish</button>
                }
            </form>
        </>
    )
}