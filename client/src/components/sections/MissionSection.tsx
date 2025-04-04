import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Building, ChevronRight } from 'lucide-react';

export default function MissionSection() {
  const [activeTab, setActiveTab] = useState('global');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
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
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary section-heading">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 font-inter">
            At BridgePoint Strategies, our mission is to foster global and domestic connections that empower communities through strategic partnerships and innovative solutions. We believe in building bridges between cultures, businesses, and governments to create sustainable positive impact.
          </p>
        </motion.div>

        <div className="mt-8">
          <Tabs defaultValue="global" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-[#F0F4FA] rounded-full">
                <TabsTrigger 
                  value="global" 
                  className="rounded-full py-3 text-lg font-inter font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  <Globe className={`mr-2 ${activeTab === 'global' ? 'text-white' : 'text-primary'}`} size={18} />
                  Global Initiatives
                </TabsTrigger>
                <TabsTrigger 
                  value="domestic" 
                  className="rounded-full py-3 text-lg font-inter font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  <Building className={`mr-2 ${activeTab === 'domestic' ? 'text-white' : 'text-primary'}`} size={18} />
                  U.S. Domestic
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'global' && (
                  <TabsContent key="global" value="global" className="mt-0 absolute w-full">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-[#F0F4FA] to-white rounded-lg p-8 shadow-lg"
                    >
                      <div className="flex items-center mb-6">
                        <Globe className="text-accent mr-3" size={24} />
                        <h3 className="text-2xl font-playfair font-bold text-primary">Global Initiatives</h3>
                      </div>
                      <p className="text-gray-700 mb-8 font-inter">
                        Our global initiatives focus on building bridges between diverse cultures and economies. We work with partners across continents to facilitate meaningful exchanges that lead to mutual growth and understanding.
                      </p>
                      
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-6"
                      >
                        <motion.div 
                          variants={itemVariants}
                          className="bg-white p-6 rounded-md shadow-sm border-l-4 border-accent hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-xl font-playfair font-semibold mb-3 text-primary flex items-center">
                            <ChevronRight className="text-accent mr-2" size={18} />
                            Cross-Cultural Partnerships
                          </h4>
                          <p className="text-gray-600 font-inter">
                            We develop sustainable partnerships between organizations from different countries to foster cultural exchange and business growth.
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          variants={itemVariants}
                          className="bg-white p-6 rounded-md shadow-sm border-l-4 border-accent hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-xl font-playfair font-semibold mb-3 text-primary flex items-center">
                            <ChevronRight className="text-accent mr-2" size={18} />
                            International Development
                          </h4>
                          <p className="text-gray-600 font-inter">
                            Our consultants work with businesses and governments to implement development strategies that respect local cultures while promoting economic advancement.
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
                
                {activeTab === 'domestic' && (
                  <TabsContent key="domestic" value="domestic" className="mt-0 absolute w-full">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-[#F0F4FA] to-white rounded-lg p-8 shadow-lg"
                    >
                      <div className="flex items-center mb-6">
                        <Building className="text-accent mr-3" size={24} />
                        <h3 className="text-2xl font-playfair font-bold text-primary">U.S. Domestic Initiatives</h3>
                      </div>
                      <p className="text-gray-700 mb-8 font-inter">
                        Within the United States, we work to strengthen communities through strategic partnerships and innovative program development. Our domestic initiatives address critical needs while creating opportunities for growth.
                      </p>
                      
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-6"
                      >
                        <motion.div 
                          variants={itemVariants}
                          className="bg-white p-6 rounded-md shadow-sm border-l-4 border-accent hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-xl font-playfair font-semibold mb-3 text-primary flex items-center">
                            <ChevronRight className="text-accent mr-2" size={18} />
                            Community Empowerment
                          </h4>
                          <p className="text-gray-600 font-inter">
                            We develop programs that strengthen local communities by connecting resources, businesses, and civic organizations to address common challenges.
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          variants={itemVariants}
                          className="bg-white p-6 rounded-md shadow-sm border-l-4 border-accent hover:shadow-md transition-shadow"
                        >
                          <h4 className="text-xl font-playfair font-semibold mb-3 text-primary flex items-center">
                            <ChevronRight className="text-accent mr-2" size={18} />
                            Economic Development
                          </h4>
                          <p className="text-gray-600 font-inter">
                            Our team works with local governments and businesses to create sustainable economic development plans that benefit all community members.
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
