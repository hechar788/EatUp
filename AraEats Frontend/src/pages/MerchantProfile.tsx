import React from "react";
import { useParams } from "react-router";
import BottomNav from "../components/BottomNav";

export default function MerchantProfile({ isAuthenticated }) {
    const { id } = useParams();
    return (
        <>
        <div>
            <h1>Merchant Details</h1>
            <p>Viewing merchant with ID: {id}</p>
        </div>
        <BottomNav isAuthenticated={isAuthenticated} />
        </>
    );
}