import { useSearchParams } from "react-router";

// UNFINISHED

export default function Searchbar (){
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search')
    const category = searchParams.get('search')  
    const maxPrice = searchParams.get('search')
}