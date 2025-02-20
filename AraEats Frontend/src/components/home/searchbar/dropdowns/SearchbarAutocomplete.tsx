import React, { useRef } from "react"
import { useKeyboardNavigation } from '../../../../hooks/useKeyboardNavigation';
import fakeMerchantData from '../../../../lib/fakeMerchantData.json';

interface SearchbarAutocompleteProps {
    nameInput: string;
    setNameInput: (value: string) => void;
    nameSpanRef: React.RefObject<HTMLSpanElement>;
    setIsTypingInName: (value: boolean) => void;
    setSearchDropdownVisible: (value: boolean) => void;
}

export default function SearchbarAutocomplete({ 
    nameInput, 
    setNameInput, 
    nameSpanRef,
    setIsTypingInName,
    setSearchDropdownVisible
}: SearchbarAutocompleteProps) {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const filteredMerchants = nameInput && nameInput.length > 0
        ? fakeMerchantData.filter(merchant =>
            merchant.name.toLowerCase().includes(nameInput.toLowerCase())
        )
        : [];

    function handleMerchantSelect(merchant: typeof fakeMerchantData[0]) {
        console.log('Updating name to:', merchant.name);
        setNameInput(merchant.name);
        // Blur the contentEditable span
        if (nameSpanRef.current) {
            nameSpanRef.current.blur();
        }
        // Set typing state to false to close the autocomplete dropdown
        setIsTypingInName(false);
        // Show the main searchbar dropdown
        setSearchDropdownVisible(true);
    }

    const { focusedIndex, setFocusedIndex } = useKeyboardNavigation({
        items: filteredMerchants,
        onSelect: handleMerchantSelect,
        dropdownRef,
        isVisible: filteredMerchants.length > 0
    });

    return (
        <div className='searchbar-dropdown' ref={dropdownRef}>
            {filteredMerchants.length > 0 ? (
                filteredMerchants.map((merchant, index) => (
                    <div
                        key={merchant.name}
                        className={`searchbar-dropdown-filter ${index === focusedIndex ? 'focused' : ''}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                        onMouseLeave={() => setFocusedIndex(-1)}
                        onClick={() => handleMerchantSelect(merchant)}
                        role="option"
                        aria-selected={index === focusedIndex}
                    >
                        <p>{merchant.name}</p>
                    </div>
                ))
            ) : <div className="searchbar-dropdown-filter"><p>Start Typing...</p></div>}
        </div>
    );
}