import React from "react"
export default function SearchbarFilterDropdown({ ratingFilterDropdownVisible, ratingDropdownRef, categoryDropdownRef }) {
    return (
        <>
            {
                ratingFilterDropdownVisible ?
                    <div className="searchbar-dropdown" ref={ratingDropdownRef}>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>

                    </div>
                    :
                    <div className="searchbar-dropdown" ref={categoryDropdownRef}>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>
                        <div className="searchbar-dropdown-filter"></div>
                    </div>
            }
        </>
    )
}