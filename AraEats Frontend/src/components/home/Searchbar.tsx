import React from "react";

// UNFINISHED

export default function Searchbar({ searchParams, setSearchParams }) {
    return (
        <form>
            <input 
            type="text" 
            placeholder={'Search here...'} 
            value={searchParams.get('search') || ''} 
            onChange={e => setSearchParams(prev=>{
                prev.set('search', e.target.value);
                return prev
            }, {replace: true})}
            />
        </form>
    )
}