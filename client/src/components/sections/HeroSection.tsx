"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Globe as LucideGlobe,
  Building,
  ArrowDown,
} from "lucide-react";
import { FloatingPaper } from "@/components/floating-paper";
import { RoboAnimation } from "@/components/robo-animation";
import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/sparkles";
import GlobeComponent from "./Globe";

export default function HeroSection() {
  const { theme } = useTheme();
  return (
    <div
      id="home"
      className="relative min-h-[calc(100vh-76px)] flex items-center bg-gradient-to-b from-gray-950 to-black dark:from-black dark:to-gray-950"
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 overflow-hidden">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.8}
          maxSize={2.0}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#c084fc"
        />
      </div>

      {/* Globe background - constrained to hero section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <GlobeComponent />
      </div>

      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={10} />
      </div>

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 dark:from-transparent dark:via-black/50 dark:to-black/70 z-[1]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="h-[2px] w-10 bg-purple-500 mr-3"></div>
              <h5 className="text-xl md:text-2xl font-light text-purple-100">
                Where Vision Meets Strategy
              </h5>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              BridgePoint{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500">
                Strategies
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-200 dark:text-gray-100 text-xl mb-8 max-w-2xl mx-auto"
          >
            Creating powerful connections between organizations, communities,
            and cultures to drive meaningful change and sustainable growth
            across borders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          >
            <div className="flex items-center">
              <LucideGlobe className="text-purple-500 mr-3" size={24} />
              <span className="text-lg text-purple-100">
                Global Initiatives
              </span>
            </div>
            <div className="flex items-center">
              <Building className="text-purple-500 mr-3" size={24} />
              <span className="text-lg text-purple-100">Domestic Programs</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96 z-10">
        <RoboAnimation />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <a href="#mission" className="text-white">
          <ArrowDown size={32} />
        </a>
      </motion.div>
    </div>
  );
}
