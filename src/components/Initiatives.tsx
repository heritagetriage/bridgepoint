
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Initiatives = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
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
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-center mb-16"
            variants={titleVariants}
          >
            <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-1 rounded-full font-medium text-sm mb-6">
              Featured Initiatives
            </div>
            <h2 className="heading-lg text-primary mb-4">From Local Solutions to Global Impact</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Our strategic initiatives create meaningful connections and drive positive change in communities around the world.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="group"
                custom={index}
                variants={cardVariants}
              >
                <div className="overflow-hidden rounded-xl mb-6 h-60 lg:h-72">
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
                
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-primary">
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
          
          <motion.div 
            className="mt-16 text-center"
            variants={titleVariants}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/initiatives"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-300"
              >
                View All Initiatives
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Initiatives;
