
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  fallbackComponent?: React.ReactNode;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

const VideoBackground = ({ 
  videoSrc, 
  fallbackImageSrc,
  fallbackComponent,
  overlayOpacity = 0.5,
  children 
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Create a dummy video element to check if the video can be loaded
    const video = document.createElement('video');
    video.src = videoSrc;
    video.onloadeddata = () => setIsVideoLoaded(true);
    video.onerror = () => setIsVideoLoaded(false);
    
    return () => {
      video.onloadeddata = null;
      video.onerror = null;
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video background with fallback */}
      {isVideoLoaded ? (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      ) : fallbackComponent ? (
        // Use the provided fallback component (e.g., carousel)
        fallbackComponent
      ) : fallbackImageSrc ? (
        // Use a static fallback image if no component is provided
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImageSrc})` }}
        />
      ) : (
        // Fallback to a simple background if nothing else is provided
        <div className="absolute inset-0 w-full h-full bg-navy/20" />
      )}
      
      {/* Gradient overlay - only add if not using a fallback component that has its own overlay */}
      {!fallbackComponent && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/30 to-background"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      {children}
    </div>
  );
};

export default VideoBackground;
