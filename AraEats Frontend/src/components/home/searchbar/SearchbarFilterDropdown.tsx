import React, { useState, useEffect, SetStateAction } from 'react';
import { cuisineTypes } from '../../../lib/constants';

interface SearchbarFilterDropdownProps {
    ratingFilterDropdownVisible: boolean;
    ratingDropdownRef: React.RefObject<HTMLDivElement>;
    categoryDropdownRef: React.RefObject<HTMLDivElement>;
    onSelect?: (value: string) => void;
    onClose?: () => void;
    setCategoryInput: React.Dispatch<SetStateAction<string | null>>;
    setRatingInput: React.Dispatch<SetStateAction<string | null>>;
    setRatingFilterDropdownVisible: React.Dispatch<SetStateAction<boolean>>;
    setCategoryFilterDropdownVisible: React.Dispatch<SetStateAction<boolean>>;
}

export default function SearchbarFilterDropdown({
    ratingFilterDropdownVisible,
    ratingDropdownRef,
    categoryDropdownRef,
    onSelect,
    onClose,
    setCategoryInput,
    setRatingInput,
    setRatingFilterDropdownVisible,
    setCategoryFilterDropdownVisible
}: SearchbarFilterDropdownProps) {
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const ratingOptions = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
    const currentOptions = ratingFilterDropdownVisible ? ratingOptions : cuisineTypes;
    const dropdownRef = ratingFilterDropdownVisible ? ratingDropdownRef : categoryDropdownRef;

    function handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev === -1 || prev >= currentOptions.length - 1) return 0;
                    return prev + 1;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev <= 0) return currentOptions.length - 1;
                    return prev - 1;
                });
                break;
            case 'Enter':
                if (focusedIndex >= 0 && focusedIndex < currentOptions.length) {
                    e.preventDefault();
                    const selectedOption = currentOptions[focusedIndex];
                    handleOptionSelect(selectedOption);
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose?.();
                break;
        }
    }

    function handleOptionSelect(option: string) {
        if (ratingFilterDropdownVisible) {
            setRatingInput(option);
            setRatingFilterDropdownVisible(false);
        } else {
            setCategoryInput(option);
            setCategoryFilterDropdownVisible(false);
        }
        onSelect?.(option);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusedIndex, currentOptions]);

    return (
        <div className="searchbar-dropdown" ref={dropdownRef}>
            {currentOptions.map((option, index) => (
                <div
                    key={option}
                    className={`searchbar-dropdown-filter ${focusedIndex === index ? 'focused' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseLeave={() => setFocusedIndex(-1)}
                >
                    <p className="filter-dropdown-option">{option}</p>
                </div>
            ))}
        </div>
    );
}