import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";

// Default contact info in case settings fail to load
const defaultContactInfo = {
  email: "info@bridgepoint-strategies.com",
  phone: "+233548353466",
  address: "Dodowa Oyikum Ghana.",
};

export default function ContactSection() {
  const { generalSettings, isLoading: settingsLoading, error } = useSettings();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! We will get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Use settings if available, otherwise fall back to defaults
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      detail: generalSettings?.contactEmail || defaultContactInfo.email,
      link: `mailto:${
        generalSettings?.contactEmail || defaultContactInfo.email
      }`,
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      detail: generalSettings?.contactPhone || defaultContactInfo.phone,
      link: `tel:${(
        generalSettings?.contactPhone || defaultContactInfo.phone
      ).replace(/\D/g, "")}`,
    },
    {
      icon: <MapPin size={24} />,
      title: "Office",
      detail: generalSettings?.address || defaultContactInfo.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(
        generalSettings?.address || defaultContactInfo.address
      )}`,
    },
  ];

  if (settingsLoading) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 font-inter">
              Have questions or want to learn more about our services? We'd love
              to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
                Get in Touch
              </h3>
              <div className="space-y-8">
                <p>Loading...</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-gradient hover:opacity-90 transition-opacity"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 font-inter">
              Have questions or want to learn more about our services? We'd love
              to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
                Get in Touch
              </h3>
              <div className="space-y-8">
                <p>Error loading contact information.</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-gradient hover:opacity-90 transition-opacity"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-primary">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 font-inter">
            Have questions or want to learn more about our services? We'd love
            to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
              Get in Touch
            </h3>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="bg-accent/10 p-3 rounded-lg mr-4 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-playfair font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-accent transition-colors font-inter"
                    >
                      {item.detail}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-playfair font-bold mb-6 text-primary">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email address"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-gradient hover:opacity-90 transition-opacity"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
