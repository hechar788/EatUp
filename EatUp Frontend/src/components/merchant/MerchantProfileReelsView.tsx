import React from "react";

export default function MerchantProfileReelsView({ merchant }){
    return (
        <div className="merchant-profile-reels-container">
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            <video src={`/src/assets/merchantVideos/${merchant.reels[0]}`} controls loop autoPlay/>
            </div>
    )
}