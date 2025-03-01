import React from "react";
import { Link } from "react-router";

export default function MerchantProfileExplore({ merchant }){
    return (
        <div className="merchant-profile-reels-container">
            {
                merchant.reels.map((reel)=>{
                    return (
                    <Link to={`/reels/${merchant.id}/${reel.id}`}>
                        <video src={`/src/assets/merchantVideos/${reel.fileName}`} loop />
                    </Link>
                    )
                })
            }
        </div>
    )
}