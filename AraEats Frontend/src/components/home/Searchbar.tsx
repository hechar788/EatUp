import React, { useEffect } from "react";
import { useSearchParams } from "react-router";

// UNFINISHED

export default function Searchbar() {
    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        exampleFilter: ''
    });

    useEffect(()=>{
        console.log(searchParams)
    }, [searchParams])

    return (
        <form>
            <input type="text" placeholder='Search Here...' onChange={e => setSearchParams(prev=>{
                prev.set('search', e.target.value);
                return prev
            }, {replace: true})}/>
        </form>
    )
}