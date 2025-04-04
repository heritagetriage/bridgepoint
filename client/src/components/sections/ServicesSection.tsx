import { motion } from 'framer-motion';
import { Lightbulb, Settings, Users, Globe, TrendingUp, BookOpen } from 'lucide-react';

const services = [
  {
    icon: <Lightbulb size={40} />,
    title: 'Leadership Development',
    description: 'We help organizations develop effective leadership strategies to navigate complex global challenges.'
  },
  {
    icon: <Settings size={40} />,
    title: 'Strategy Consulting',
    description: 'Our consultants work with you to create tailored strategies that drive growth and positive impact.'
  },
  {
    icon: <Globe size={40} />,
    title: 'Cultural Exchange Facilitation',
    description: 'We create programs that foster meaningful cultural exchange and mutual understanding.'
  },
  {
    icon: <Users size={40} />,
    title: 'Community Engagement',
    description: 'Our team specializes in developing effective community engagement programs for lasting impact.'
  },
  {
    icon: <TrendingUp size={40} />,
    title: 'Economic Development',
    description: 'We help communities design and implement sustainable economic development initiatives.'
  },
  {
    icon: <BookOpen size={40} />,
    title: 'Educational Partnerships',
    description: 'We connect educational institutions globally to create transformative learning opportunities.'
  }
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F0F4FA] dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary dark:text-white section-heading">Our Services</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 font-inter">
            We offer a comprehensive range of services designed to help organizations and communities build meaningful connections and sustainable growth.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow dark:shadow-gray-900/30 group"
            >
              <div className="text-secondary dark:text-accent mb-4 group-hover:text-accent group-hover:scale-110 transform transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold mb-3 text-primary dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-inter">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
