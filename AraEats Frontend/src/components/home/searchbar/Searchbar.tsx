import React, { useState, useRef, useEffect, FormEvent } from "react";
import { searchbarOptions } from "../../../lib/constants";
import SearchbarDropdown from "./SearchbarDropdown";
import SearchbarAutocomplete from "./SearchbarAutocomplete";
import SearchbarFilterDropdown from "./SearchbarFilterDropdown";
import CloseSVG from "../../../assets/svg/close-cross-svg";
import '../../../styles/home/searchbar.css'

export default function Searchbar({ searchParams, setSearchParams }) {
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const [categoryFilterDropdownVisible, setCategoryFilterDropdownVisible] = useState<boolean>(false);
    const [ratingFilterDropdownVisible, setRatingFilterDropdownVisible] = useState<boolean>(false);
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [ratingInput, setRatingInput] = useState<string | null>(null);
    const [categoryInput, setCategoryInput] = useState<string | null>(null);
    const [isTypingInName, setIsTypingInName] = useState<boolean>(false);

    const searchbarRef = useRef<HTMLDivElement | null>(null);
    const nameSpanRef = useRef<HTMLSpanElement | null>(null);
    const ratingSpanRef = useRef<HTMLSpanElement | null>(null);
    const categorySpanRef = useRef<HTMLSpanElement | null>(null);
    const ratingInputRef = useRef<HTMLDivElement | null>(null);
    const categoryInputRef = useRef<HTMLDivElement | null>(null);
    const ratingDropdownRef = useRef<HTMLDivElement | null>(null);
    const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
    const prevFiltersLength = useRef(0);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ratingFilterDropdownVisible &&
                ratingInputRef.current &&
                ratingDropdownRef.current &&
                !ratingInputRef.current.contains(event.target as Node) &&
                !ratingDropdownRef.current.contains(event.target as Node)) {
                setRatingFilterDropdownVisible(false);
            }

            if (categoryFilterDropdownVisible &&
                categoryInputRef.current &&
                categoryDropdownRef.current &&
                !categoryInputRef.current.contains(event.target as Node) &&
                !categoryDropdownRef.current.contains(event.target as Node)) {
                setCategoryFilterDropdownVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ratingFilterDropdownVisible, categoryFilterDropdownVisible]);

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchParams(prev => {
            const newSearchParams = new URLSearchParams(prev);
            return newSearchParams;
        });
    }

    function handleSpanKeyDown(e: React.KeyboardEvent<HTMLSpanElement>, filterType: string) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
            setSearchDropdownVisible(true);
            setActiveFilter(null);
            setIsTypingInName(false);
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
                setActiveFilter(null);
                setIsTypingInName(false);
            }
        } else if (filterType === 'Name') {
            setIsTypingInName(true);
            setSearchDropdownVisible(false);
        }
    }

    function toggleFilter(filterId: string) {
        setSearchFilters((prevFilters) => {
            const isRemoving = prevFilters.includes(filterId);
            const newFilters = isRemoving
                ? prevFilters.filter((item) => item !== filterId)
                : [...prevFilters, filterId];

            // Show appropriate dropdown based on the selected filter
            if (!isRemoving) {
                setSearchDropdownVisible(false);

                switch (filterId) {
                    case 'Rating':
                        setRatingFilterDropdownVisible(true);
                        setCategoryFilterDropdownVisible(false);
                        break;
                    case 'Category':
                        setCategoryFilterDropdownVisible(true);
                        setRatingFilterDropdownVisible(false);
                        break;
                    case 'Name':
                        setIsTypingInName(true);
                        setRatingFilterDropdownVisible(false);
                        setCategoryFilterDropdownVisible(false);
                        break;
                }
            }
            return newFilters;
        });
    }

    function handleSpanFocus(filterType: string) {
        setActiveFilter(filterType);
        setSearchDropdownVisible(false);
        if (filterType === 'Name') {
            setIsTypingInName(true);
        }
    }

    function handleSpanBlur() {
        setTimeout(() => {
            setActiveFilter(null);
            setIsTypingInName(false);
        }, 200);
    }

    function handleSearchbarClick(e: React.MouseEvent) {
        e.stopPropagation();
        if (!isTypingInName) {
            setSearchDropdownVisible(!searchDropdownVisible);
        }
    }

    function handleCloseClick(e: React.MouseEvent, filterId: string) {
        e.stopPropagation(); // Prevent searchbar click handler from firing
        toggleFilter(filterId); // Reuse existing toggleFilter function to remove the filter
        
        // Reset the corresponding input state
        switch (filterId) {
            case 'Rating':
                setRatingInput(null);
                setRatingFilterDropdownVisible(false);
                break;
            case 'Category':
                setCategoryInput(null);
                setCategoryFilterDropdownVisible(false);
                break;
            case 'Name':
                if (nameSpanRef.current) {
                    nameSpanRef.current.textContent = '';
                }
                setIsTypingInName(false);
                break;
        }
    }

    function handleFilterClick(e: React.MouseEvent, filterType: string) {
        e.stopPropagation();
        
        // Don't handle if click was on the close button
        if ((e.target as HTMLElement).closest('.close-button')) {
            return;
        }

        switch (filterType) {
            case 'Name':
                if (nameSpanRef.current) {
                    nameSpanRef.current.focus();
                    setIsTypingInName(true);
                }
                break;
            case 'Rating':
                setRatingFilterDropdownVisible(true);
                setCategoryFilterDropdownVisible(false);
                break;
            case 'Category':
                setCategoryFilterDropdownVisible(true);
                setRatingFilterDropdownVisible(false);
                break;
        }
        setSearchDropdownVisible(false);
    }

    useEffect(() => {
        // Only focus if filters array grew larger
        const wasFilterAdded = searchFilters.length > prevFiltersLength.current;
        prevFiltersLength.current = searchFilters.length;

        if (!wasFilterAdded) return;

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
                    ref={searchbarRef}
                    onClick={handleSearchbarClick}
                    className="searchbar"
                >
                    {searchFilters.length === 0 && !searchDropdownVisible && <p>Start typing...</p>}

                    {searchFilters.includes('Name') && (
                        <div 
                            className='searchbar-filter'
                            onClick={(e) => handleFilterClick(e, 'Name')}
                        >
                            <p>{searchbarOptions[0].id}:</p>
                            <span
                                ref={nameSpanRef}
                                className='searchbar-filter-input name-filter-input'
                                contentEditable={true}
                                onKeyDown={(e) => handleSpanKeyDown(e, 'Name')}
                                onFocus={() => handleSpanFocus('Name')}
                                onBlur={handleSpanBlur}
                            ></span>
                            <div 
                                className="close-button"
                                onClick={(e) => handleCloseClick(e, 'Name')}
                            >
                                <CloseSVG />
                            </div>
                        </div>
                    )}

                    {searchFilters.includes('Rating') && (
                        <div 
                            className='searchbar-filter'
                            onClick={(e) => handleFilterClick(e, 'Rating')}
                        >
                            <p>{searchbarOptions[1].id}:</p>
                            <div
                                ref={ratingInputRef}
                                className='searchbar-filter-input'
                            >
                                <p>{ratingInput}</p>
                            </div>
                            <div 
                                className="close-button"
                                onClick={(e) => handleCloseClick(e, 'Rating')}
                            >
                                <CloseSVG />
                            </div>
                        </div>
                    )}

                    {searchFilters.includes('Category') && (
                        <div 
                            className='searchbar-filter'
                            onClick={(e) => handleFilterClick(e, 'Category')}
                        >
                            <p>{searchbarOptions[2].id}:</p>
                            <div
                                ref={categoryInputRef}
                                className='searchbar-filter-input'
                            >
                                <p>{categoryInput}</p>
                            </div>
                            <div 
                                className="close-button"
                                onClick={(e) => handleCloseClick(e, 'Category')}
                            >
                                <CloseSVG />
                            </div>
                        </div>
                    )}
                </div>

                {isTypingInName ? (
                    <SearchbarAutocomplete />
                ) : ratingFilterDropdownVisible || categoryFilterDropdownVisible ? (
                    <SearchbarFilterDropdown
                        ratingFilterDropdownVisible={ratingFilterDropdownVisible}
                        ratingDropdownRef={ratingDropdownRef}
                        categoryDropdownRef={categoryDropdownRef}
                        setRatingInput={setRatingInput}
                        setCategoryInput={setCategoryInput}
                        setRatingFilterDropdownVisible={setRatingFilterDropdownVisible}
                        setCategoryFilterDropdownVisible={setCategoryFilterDropdownVisible}
                    />
                ) : searchDropdownVisible ? (
                    <SearchbarDropdown
                        searchFilters={searchFilters}
                        toggleFilter={toggleFilter}
                        onClose={() => setSearchDropdownVisible(false)}
                        searchbarRef={searchbarRef}
                    />
                ) : null}
            </form>
        </div>
    );
}