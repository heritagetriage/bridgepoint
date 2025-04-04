import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useSettings } from "@/contexts/SettingsContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Mission", href: "#mission" },
  { name: "Services", href: "#services" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { generalSettings } = useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle smooth scrolling
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Close mobile menu if open
      if (isOpen) setIsOpen(false);

      // Scroll to the element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-2 text-primary dark:text-white"
          : "bg-transparent py-4 text-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <span className={`text-2xl font-playfair font-bold`}>
            {generalSettings.siteName.split(" ")[0]}{" "}
            <span className="text-accent">
              {generalSettings.siteName.split(" ")[1]}
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-inter font-medium transition-colors ${
                scrolled
                  ? "text-primary dark:text-white hover:text-secondary dark:hover:text-accent"
                  : "text-white hover:text-accent"
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Theme Toggle Button */}
          {mounted && (
            <div className="flex items-center gap-2">
              <Sun
                size={18}
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-accent"
                }`}
              />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-secondary"
              />
              <Moon
                size={18}
                className={`${
                  theme === "dark" ? "text-accent" : "text-gray-400"
                }`}
              />
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Theme Toggle Button (Mobile) */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className={
                scrolled ? "text-primary dark:text-white" : "text-white"
              }
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className={scrolled ? "text-primary dark:text-white" : "text-white"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 w-full shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-primary dark:text-white hover:text-secondary dark:hover:text-accent font-inter py-2 px-4 rounded transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
