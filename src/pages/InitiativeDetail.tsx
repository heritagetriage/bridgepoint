
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Home, Calendar, Users, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InitiativeDetail = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dummy data for initiatives - in a real app, you would fetch this from an API
  const initiatives = [
    {
      id: "pan-african-leadership-summit",
      title: "Pan-African Leadership Summit",
      description: "Connecting Black leaders from the Americas, Europe, and Africa for strategic partnerships and collaborative initiatives.",
      longDescription: "The Pan-African Leadership Summit is our flagship global initiative that brings together leaders of African descent from across the diaspora. This annual event facilitates high-level discussions, strategic partnerships, and collaborative initiatives that address shared challenges and opportunities. The summit alternates between locations in Africa, Europe, and the Americas, symbolizing the interconnected nature of our global community.",
      image: "https://images.unsplash.com/photo-1581974206967-93856b25aa13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1781&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
      ],
      type: "global",
      features: [
        "High-level networking between continental and diaspora leaders",
        "Policy development workshops addressing shared challenges",
        "Investment matching between diaspora entrepreneurs and African markets",
        "Cultural exchange programs enhancing mutual understanding"
      ],
      stats: [
        { label: "Countries Represented", value: "27", icon: Globe },
        { label: "Annual Participants", value: "250+", icon: Users },
        { label: "Years Running", value: "6", icon: Calendar },
        { label: "Partnerships Formed", value: "120+", icon: Award }
      ]
    },
    {
      id: "community-business-incubator",
      title: "Community Business Incubator",
      description: "Supporting immigrant entrepreneurs with resources, mentorship, and connections to thrive in their new communities.",
      longDescription: "The Community Business Incubator provides comprehensive support to immigrant entrepreneurs seeking to establish or grow businesses in their new communities. Through personalized mentorship, access to capital, business education, and connections to local markets, we help transform entrepreneurial vision into economic reality. Our incubator creates a supportive community where newcomers can overcome barriers and build successful enterprises.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1556761175-4b29df3d8a69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80"
      ],
      type: "domestic",
      features: [
        "One-on-one business mentorship with experienced entrepreneurs",
        "Access to microloans and alternative financing options",
        "Business plan development workshops in multiple languages",
        "Connections to local supplier networks and retail opportunities"
      ],
      stats: [
        { label: "Businesses Launched", value: "85", icon: Home },
        { label: "Mentors Available", value: "40+", icon: Users },
        { label: "Success Rate", value: "78%", icon: Award },
        { label: "Jobs Created", value: "350+", icon: Calendar }
      ]
    },
    {
      id: "cross-cultural-education-exchange",
      title: "Cross-Cultural Education Exchange",
      description: "Facilitating knowledge sharing between educational institutions across continents to enrich learning experiences.",
      longDescription: "Our Cross-Cultural Education Exchange program creates meaningful connections between educational institutions in Africa and those in diaspora communities. By facilitating faculty exchanges, collaborative research, student mobility programs, and curriculum development partnerships, we enrich learning experiences while strengthening educational systems on both sides of the Atlantic. The program emphasizes mutual learning and respect, challenging traditional notions of one-way knowledge transfer.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
      ],
      type: "global",
      features: [
        "Faculty exchange programs between partner institutions",
        "Joint research initiatives on shared social challenges",
        "Virtual classroom connections enabling cross-continental learning",
        "Curriculum development incorporating diverse knowledge systems"
      ],
      stats: [
        { label: "Partner Institutions", value: "18", icon: Home },
        { label: "Exchange Participants", value: "175", icon: Users },
        { label: "Research Projects", value: "24", icon: Award },
        { label: "Countries Involved", value: "12", icon: Globe }
      ]
    },
    {
      id: "local-government-partnership-program",
      title: "Local Government Partnership Program",
      description: "Creating direct channels between immigrant communities and local officials to address specific needs and opportunities.",
      longDescription: "The Local Government Partnership Program bridges the gap between immigrant communities and municipal governance systems. By creating structured channels for dialogue, policy input, and collaborative problem-solving, we help ensure that local government decisions reflect the needs and aspirations of all community members. This initiative transforms traditional civic engagement models to be more inclusive and responsive to diverse populations.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80",
        "https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
      ],
      type: "domestic",
      features: [
        "Regular roundtable sessions between community leaders and local officials",
        "Policy review committees with diverse community representation",
        "Multilingual civic education workshops for newcomer communities",
        "Leadership development for immigrants interested in public service"
      ],
      stats: [
        { label: "Municipal Partners", value: "14", icon: Home },
        { label: "Community Representatives", value: "65", icon: Users },
        { label: "Policy Recommendations", value: "42", icon: Award },
        { label: "Participating Districts", value: "28", icon: Calendar }
      ]
    }
  ];

  // Find the initiative that matches the URL parameter
  const initiative = initiatives.find(initiative => initiative.id === id);

  // If no matching initiative is found, show a message
  if (!initiative) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Initiative Not Found</h1>
          <p className="mb-8">The initiative you're looking for doesn't exist.</p>
          <Link to="/#initiatives" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-300">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Initiatives
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/#initiatives" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to All Initiatives
            </Link>
            
            <div className="flex flex-col md:flex-row mb-10 gap-8">
              <div className="md:w-7/12">
                <div className="mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    initiative.type === 'global' 
                      ? 'bg-navy/10 text-navy' 
                      : 'bg-burgundy/10 text-burgundy'
                  }`}>
                    {initiative.type === 'global' ? 'Global Initiative' : 'Domestic Initiative'}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-primary">
                  {initiative.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  {initiative.longDescription}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {initiative.stats.map((stat, index) => (
                    <div key={index} className="bg-navy/5 p-4 rounded-lg text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy/10 text-navy mb-2">
                        <stat.icon size={20} />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-5/12">
                <div className="rounded-xl overflow-hidden shadow-md h-80 md:h-96">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initiative.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy text-white">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initiative.gallery.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-md h-60">
                    <img 
                      src={image} 
                      alt={`${initiative.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Interested in Getting Involved?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for partners, volunteers, and supporters to help us expand the impact of this initiative.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-burgundy hover:bg-burgundy-light text-white font-medium rounded-md transition-all duration-300"
              >
                Contact Us to Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InitiativeDetail;
