import React, { useRef } from 'react';
import { searchbarOptions } from "../../../../lib/constants";
import { useKeyboardNavigation } from '../../../../hooks/useKeyboardNavigation';

interface SearchbarDropdownProps {
    searchFilters: string[];
    toggleFilter: (filterId: string) => void;
    onClose: () => void;
    searchbarRef: React.RefObject<HTMLDivElement>;
    onFilterRemove?: (filterId: string) => void;
}

export default function SearchbarDropdown({
    searchFilters,
    toggleFilter,
    onClose,
    searchbarRef,
    onFilterRemove
}: SearchbarDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    function handleFilterClick(option: typeof searchbarOptions[0]) {
        if (searchFilters.includes(option.id) && onFilterRemove) {
            onFilterRemove(option.id);
        }
        toggleFilter(option.id);
    }

    const { focusedIndex, setFocusedIndex, isActive } = useKeyboardNavigation({
        items: searchbarOptions,
        onSelect: handleFilterClick,
        onClose,
        dropdownRef,
        parentRef: searchbarRef,
        isVisible: true,
        activeItems: searchFilters,
        getItemId: (item) => item.id
    });

    return (
        <div className='searchbar-dropdown' ref={dropdownRef}>
            {searchbarOptions.map((option, index) => (
                <div
                    key={option.id}
                    className={`searchbar-dropdown-filter 
                        ${isActive(option) ? 'active' : ''}
                        ${focusedIndex === index ? 'focused' : ''}
                    `}
                    onClick={() => handleFilterClick(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseLeave={() => setFocusedIndex(-1)}
                >
                    <p>{option.label}</p>
                </div>
            ))}
            {searchFilters.length >= 1 && (
                <div className="searchbar-dropdown-submit-container">
                    <button className="searchbar-dropdown-submit">Search All</button>
                </div>
            )}
        </div>
    );
}