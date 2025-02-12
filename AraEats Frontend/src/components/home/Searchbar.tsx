import React, { useState, useRef, useEffect, FormEvent } from "react";
import { searchbarOptions } from "../../lib/constants";
import { SearchbarDropdown } from "./SearchbarDropdown";

export default function Searchbar({ searchParams, setSearchParams }) {
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    const nameSpanRef = useRef<HTMLSpanElement | null>(null);
    const ratingSpanRef = useRef<HTMLSpanElement | null>(null);
    const categorySpanRef = useRef<HTMLSpanElement | null>(null);

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchParams(prev => {
            const newSearchParams = new URLSearchParams(prev);
            return newSearchParams;
        });
    }

    function toggleFilter(filterId: string) {
        setSearchFilters((prevFilters) => {
            const isRemoving = prevFilters.includes(filterId);
            const newFilters = isRemoving
                ? prevFilters.filter((item) => item !== filterId)
                : [...prevFilters, filterId];

            if (!isRemoving) {
                setSearchDropdownVisible(false);
            }

            return newFilters;
        });
    }

    function handleSpanKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
            setSearchDropdownVisible(true);
        } else if (e.key === 'Backspace') {
            const span = e.currentTarget;
            if (span.textContent?.trim() === '') {
                e.preventDefault();
                const filterDiv = span.parentElement;
                if (filterDiv) {
                    const filterText = filterDiv.textContent?.split(':')[0];
                    setSearchFilters(prevFilters => 
                        prevFilters.filter(filter => filter !== filterText)
                    );
                }
                setSearchDropdownVisible(true);
            }
        }
    }

    // Update useEffect to handle all filter types
    useEffect(() => {
        const lastAddedFilter = searchFilters[searchFilters.length - 1];
        if (!lastAddedFilter) return;

        const refs = {
            'Name': nameSpanRef,
            'Rating': ratingSpanRef,
            'Category': categorySpanRef
        };

        const refToFocus = refs[lastAddedFilter];
        if (refToFocus?.current) {
            refToFocus.current.focus();
        }
    }, [searchFilters]);

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleFormSubmission}>
                <div
                    ref={inputRef}
                    onClick={() => {
                        setSearchDropdownVisible(!searchDropdownVisible);
                    }}
                    className="searchbar"
                >
                    {searchFilters.length === 0 && !searchDropdownVisible && <p>Start typing...</p>}
                    {searchFilters.includes('Name') && (
                        <div className='searchbar-filter'>{searchbarOptions[0].id}:
                            <span
                                ref={nameSpanRef}
                                className='searchbar-filter-input'
                                contentEditable={true}
                                onKeyDown={handleSpanKeyDown}
                            ></span>
                        </div>
                    )}
                    {searchFilters.includes('Rating') && (
                        <div className='searchbar-filter'>{searchbarOptions[1].id}:
                            <span
                                ref={ratingSpanRef}
                                className='searchbar-filter-input'
                                contentEditable={true}
                                onKeyDown={handleSpanKeyDown}
                            ></span>
                        </div>
                    )}
                    {searchFilters.includes('Category') && (
                        <div className='searchbar-filter'>{searchbarOptions[2].id}:
                            <span
                                ref={categorySpanRef}
                                className='searchbar-filter-input'
                                contentEditable={true}
                                onKeyDown={handleSpanKeyDown}
                            ></span>
                        </div>
                    )}
                </div>
                {searchDropdownVisible && (
                    <SearchbarDropdown
                        searchFilters={searchFilters}
                        toggleFilter={toggleFilter}
                        dropdownRef={dropdownRef}
                        onClose={() => setSearchDropdownVisible(false)}
                    />
                )}
            </form>
        </div>
    );
}