
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Globe, Users, Briefcase, Building, Heart, Target, Award } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Mission = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const location = useLocation();
  
  // State for mission stats counters
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [forceAnimate, setForceAnimate] = useState(false);
  
  const finalCount1 = 15; // Years of experience
  const finalCount2 = 120; // Partnerships formed
  const finalCount3 = 35; // Success stories
  
  const duration = 2500; // 2.5 seconds for counting animation to make it more noticeable
  
  // Check if we're directly navigating to the mission section
  useEffect(() => {
    if (location.hash === '#mission') {
      setForceAnimate(true);
      controls.start('visible');
    }
  }, [location.hash, controls]);

  useEffect(() => {
    if (isInView || forceAnimate) {
      controls.start('visible');
      
      let startTime: number | null = null;
      
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        
        setCount1(Math.floor(progress * finalCount1));
        setCount2(Math.floor(progress * finalCount2));
        setCount3(Math.floor(progress * finalCount3));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount1(finalCount1);
          setCount2(finalCount2);
          setCount3(finalCount3);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [controls, isInView, forceAnimate, duration, finalCount1, finalCount2, finalCount3]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  // Mission pillars with icons
  const missionPillars = [
    {
      icon: <Globe className="w-10 h-10 text-burgundy" />,
      title: "Global Connections",
      description: "Building bridges between Afro/Black leaders and their African counterparts to foster international collaboration and knowledge exchange."
    },
    {
      icon: <Users className="w-10 h-10 text-navy" />,
      title: "Community Empowerment",
      description: "Facilitating domestic collaborations with government officials, businesses, and immigrant communities to create opportunities."
    },
    {
      icon: <Target className="w-10 h-10 text-burgundy" />,
      title: "Strategic Initiatives",
      description: "Developing targeted programs that address specific needs and create sustainable pathways for economic and social development."
    }
  ];
  
  // Mission stats with icons
  const missionStats = [
    {
      icon: <Award className="w-8 h-8 text-burgundy" />,
      count: count1,
      label: "Years of Experience"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-navy" />,
      count: count2,
      label: "Partnerships Formed"
    },
    {
      icon: <Heart className="w-8 h-8 text-burgundy" />,
      count: count3,
      label: "Success Stories"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Mission Header */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-burgundy/10 text-burgundy px-4 py-1 rounded-full font-medium text-sm mb-6"
              variants={itemVariants}
            >
              Our Mission
            </motion.div>
            
            <motion.h2 
              className="heading-lg mb-8 text-primary"
              variants={itemVariants}
            >
              Building Bridges Across Cultures, Communities, and Continents
            </motion.h2>
            
            <motion.div 
              className="prose prose-lg mx-auto text-muted-foreground max-w-3xl"
              variants={itemVariants}
            >
              <p>
                BridgePoint Strategies is dedicated to fostering meaningful connections between Afro/Black leaders and their African counterparts, while simultaneously facilitating domestic collaborations with government officials, businesses, and immigrant communities.
              </p>
            </motion.div>
          </div>
          
          {/* Mission Pillars */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {missionPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-primary">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mission Approach */}
          <motion.div 
            className="bg-navy/5 rounded-2xl p-8 md:p-12 mb-16"
            variants={itemVariants}
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-serif font-bold mb-6 text-primary text-center">Our Approach</h3>
              <p className="text-lg text-muted-foreground mb-0">
                Our approach focuses on creating sustainable relationships that empower communities, drive economic development, and build cultural understanding. Through strategic initiatives and partnerships, we aim to be the catalyst for positive change both globally and locally.
              </p>
            </div>
          </motion.div>
          
          {/* Mission Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            {missionStats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="stat-counter text-3xl font-bold text-primary mb-1" style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                  {stat.count}+
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="h-24 w-px mx-auto bg-gradient-to-b from-transparent via-burgundy/30 to-burgundy/10"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
