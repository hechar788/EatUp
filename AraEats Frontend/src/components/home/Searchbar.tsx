import React, { useState, useRef } from "react";

export default function Searchbar({ searchParams, setSearchParams }) {
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            inputRef.current &&
            dropdownRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setSearchDropdownVisible(false);
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside this container from bubbling */}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={'Search here...'}
                    value={searchParams.get('search') || ''}
                    onFocus={() => {
                        setSearchDropdownVisible(true);
                        document.addEventListener("mousedown", handleDocumentClick); // Add listener on focus
                    }}
                    onBlur={() => {
                        document.removeEventListener("mousedown", handleDocumentClick); // Remove listener on blur
                    }}
                />
                {searchDropdownVisible && (
                    <div ref={dropdownRef} className="searchbar-dropdown">
                        {/* Dropdown content goes here */}
                        <button onClick={() => setSearchDropdownVisible(false)}>Option 1</button>
                        <button onClick={() => setSearchDropdownVisible(false)}>Option 2</button>
                    </div>
                )}
            </form>
        </div>
    );
}