import React from "react";

export default function Searchbar({ searchParams, setSearchParams }) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input 
                type="text" 
                placeholder={'Search here...'} 
                value={searchParams.get('search') || ''} 
                onChange={e => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    
                    if (e.target.value) {
                        newSearchParams.set('search', e.target.value);
                    } else {
                        newSearchParams.delete('search');
                    }
                    
                    setSearchParams(newSearchParams, { 
                        replace: searchParams.get('search') !== null 
                    });
                }}
            />
        </form>
    )
}