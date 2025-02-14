import React, { useState, useRef, useEffect, FormEvent } from "react";
import { searchbarOptions } from "../../../lib/constants";
import SearchbarDropdown from "./SearchbarDropdown";
import SearchbarAutocomplete from "./SearchbarAutocomplete";
import SearchbarFilterDropdown from "./SearchbarFilterDropdown";
import '../../../styles/home/searchbar.css'

export default function Searchbar({ searchParams, setSearchParams }) {
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const [categoryFilterDropdownVisible, setCategoryFilterDropdownVisible] = useState<boolean>(false);
    const [ratingFilterDropdownVisible, setRatingFilterDropdownVisible] = useState<boolean>(false);
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
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
            if (!isRemoving) {
                setSearchDropdownVisible(false);
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
                        <div className='searchbar-filter'>{searchbarOptions[0].id}:
                            <span
                                ref={nameSpanRef}
                                className='searchbar-filter-input'
                                contentEditable={true}
                                onKeyDown={(e) => handleSpanKeyDown(e, 'Name')}
                                onFocus={() => handleSpanFocus('Name')}
                                onBlur={handleSpanBlur}
                            ></span>
                        </div>
                    )}

                    {searchFilters.includes('Rating') && (
                        <div className='searchbar-filter'>{searchbarOptions[1].id}:
                            <div
                                ref={ratingInputRef}
                                className='searchbar-filter-input'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setRatingFilterDropdownVisible(!ratingFilterDropdownVisible);
                                }}>
                            </div>
                        </div>
                    )}
                    {searchFilters.includes('Category') && (
                        <div className='searchbar-filter'>{searchbarOptions[2].id}:
                            <div
                                ref={categoryInputRef}
                                className='searchbar-filter-input'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCategoryFilterDropdownVisible(!categoryFilterDropdownVisible);
                                }}>
                            </div>
                        </div>
                    )}
                </div>

                {isTypingInName ? (
                    <SearchbarAutocomplete />
                ) : ratingFilterDropdownVisible || categoryFilterDropdownVisible ? 
                    <SearchbarFilterDropdown 
                        ratingFilterDropdownVisible={ratingFilterDropdownVisible}
                        ratingDropdownRef={ratingDropdownRef}
                        categoryDropdownRef={categoryDropdownRef}
                    />
                 :
                searchDropdownVisible ? (
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