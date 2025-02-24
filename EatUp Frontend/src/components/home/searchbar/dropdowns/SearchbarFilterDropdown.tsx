import React from 'react';
import { useKeyboardNavigation } from '../../../../hooks/useKeyboardNavigation';
import { cuisineTypes } from '../../../../lib/constants';

interface SearchbarFilterDropdownProps {
    ratingFilterDropdownVisible: boolean;
    categoryFilterDropdownVisible: boolean;
    ratingDropdownRef: React.RefObject<HTMLDivElement>;
    categoryDropdownRef: React.RefObject<HTMLDivElement>;
    onSelect?: (value: string) => void;
    onClose?: () => void;
    setCategoryInput: React.Dispatch<React.SetStateAction<string | null>>;
    setRatingInput: React.Dispatch<React.SetStateAction<string | null>>;
    setRatingFilterDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCategoryFilterDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchbarFilterDropdown({
    ratingFilterDropdownVisible,
    categoryFilterDropdownVisible,
    ratingDropdownRef,
    categoryDropdownRef,
    onSelect,
    onClose,
    setCategoryInput,
    setRatingInput,
    setRatingFilterDropdownVisible,
    setCategoryFilterDropdownVisible,
    setSearchDropdownVisible
}: SearchbarFilterDropdownProps) {
    const ratingOptions = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
    const currentOptions = ratingFilterDropdownVisible ? ratingOptions : cuisineTypes;
    const dropdownRef = ratingFilterDropdownVisible ? ratingDropdownRef : categoryDropdownRef;
    const isVisible = ratingFilterDropdownVisible || categoryFilterDropdownVisible;

    function handleOptionSelect(option: string) {
        if (ratingFilterDropdownVisible) {
            setRatingInput(option);
            setRatingFilterDropdownVisible(false);
        } else {
            setCategoryInput(option);
            setCategoryFilterDropdownVisible(false);
        }
        onSelect?.(option);
        // Add slight delay to ensure the filter dropdown closes first
        setTimeout(() => {
            setSearchDropdownVisible(true);
        }, 0);
    }

    const { 
        focusedIndex, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useKeyboardNavigation({
        items: currentOptions,
        onSelect: handleOptionSelect,
        onClose: () => {
            setRatingFilterDropdownVisible(false);
            setCategoryFilterDropdownVisible(false);
            onClose?.();
        },
        dropdownRef,
        isVisible
    });

    if (!isVisible) return null;

    return (
        <div className="searchbar-dropdown" ref={dropdownRef}>
            {currentOptions.map((option, index) => (
                <div
                    key={option}
                    className={`searchbar-dropdown-filter ${focusedIndex === index ? 'focused' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    >
                    <p className="filter-dropdown-option">{option}</p>
                </div>
            ))}
        </div>
    );
}