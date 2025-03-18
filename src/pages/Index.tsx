
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Stats from '../components/Stats';
import Initiatives from '../components/Initiatives';
import Footer from '../components/Footer';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check for hash in the URL when component mounts or URL changes
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          // Handle the case of '#' (top of page)
          if (href === '#') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            return;
          }
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Cleanup event listeners
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section id="mission">
        <Mission />
      </section>
      <section id="statistics">
        <Stats />
      </section>
      <section id="initiatives">
        <Initiatives />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
