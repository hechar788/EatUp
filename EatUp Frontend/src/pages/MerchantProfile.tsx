import React, { useEffect } from "react";
import { useParams } from "react-router";
import fakeMerchantData from "../lib/fakeMerchantData.json";

import MerchantProfileHeader from "../components/merchant/public profile/MerchantProfileHeader";
import MerchantProfileExplore from "../components/merchant/public profile/MerchantProfileExplore";
import MerchantProfileMenu from "../components/merchant/public profile/MerchantProfileMenu";

import '../styles/merchants/publicProfile/merchantProfile.css';

export default function MerchantProfile() {

    const { id, page } = useParams();
    const merchant = fakeMerchantData.find(x => x.id === id);

    if (!merchant) {
        return <div>Merchant not found</div>;
    }

    useEffect(()=>{
        console.log(page)
    }, [page])

    return (
        <>

        <MerchantProfileHeader merchant={merchant} page={page} />

        {
            page == 'menu' && <MerchantProfileMenu merchant={merchant}/>
        }

        {
            page == 'reels' && <MerchantProfileExplore merchant={merchant}/>
        }

        </>
    );
}