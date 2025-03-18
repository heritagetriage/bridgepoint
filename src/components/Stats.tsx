
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Globe, Users, Briefcase, Building } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Stats = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const location = useLocation();
  
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [forceAnimate, setForceAnimate] = useState(false);
  
  const finalCount1 = 24; // Countries connected
  const finalCount2 = 150; // Leaders engaged
  const finalCount3 = 45; // Communities empowered
  const finalCount4 = 32; // Economic initiatives
  
  const duration = 2500; // 2.5 seconds for counting animation to make it more noticeable
  
  // Check if we're directly navigating to the statistics section
  useEffect(() => {
    if (location.hash === '#statistics') {
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
        setCount4(Math.floor(progress * finalCount4));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount1(finalCount1);
          setCount2(finalCount2);
          setCount3(finalCount3);
          setCount4(finalCount4);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [controls, isInView, forceAnimate, duration, finalCount1, finalCount2, finalCount3, finalCount4]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const statItems = [
    {
      icon: <Globe className="w-10 h-10 text-burgundy" />,
      count: count1,
      label: "Countries Connected",
      delay: 0
    },
    {
      icon: <Users className="w-10 h-10 text-navy" />,
      count: count2,
      label: "Leaders Engaged",
      delay: 1
    },
    {
      icon: <Building className="w-10 h-10 text-burgundy" />,
      count: count3,
      label: "Communities Empowered",
      delay: 2
    },
    {
      icon: <Briefcase className="w-10 h-10 text-navy" />,
      count: count4,
      label: "Economic Initiatives",
      delay: 3
    }
  ];

  return (
    <section className="py-20 bg-navy/5">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-block bg-navy/10 text-navy px-4 py-1 rounded-full font-medium text-sm mb-6"
            >
              Our Impact
            </motion.div>
            <h2 className="heading-lg text-primary">Making a Difference Across the Globe</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center"
                variants={itemVariants}
                custom={index}
                style={{ "--animation-delay": item.delay } as React.CSSProperties}
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <div className="stat-counter text-4xl font-bold text-primary mb-2" style={{ animationDelay: `${0.3 + item.delay * 0.2}s` }}>
                  {item.count}+
                </div>
                <div className="mt-2 text-muted-foreground font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
