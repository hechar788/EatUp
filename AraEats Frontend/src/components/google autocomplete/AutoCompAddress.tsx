import React, { useEffect, useRef } from "react";
import '../../styles/addressForm/autoCompAddress.css';

export default function AutoCompAddress({ setCountry }) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                initAutocomplete();
                return;
            }

            // Prevent duplicate script loading
            if (document.querySelector("script[src*='maps.googleapis.com']")) {
                return;
            }

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    initAutocomplete();
                } else {
                    console.error("Google Maps API failed to load.");
                }
            };
            document.body.appendChild(script);
        };

        const initAutocomplete = () => {
            if (!inputRef.current) return;
        
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                console.error("Google Maps API is not available yet.");
                return;
            }
        
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
                componentRestrictions: { country: "NZ" } // Restrict to New Zealand
            });
        
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                console.log("Selected Place:", place);
                setCountry({
                    address: place.formatted_address,
                    vicinity: place.vicinity
                });
            });
        };

        loadGoogleMapsScript();
    }, []);

    return (
        <>
            <input ref={inputRef} type="text" placeholder="Start typing address..." />
            <div id="target"></div>
        </>
    );
}
