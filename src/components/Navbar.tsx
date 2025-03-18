import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSection(location.hash.replace('#', '') || 'home');
    } else {
      const currentPath = location.pathname.replace(/\//g, '');
      setActiveSection(currentPath || 'home');
    }
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop - 100;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.getAttribute('id') || 'home');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/', section: 'home', isMainPage: true },
    { name: 'Mission', href: '/#mission', section: 'mission', isMainPage: true },
    { name: 'Statistics', href: '/#statistics', section: 'statistics', isMainPage: true },
    { name: 'Initiatives', href: '/#initiatives', section: 'initiatives', isMainPage: true },
    { name: 'Leadership', href: '/leadership', section: 'leadership', isMainPage: false },
    { name: 'Resources', href: '/resources', section: 'resources', isMainPage: false },
    { name: 'Contact', href: '/contact', section: 'contact', isMainPage: false },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3 
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleLinkClick = (section: string, isMainPage: boolean) => {
    setIsMobileMenuOpen(false);
    
    if (isMainPage && location.pathname === '/') {
      setActiveSection(section);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex-shrink-0" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center">
              <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
                BridgePoint
                <span className={isScrolled ? 'text-secondary' : 'text-gold'}>Strategies</span>
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.div key={link.name} custom={index} variants={linkVariants}>
                <Link
                  to={link.href}
                  className={`nav-link py-2 ${activeSection === link.section ? 'text-accent font-medium after:w-full' : `${location.pathname !== '/' || isScrolled ? 'text-foreground/80' : 'text-white/90'}`}`}
                  onClick={() => handleLinkClick(link.section, link.isMainPage)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isScrolled ? 'text-primary' : 'text-white'} focus:outline-none`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto z-50 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-10">
                <Link to="/" className="font-serif text-xl font-bold text-primary">
                  BridgePoint<span className="text-secondary">Strategies</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={mobileLinkVariants}>
                    <Link
                      to={link.href}
                      className={`text-lg font-medium hover:text-secondary transition-colors ${activeSection === link.section ? 'text-secondary' : 'text-primary'}`}
                      onClick={() => handleLinkClick(link.section, link.isMainPage)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
