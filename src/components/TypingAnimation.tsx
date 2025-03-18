
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
}

const TypingAnimation = ({ 
  phrases, 
  typingSpeed = 50, 
  delayBetweenPhrases = 2000,
  className = ""
}: TypingAnimationProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShowingCursor, setIsShowingCursor] = useState(true);
  
  // Reference to track if component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    // Set isMounted ref to false when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    // If no phrases, return early
    if (!phrases.length) return;

    let timeout: number;
    
    // Calculate typing speed - make deletion slightly faster
    const speed = isDeleting ? typingSpeed * 0.7 : typingSpeed;
    
    if (!isDeleting && currentText.length < currentPhrase.length) {
      // Still typing current phrase
      timeout = window.setTimeout(() => {
        if (isMounted.current) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }
      }, speed);
    } else if (!isDeleting && currentText.length === currentPhrase.length) {
      // Finished typing, delay before deleting
      timeout = window.setTimeout(() => {
        if (isMounted.current) {
          setIsDeleting(true);
        }
      }, delayBetweenPhrases);
    } else if (isDeleting && currentText.length > 0) {
      // Deleting
      timeout = window.setTimeout(() => {
        if (isMounted.current) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }
      }, speed);
    } else if (isDeleting && currentText.length === 0) {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, delayBetweenPhrases]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isMounted.current) {
        setIsShowingCursor((prev) => !prev);
      }
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`inline-flex ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentText}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {currentText}
          </motion.span>
        </AnimatePresence>
        <span className={`typing-cursor ml-1 ${isShowingCursor ? 'opacity-100' : 'opacity-0'}`}></span>
      </motion.span>
    </div>
  );
};

export default TypingAnimation;
