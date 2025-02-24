import React, { useState, useRef, useEffect, FormEvent } from "react";
import SearchbarFilters from "./SearchbarFilters";
import SearchbarDropdown from "./dropdowns/SearchbarDropdown";
import SearchbarAutocomplete from "./dropdowns/SearchbarAutocomplete";
import SearchbarFilterDropdown from "./dropdowns/SearchbarFilterDropdown";
import '../../../styles/home/searchbar.css'

export default function Searchbar({ searchParams, setSearchParams }) {
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const [categoryFilterDropdownVisible, setCategoryFilterDropdownVisible] = useState<boolean>(false);
    const [ratingFilterDropdownVisible, setRatingFilterDropdownVisible] = useState<boolean>(false);
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const [ratingInput, setRatingInput] = useState<string | null>(null);
    const [categoryInput, setCategoryInput] = useState<string | null>(null);
    const [isTypingInName, setIsTypingInName] = useState<boolean>(false);
    const [nameInput, setNameInput] = useState<string>('');

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

            // Only close autocomplete if click is outside the entire searchbar
            if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
                setIsTypingInName(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ratingFilterDropdownVisible, categoryFilterDropdownVisible, isTypingInName]);

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

    useEffect(() => {
        if (nameSpanRef.current && nameInput !== nameSpanRef.current.textContent) {
            nameSpanRef.current.textContent = nameInput;
        }
    }, [nameInput]);

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleFormSubmission}>
                <div
                    ref={searchbarRef}
                    onClick={handleSearchbarClick}
                    className="searchbar"
                >
                    
                    <SearchbarFilters 
                    searchFilters={searchFilters} 
                    searchDropdownVisible={searchDropdownVisible}
                    isTypingInName={isTypingInName}
                    ratingInput={ratingInput}
                    categoryInput={categoryInput}
                    nameSpanRef={nameSpanRef}
                    setRatingFilterDropdownVisible={setRatingFilterDropdownVisible}
                    setCategoryFilterDropdownVisible={setCategoryFilterDropdownVisible}
                    setIsTypingInName={setIsTypingInName}
                    setSearchDropdownVisible={setSearchDropdownVisible}
                    setSearchFilters={setSearchFilters}
                    setRatingInput={setRatingInput}
                    setCategoryInput={setCategoryInput}
                    setNameInput={setNameInput}
                    toggleFilter={toggleFilter}
                    searchbarRef={searchbarRef}
                    ratingInputRef={ratingInputRef}
                    categoryInputRef={categoryInputRef}
                    />

                    {isTypingInName ? (
                        <SearchbarAutocomplete nameInput={nameInput} nameSpanRef={nameSpanRef} setIsTypingInName={setIsTypingInName}  setNameInput={setNameInput} setSearchDropdownVisible={setSearchDropdownVisible}/>
                    ) : ratingFilterDropdownVisible || categoryFilterDropdownVisible ? (
                        <SearchbarFilterDropdown
                            ratingFilterDropdownVisible={ratingFilterDropdownVisible}
                            categoryFilterDropdownVisible={categoryFilterDropdownVisible}
                            ratingDropdownRef={ratingDropdownRef}
                            categoryDropdownRef={categoryDropdownRef}
                            setRatingInput={setRatingInput}
                            setCategoryInput={setCategoryInput}
                            setRatingFilterDropdownVisible={setRatingFilterDropdownVisible}
                            setCategoryFilterDropdownVisible={setCategoryFilterDropdownVisible}
                            setSearchDropdownVisible={setSearchDropdownVisible}
                        />
                    ) : searchDropdownVisible && (
                        <SearchbarDropdown
                            searchFilters={searchFilters}
                            toggleFilter={toggleFilter}
                            onClose={() => setSearchDropdownVisible(false)}
                            searchbarRef={searchbarRef}
                            onFilterRemove={(filterId) => {
                                if (filterId === 'Name') {
                                    setNameInput('');
                                    if (nameSpanRef.current) {
                                        nameSpanRef.current.textContent = '';
                                    }
                                }
                            }}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}