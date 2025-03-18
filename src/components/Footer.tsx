
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-6">
              BridgePoint<span className="text-gold">Strategies</span>
            </h3>
            <p className="text-white/80 mb-6">
              Building bridges between communities, cultures, and continents to create a more connected and empowered world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Global Initiatives</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Domestic Impact</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Leadership</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Resources</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gold mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80">
                  1234 Renaissance Ave<br />
                  Suite 500<br />
                  Washington, DC 20001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                <span className="text-white/80">(202) 555-0123</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                <span className="text-white/80">info@bridgepointstrategies.org</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Subscribe to Our Newsletter</h4>
            <p className="text-white/80 mb-4">
              Stay updated with our latest initiatives and opportunities.
            </p>
            <form className="space-y-3">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 text-white placeholder:text-white/50"
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-gold hover:bg-gold-light text-navy font-medium rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} BridgePoint Strategies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
