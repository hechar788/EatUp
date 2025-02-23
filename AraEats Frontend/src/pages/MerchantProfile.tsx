import React, { useState } from "react";
import { useParams } from "react-router";
import fakeMerchantData from "../lib/fakeMerchantData.json";
import MerchantProfileHeader from "../components/merchant/MerchantProfileHeader";
import '../styles/merchants/publicProfile/merchantProfile.css';

export default function MerchantProfile() {
    const [merchantMenuView, setMerchantMenuView] = useState<boolean>(true);

    const { id } = useParams();
    const merchant = fakeMerchantData.find(x => x.id === id);

    
    if (!merchant) {
        return <div>Merchant not found</div>;
    }

    return (
        <>
        <MerchantProfileHeader merchant={merchant} merchantMenuView={merchantMenuView} setMerchantMenuView={setMerchantMenuView} />
        <p>{merchantMenuView ? 'Menu' : 'Reels'}</p>
        </>
    );
}