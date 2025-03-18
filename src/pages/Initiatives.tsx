import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Initiatives = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: i * 0.2
      }
    })
  };
  
  // Initiative data - same as in the component to maintain consistency
  const initiatives = [
    {
      id: "pan-african-leadership-summit",
      title: "Pan-African Leadership Summit",
      description: "Connecting Black leaders from the Americas, Europe, and Africa for strategic partnerships and collaborative initiatives.",
      image: "https://images.unsplash.com/photo-1581974206967-93856b25aa13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1781&q=80",
      type: "global"
    },
    {
      id: "community-business-incubator",
      title: "Community Business Incubator",
      description: "Supporting immigrant entrepreneurs with resources, mentorship, and connections to thrive in their new communities.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      type: "domestic"
    },
    {
      id: "cross-cultural-education-exchange",
      title: "Cross-Cultural Education Exchange",
      description: "Facilitating knowledge sharing between educational institutions across continents to enrich learning experiences.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      type: "global"
    },
    {
      id: "local-government-partnership-program",
      title: "Local Government Partnership Program",
      description: "Creating direct channels between immigrant communities and local officials to address specific needs and opportunities.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      type: "domestic"
    },
    {
      id: "diaspora-investment-network",
      title: "Diaspora Investment Network",
      description: "Connecting diaspora investors with high-impact projects in their countries of origin to drive sustainable development.",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1634&q=80",
      type: "global"
    },
    {
      id: "youth-leadership-academy",
      title: "Youth Leadership Academy",
      description: "Empowering the next generation of immigrant and diaspora youth with leadership skills and cultural confidence.",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      type: "domestic"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="text-center mb-16"
              variants={titleVariants}
            >
              <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-1 rounded-full font-medium text-sm mb-6">
                Our Initiatives
              </div>
              <h1 className="heading-lg text-primary mb-4">Building Bridges Across Communities</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Explore our comprehensive range of initiatives designed to create meaningful connections and drive positive change locally and globally.
              </p>
            </motion.div>
            
            {/* Filter tabs */}
            <motion.div 
              className="flex justify-center mb-12"
              variants={titleVariants}
            >
              <div className="inline-flex bg-muted rounded-lg p-1">
                <button className="px-4 py-2 rounded-md bg-white shadow-sm font-medium text-sm">
                  All Initiatives
                </button>
                <button className="px-4 py-2 rounded-md font-medium text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Global
                </button>
                <button className="px-4 py-2 rounded-md font-medium text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Domestic
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={index}
                  className="group"
                  custom={index}
                  variants={cardVariants}
                >
                  <div className="overflow-hidden rounded-xl mb-6 h-60">
                    <motion.div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${initiative.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  <div className="flex items-start mb-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      initiative.type === 'global' 
                        ? 'bg-navy/10 text-navy' 
                        : 'bg-burgundy/10 text-burgundy'
                    }`}>
                      {initiative.type === 'global' ? 'Global Initiative' : 'Domestic Initiative'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-2 text-primary">
                    {initiative.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {initiative.description}
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={`/initiative/${initiative.id}`}
                      className="inline-flex items-center font-medium text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Initiatives;