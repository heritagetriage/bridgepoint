
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Leadership = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leaders = [
    {
      name: "Dr. Maya Robinson",
      title: "Founder & CEO",
      bio: "Dr. Robinson brings over 20 years of experience in international relations and community development. Her work has spanned across 15 African nations and numerous diaspora communities in the U.S.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1776&q=80"
    },
    {
      name: "Marcus Johnson",
      title: "Chief Strategy Officer",
      bio: "With a background in economic development and public policy, Marcus has been instrumental in forming strategic partnerships between government agencies and immigrant-led initiatives.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1776&q=80"
    },
    {
      name: "Amara Okafor, PhD",
      title: "Director of Global Initiatives",
      bio: "Dr. Okafor's research on cross-cultural leadership has informed BridgePoint's successful model for Pan-African collaboration and economic empowerment programs.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "James Washington",
      title: "Director of Domestic Programs",
      bio: "James has pioneered innovative approaches to connecting immigrant communities with local government resources, creating pathways for civic engagement and economic opportunity.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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
                Our Team
              </div>
              <h1 className="heading-lg text-primary mb-4">Visionary Leadership</h1>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Meet the dedicated experts driving our mission to create meaningful connections between communities around the world.
              </p>
            </div>
            
            <motion.div 
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {leaders.map((leader, index) => (
                <motion.div
                  key={index}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${leader.image})` }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-serif font-bold mb-1 text-primary">{leader.name}</h3>
                      <p className="text-burgundy font-medium mb-4">{leader.title}</p>
                      <p className="text-muted-foreground">{leader.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-20 bg-navy/5 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-primary">Our Leadership Philosophy</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  "At BridgePoint Strategies, we believe in the power of authentic connections. Our leadership approach centers on deep listening, cultural humility, and a commitment to creating spaces where diverse voices can contribute to shared solutions."
                </p>
                <div className="text-right italic text-primary">- Dr. Maya Robinson, Founder & CEO</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leadership;
