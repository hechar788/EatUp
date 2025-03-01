import React, { useEffect, useRef } from "react";
import ReelCard from "./ReelCard";
import '../../styles/reels/reels.css';

export default function ReelSlider({ merchant, postid }) {
  const sliderRef = useRef<any>(null);
  const reels = merchant?.reels || [];
  
  // Handle scroll and initial setup
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const videos = slider.querySelectorAll('video');
    
    // Function to play the most visible video
    const playVisibleVideo = () => {
      let bestVisibleVideo;
      let bestVisibility = 0;
      
      videos.forEach(video => {
        const rect = video.getBoundingClientRect();
        const visibility = Math.min(
          rect.bottom, window.innerHeight) - 
          Math.max(rect.top, 0);
        
        if (visibility > bestVisibility) {
          bestVisibility = visibility;
          bestVisibleVideo = video;
        }
        
        // Pause all videos initially
        video.pause();
      });
      
      // Play the most visible video
      if (bestVisibleVideo) {
        bestVisibleVideo.play().catch(e => {});
      }
    };
    
    // Scroll to postid when component mounts
    if (reels.length > 0 && postid) {
      const reelIndex = reels.findIndex(reel => reel.id === parseInt(postid));
      
      if (reelIndex !== -1) {
        const scrollPosition = reelIndex * slider.clientHeight;
        slider.scrollTop = scrollPosition;
      }
    }
    
    // Initial play
    setTimeout(playVisibleVideo, 100);
    
    // Add scroll event listener
    slider.addEventListener('scroll', playVisibleVideo);
    
    return () => {
      slider.removeEventListener('scroll', playVisibleVideo);
    };
  }, [postid, reels]);

  return (
    <div className="reels-slider" ref={sliderRef}>
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
}