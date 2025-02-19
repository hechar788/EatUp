import React from "react";
import BottomNav from "../components/BottomNav";

export default function ExplorePage({ isAuthenticated }){
    return (
        <>

            <BottomNav isAuthenticated={isAuthenticated} />
        </>
    )
}