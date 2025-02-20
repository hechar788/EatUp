import React from "react";
import BottomNav from "../components/BottomNav";

export default function Explore({ isAuthenticated }){
    return (
        <>

            <BottomNav isAuthenticated={isAuthenticated} />
        </>
    )
}