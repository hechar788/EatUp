import React from "react";

export default function ReelCard({ reel }) {
  return (
    <div className="reel-card" id={`reel-${reel.id}`}>
      <video 
        src={`/src/assets/merchantVideos/${reel.fileName}`}
        loop
        autoPlay
        playsInline
      />
    </div>
  );
}