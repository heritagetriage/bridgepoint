
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, Video, BookOpen, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Resources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resources = [
    {
      title: "Cross-Cultural Leadership Handbook",
      description: "A comprehensive guide for leaders working across cultural boundaries, with frameworks for effective communication and partnership.",
      type: "report",
      icon: FileText,
      link: "#"
    },
    {
      title: "Community Economic Development Toolkit",
      description: "Practical tools and templates for immigrant community leaders to assess needs, identify resources, and develop economic initiatives.",
      type: "toolkit",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Bridging Divides: Leadership Across Borders",
      description: "Our flagship video series featuring case studies of successful cross-cultural leadership and partnership models.",
      type: "video",
      icon: Video,
      link: "#"
    },
    {
      title: "Quarterly African Diaspora Economic Report",
      description: "Data-driven insights on economic trends, investment opportunities, and development initiatives connecting Africa and its diaspora.",
      type: "report",
      icon: FileText,
      link: "#"
    },
    {
      title: "Local Government Partnership Playbook",
      description: "Step-by-step guidance for community organizations seeking to establish productive partnerships with local government entities.",
      type: "toolkit",
      icon: BookOpen,
      link: "#"
    },
    {
      title: "Cultural Intelligence Workshop Materials",
      description: "Slide decks, exercises, and facilitator guides for organizations seeking to build cultural intelligence within their teams.",
      type: "toolkit",
      icon: BookOpen,
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
                Knowledge Hub
              </div>
              <h1 className="heading-lg text-primary mb-4">Resources for Impact</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Access our collection of tools, research, and educational materials designed to support cross-cultural leadership and community development.
              </p>
            </div>
            
            <motion.div 
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
                  variants={itemVariants}
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                        resource.type === 'report' ? 'bg-burgundy/10 text-burgundy' :
                        resource.type === 'toolkit' ? 'bg-navy/10 text-navy' : 'bg-accent/10 text-accent-foreground'
                      }`}>
                        <resource.icon size={24} />
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2 text-primary">{resource.title}</h3>
                    <p className="text-muted-foreground mb-6">{resource.description}</p>
                    <a 
                      href={resource.link} 
                      className="inline-flex items-center text-burgundy hover:text-burgundy-light font-medium transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resource
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-20 bg-burgundy/5 rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-3/5">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-primary">Stay Updated with Our Latest Resources</h2>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to our newsletter to receive the latest research, toolkits, and educational materials directly in your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy/30"
                    />
                    <button className="px-6 py-3 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-md transition-colors flex items-center justify-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="md:w-2/5 flex justify-center md:justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1586769852044-692d6e3703f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                    alt="Newsletter subscription"
                    className="rounded-lg w-full max-w-xs md:max-w-none"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Resources;
