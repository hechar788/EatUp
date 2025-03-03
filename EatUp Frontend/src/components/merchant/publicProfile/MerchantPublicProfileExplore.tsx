import React from "react";
import { Link } from "react-router";
import '../../../styles/merchants/publicProfile/merchantReels.css'

export default function MerchantPublicProfileExplore({ merchant }){
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