
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface HeroCarouselProps {
  images: string[];
  interval?: number;
  overlayOpacity?: number;
}

const HeroCarousel = ({ 
  images, 
  interval = 5000,
  overlayOpacity = 0.75 // Increased opacity for better text visibility
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    
    const timer = setInterval(() => {
      api.scrollNext();
    }, interval);

    return () => clearInterval(timer);
  }, [api, interval]);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full relative"
              >
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-8000"
                  style={{ 
                    backgroundImage: `url(${image})`,
                    transform: 'scale(1.05)'
                  }}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 z-10" />
        <CarouselNext className="absolute right-4 z-10" />
      </Carousel>
      
      {/* Gradient overlay for better text visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-background"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default HeroCarousel;
