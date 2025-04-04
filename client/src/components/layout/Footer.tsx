import { useState } from 'react';
import { Mail, Phone, MapPin, Lock } from 'lucide-react';
import LoginModal from '@/components/admin/LoginModal';
import { useSettings } from '@/contexts/SettingsContext';

export default function Footer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { generalSettings } = useSettings();

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">{generalSettings.siteName.split(' ')[0]} <span className="text-accent">{generalSettings.siteName.split(' ')[1]}</span></h3>
            <p className="font-inter text-sm mb-4 text-white/80 dark:text-gray-300">
              {generalSettings.siteDescription.length > 100 
                ? `${generalSettings.siteDescription.substring(0, 100)}...` 
                : generalSettings.siteDescription}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-inter text-sm text-white/80 dark:text-gray-300">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#mission" className="hover:text-accent transition-colors">Mission</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#events" className="hover:text-accent transition-colors">Events</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 font-inter text-sm text-white/80 dark:text-gray-300">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-accent" />
                <a href={`mailto:${generalSettings.contactEmail}`} className="hover:text-accent transition-colors">
                  {generalSettings.contactEmail}
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-accent" />
                <a href={`tel:${generalSettings.contactPhone.replace(/[^0-9]/g, '')}`} className="hover:text-accent transition-colors">
                  {generalSettings.contactPhone}
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-accent" />
                <span>{generalSettings.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 flex justify-between items-center font-inter text-sm text-white/70 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {generalSettings.siteName}. All rights reserved.</p>
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center text-white/70 hover:text-accent transition-colors"
          >
            <Lock size={14} className="mr-1" />
            Admin Login
          </button>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </footer>
  );
}
