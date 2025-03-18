
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import HeroCarousel from './HeroCarousel';
import TypingAnimation from './TypingAnimation';

const Hero = () => {
  const typingPhrases = [
    "Leaders and Communities",
    "Nations and Cultures", 
    "Vision and Action", 
    "Today and Tomorrow"
  ];
  
  // Use InVideo URL as the main video source
  const videoUrl = "https://ai.invideo.io/watch/R2iHxU9Dcnl";
  
  // Multiple carousel images for fallback
  const fallbackImages = [
    "https://images.unsplash.com/photo-1559025761-0bf42e5f1759?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d4d3cce4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1560523159-4a9692d222f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
  ];

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <VideoBackground 
        videoSrc={videoUrl} 
        fallbackComponent={<HeroCarousel images={fallbackImages} overlayOpacity={0.75} />}
        overlayOpacity={0.7}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.2
            }}
          >
            <h2 className="text-white font-serif text-xl md:text-2xl mb-2 text-shadow-lg">
              Building Bridges Between...
            </h2>
            <div className="min-h-16 flex justify-center">
              <TypingAnimation 
                phrases={typingPhrases} 
                className="text-white font-serif text-2xl md:text-4xl font-medium text-shadow-lg" 
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-white font-serif text-3xl md:text-5xl leading-tight font-bold mb-8 text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.4
            }}
          >
            At BridgePoint Strategies, our mission is to foster global and domestic connections that empower communities.
          </motion.h1>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.6
            }}
          >
            <motion.a 
              href="#initiatives" 
              className="px-8 py-3 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Global Initiatives
            </motion.a>
            <motion.a 
              href="#initiatives" 
              className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Discover Domestic Impact
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.a 
          href="#mission"
          className="flex flex-col items-center cursor-pointer"
        >
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-2 bg-white/80 rounded-full"></div>
          </motion.div>
          <span className="text-white/80 text-xs mt-2">Scroll Down</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
