// SearchbarDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { searchbarOptions } from "../../../lib/constants";

interface SearchbarDropdownProps {
    searchFilters: string[];
    toggleFilter: (filterId: string) => void;
    onClose: () => void;
    searchbarRef: React.RefObject<HTMLDivElement>;
}

export default function SearchbarDropdown({ searchFilters, toggleFilter, onClose, searchbarRef }: SearchbarDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    useEffect(() => {
        if (searchFilters.length === 0) {
            setFocusedIndex(0);
        }
    }, [searchFilters]);

    function handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev === -1 || prev >= searchbarOptions.length - 1) return 0;
                    return prev + 1;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev <= 0) return searchbarOptions.length - 1;
                    return prev - 1;
                });
                break;
            case 'Enter':
                if (focusedIndex >= 0 && focusedIndex < searchbarOptions.length) {
                    e.preventDefault();
                    toggleFilter(searchbarOptions[focusedIndex].id);
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
        }
    }

    function handleDropdownClosure(e: MouseEvent) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node) &&
            !searchbarRef.current?.contains(e.target as Node)
        ) {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleDropdownClosure);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleDropdownClosure);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusedIndex]);

    return (
        <div className='searchbar-dropdown' ref={dropdownRef}>
            {searchbarOptions.map((option, index) => (
                <div
                    key={option.id}
                    className={`searchbar-dropdown-filter 
                            ${searchFilters.includes(option.id) ? 'active' : ''}
                            ${focusedIndex === index ? 'focused' : ''}
                        `}
                    onClick={() => toggleFilter(option.id)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseLeave={() => setFocusedIndex(-1)}
                >
                    <p>{option.label}</p>
                </div>
            ))}
            {searchFilters.length >= 1 && (
                <div className="searchbar-dropdown-submit-container">
                    <button className="searchbar-dropdown-submit">Search</button>
                </div>
            )}
        </div>
    );
}