import React, { useEffect, useState, useRef } from "react"
import fakeMerchantData from '../../../lib/fakeMerchantData.json';

export default function SearchbarAutocomplete({ nameInput, setNameInput }) {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [filteredMerchants, setFilteredMerchants] = useState<typeof fakeMerchantData>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (nameInput && nameInput.length > 0) {
            // Only filter merchants if there is input
            const filtered = fakeMerchantData.filter(merchant =>
                merchant.name.toLowerCase().includes(nameInput.toLowerCase())
            );
            setFilteredMerchants(filtered);
        } else {
            // Clear filtered merchants if input is empty
            setFilteredMerchants([]);
        }
        // Reset focused index when input changes
        setFocusedIndex(-1);
    }, [nameInput]);

    useEffect(() => {
        scrollOptionIntoView(focusedIndex);
    }, [focusedIndex]);

    function scrollOptionIntoView(index: number) {
        if (dropdownRef.current && index >= 0) {
            const option = dropdownRef.current.children[index] as HTMLElement;
            if (option) {
                option.scrollIntoView({ block: 'nearest' });
            }
        }
    }

    function handleMerchantSelect(merchantName: string) {
        setNameInput(merchantName);
        // Clear the filtered merchants after selection
        setFilteredMerchants([]);
    }

    return (
        <div className='searchbar-dropdown' ref={dropdownRef}>
            {filteredMerchants.length > 0 && (
                filteredMerchants.map((merchant, index) => (
                    <div
                        key={merchant.name}
                        className={`searchbar-dropdown-filter ${index === focusedIndex ? 'focused' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onClick={() => handleMerchantSelect(merchant.name)}
                        role="option"
                        aria-selected={index === focusedIndex}
                    >
                        {merchant.name}
                    </div>
                ))
            )}
        </div>
    )
}