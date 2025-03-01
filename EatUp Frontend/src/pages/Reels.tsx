import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import ReelSlider from "../components/reels/ReelSlider";

import fakeMerchantData from "../lib/fakeMerchantData.json";



export default function Reels(){
    const { merchantid, postid } = useParams();
    const [merchant, setMerchant] = useState<any>(null);

    useEffect(() => {
        const matchedMerchant = fakeMerchantData.find((merchant) => merchant.id === merchantid);
        
        if (matchedMerchant) {
            setMerchant(matchedMerchant);
        }
    }, [merchantid]);

    return (
        <div className="reels-page-wrapper">
            <ReelSlider merchant={merchant} postid={postid ? parseInt(postid) : 0} />
        </div>
    )
}