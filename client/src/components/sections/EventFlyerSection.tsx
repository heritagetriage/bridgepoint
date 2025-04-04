import { motion, useTransform, useScroll } from "framer-motion";
import {
  Download,
  Calendar,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import eventService, {
  type Event,
  type EventsResponse,
} from "@/services/eventService";
import { format } from "date-fns";

// Fallback event data in case API fails
const fallbackEvents = [
  {
    _id: "1",
    title: "Building Bridges, Empowering Communities",
    description:
      "Our annual conference brings together leaders from around the world to discuss global challenges and opportunities for collaboration.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    location: "Washington D.C. Convention Center",
    type: "Annual Conference",
    theme: "Building Bridges, Empowering Communities",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    registrationRequired: true,
  },
  {
    _id: "2",
    title: "Transformative Leadership for a Changing World",
    description:
      "Join thought leaders and executives for an intensive summit focused on developing adaptive leadership skills for today's complex challenges.",
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    location: "Atlanta Convention Center",
    type: "Leadership Summit",
    theme: "Adaptive Leadership",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  },
  {
    _id: "3",
    title: "Strategic Communication Masterclass",
    description:
      "A hands-on workshop series designed to enhance your strategic communication skills across cultural and organizational boundaries.",
    date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    location: "Chicago Business Center",
    type: "Workshop Series",
    theme: "Effective Communication",
    imageUrl:
      "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  },
];

export default function EventFlyerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [events, setEvents] = useState<Event[]>(fallbackEvents as Event[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await eventService.getEvents(1, 10);
        console.log("API Response:", response);
        if (response?.success && response.data) {
          console.log(
            "Mapped events:",
            response.data.map((e) => ({
              title: e.title,
              description: e.description,
              date: e.date,
              location: e.location,
              type: e.type,
              theme: e.theme,
              imageUrl: e.imageUrl,
              registrationRequired: e.registrationRequired,
            }))
          );
          setEvents(response.data);
        } else {
          console.log("Invalid response structure, using fallback");
          setEvents(fallbackEvents as Event[]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        // Use fallback events on error
        setEvents(fallbackEvents as Event[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const nextEvent = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentEventIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevEvent = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentEventIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextEvent();
    }, 8000);

    return () => clearInterval(interval);
  }, [events.length]);

  const currentEvent = events[currentEventIndex];

  // Format the date for display
  const formatEventDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (err) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-red-50 dark:bg-red-900/20 p-8 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Please try again later.
        </p>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No upcoming events found.
        </p>
      </div>
    );
  }

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-[#F0F4FA] dark:from-gray-900 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary dark:text-white section-heading">
            Featured Events
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 font-inter">
            Join industry leaders and changemakers at our signature events
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl relative"
        >
          {/* Carousel navigation buttons */}
          {events.length > 1 && (
            <>
              <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
                <button
                  onClick={prevEvent}
                  className="bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  disabled={isAnimating}
                  aria-label="Previous event"
                >
                  <ChevronLeft
                    className="text-primary dark:text-white"
                    size={24}
                  />
                </button>
              </div>

              <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
                <button
                  onClick={nextEvent}
                  className="bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  disabled={isAnimating}
                  aria-label="Next event"
                >
                  <ChevronRight
                    className="text-primary dark:text-white"
                    size={24}
                  />
                </button>
              </div>

              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating) return;
                      setIsAnimating(true);
                      setCurrentEventIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }}
                    className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
                      index === currentEventIndex
                        ? "bg-primary w-4 md:w-6"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="bg-gradient-to-r from-primary/95 to-secondary/95 dark:from-gray-800 dark:to-gray-700 p-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <motion.div
                  key={`event-content-${currentEventIndex}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-10 flex flex-col justify-center"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-gold-gradient text-white text-sm font-semibold mb-6">
                    {currentEvent.type || "Event"}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-primary dark:text-white">
                    {currentEvent.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-8 font-inter">
                    {currentEvent.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="flex items-center"
                    >
                      <Calendar className="text-accent mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300 font-inter">
                        <span className="font-semibold">Date:</span>{" "}
                        {formatEventDate(currentEvent.date)}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="flex items-center"
                    >
                      <MapPin className="text-accent mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300 font-inter">
                        <span className="font-semibold">Location:</span>{" "}
                        {currentEvent.location}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center"
                    >
                      <Tag className="text-accent mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300 font-inter">
                        <span className="font-semibold">Theme:</span>{" "}
                        {currentEvent.theme || "General"}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="flex items-center gap-2 w-full sm:w-auto bg-gold-gradient hover:opacity-90 transition-opacity dark:text-gray-900">
                      <Download size={16} />
                      Download Event Details
                    </Button>
                  </motion.div>
                  {currentEvent.registrationRequired && (
                    <p className="text-red-500 mt-4">
                      Registration is required for this event.
                    </p>
                  )}
                </motion.div>

                <motion.div
                  key={`event-image-${currentEventIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="h-64 md:h-auto relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/10 dark:bg-gray-900/30"></div>
                  <div
                    className="h-full w-full bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${(() => {
                        // Force image refresh by adding timestamp to URL
                        const baseUrl = currentEvent.imageUrl || "https://placehold.co/600x400?text=Event+Image";
                        
                        // Handle absolute URLs (starting with http)
                        if (baseUrl.startsWith("http")) {
                          return `${baseUrl}?t=${new Date().getTime()}`;
                        }
                        
                        // Handle relative URLs (from server)
                        return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${baseUrl}?t=${new Date().getTime()}`;
                      })()})`,
                    }}
                  ></div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent dark:from-gray-900/90 p-6 text-white">
                    <p className="font-semibold">
                      Join us for this transformative event
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
