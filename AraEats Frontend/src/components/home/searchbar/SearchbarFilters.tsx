import React from "react"
import { searchbarOptions } from "../../../lib/constants";
import CloseSVG from "../../../assets/svg/close-cross-svg";
import SendSVG from "../../../assets/svg/send-svg";

export default function SearchbarFilters({ searchFilters, searchDropdownVisible, isTypingInName,
    ratingInput, categoryInput, 
    nameSpanRef, searchbarRef, ratingInputRef, categoryInputRef,
    setRatingFilterDropdownVisible, setCategoryFilterDropdownVisible, setIsTypingInName, setSearchDropdownVisible, setSearchFilters, setRatingInput, setCategoryInput, setNameInput,
    toggleFilter }) {

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

    function handleCloseClick(e: React.MouseEvent, filterId: string) {
            e.stopPropagation();
            toggleFilter(filterId);
    
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
                    setNameInput('');
                    setIsTypingInName(false);
                    break;
            }
        }

    function handleSpanKeyDown(e: React.KeyboardEvent<HTMLSpanElement>, filterType: string) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Only blur if not selecting from autocomplete
            if (!isTypingInName) {
                e.currentTarget.blur();
                setSearchDropdownVisible(true);
            }
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
                setIsTypingInName(false);
            }
        } else if (filterType === 'Name') {
            setIsTypingInName(true);
            setSearchDropdownVisible(false);
        }
    }

    function handleSpanFocus(filterType: string) {
            setSearchDropdownVisible(false);
            if (filterType === 'Name') {
                setIsTypingInName(true);
            }
        }
    
        function handleSpanBlur() {
            // Delay setting isTypingInName to false to allow for Enter key selection in autocomplete
            setTimeout(() => {
                if (!document.activeElement || !searchbarRef.current?.contains(document.activeElement)) {
                    setIsTypingInName(false);
                }
            }, 200);
        }
    
    return (
        <>
        {searchFilters.length === 0 && !searchDropdownVisible && <p className="typing-placeholder">Search Merchants...</p>}

        <div className = "searchbar-filter-container">
        {
            searchFilters.includes('Name') && (
                <div
                    className='searchbar-filter'
                    onClick={(e) => handleFilterClick(e, 'Name')}
                >
                    <p>{searchbarOptions[0].id}:</p>
                    <span
                        ref={nameSpanRef}
                        className='searchbar-filter-input name-filter-input'
                        contentEditable={true}
                        spellCheck={false}
                        onKeyDown={(e) => handleSpanKeyDown(e, 'Name')}
                        onFocus={() => handleSpanFocus('Name')}
                        onBlur={handleSpanBlur}
                        onInput={(e) => setNameInput(e.currentTarget.textContent || '')}
                    ></span>
                    <div
                        className="close-button"
                        onClick={(e) => handleCloseClick(e, 'Name')}
                    >
                        <CloseSVG />
                    </div>
                </div>
            )
        }

    {
        searchFilters.includes('Rating') && (
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
        )
    }

    {
        searchFilters.includes('Category') && (
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
        )
    }
                    </div >

        { searchFilters.length >= 1 && <SendSVG /> }
        </>
    )
}