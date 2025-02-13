import React, { useEffect, useState, useRef } from "react"

export default function SearchbarAutocomplete() {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
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

    return (
        <div className='searchbar-dropdown' ref={dropdownRef}>
            <div className="searchbar-dropdown-filter"></div>
        </div>
    )
}