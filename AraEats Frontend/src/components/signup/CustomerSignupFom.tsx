import React, { useState } from "react"
import '../../styles/signup/form.css'

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
        <label key="name-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('name', e.target.value)}
            />
            <div className="label-text">First Name</div>
        </label>,

        <label key="surname-input">
            <input
                type="text"
                required
                onChange={e => updateProperty('surname', e.target.value)}
            />
            <div className="label-text">Last Name</div>
        </label>,

        <label key="email-input">
            <input
                type="email"
                required
                onChange={e => updateProperty('email', e.target.value)}
            />
            <div className="label-text">Email</div>
        </label>,

        <label key="dob-input">
            <input
                type="text"
                required
            />
            <div className="label-text">Date of Birth</div>
        </label>,

        <label key="ph-input">
            <input
                type="text"
                required
            />
            <div className="label-text">Phone Number</div>
        </label>
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