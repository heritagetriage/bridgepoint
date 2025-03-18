
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Main Office",
      details: "1234 Renaissance Avenue, Washington, DC 20001"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (202) 555-0123"
    },
    {
      icon: Mail,
      title: "Email",
      details: "connect@bridgepointstrategies.org"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday-Friday: 9am - 5pm EST"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-1 rounded-full font-medium text-sm mb-6">
                Get in Touch
              </div>
              <h1 className="heading-lg text-primary mb-4">Connect With Us</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                We're here to answer your questions and explore potential partnerships. Reach out to start a conversation about how we can work together.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Contact Information</h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                      >
                        <div className="mr-4 mt-1">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-burgundy/10 text-burgundy">
                            <item.icon size={20} />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary mb-1">{item.title}</h3>
                          <p className="text-muted-foreground">{item.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-primary mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/10 text-navy hover:bg-navy hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-3">
                <motion.div 
                  className="bg-white rounded-xl shadow-md p-8"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Send Us a Message</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                      <textarea 
                        id="message" 
                        rows={6} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <button 
                        type="submit"
                        className="w-full px-6 py-3 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-md transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              className="mt-16 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99370.14184006042!2d-77.03657721522458!3d38.895542844123454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1655955596902!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
