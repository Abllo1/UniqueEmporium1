"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { Laptop, Tablet, Headphones, Monitor, Mouse, Home, LucideIcon } from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
  description: string;
  link: string;
}

const categories: Category[] = [
  { name: "Laptops", icon: Laptop, description: "Powerful notebooks & ultrabooks", link: "/products?category=laptops" },
  { name: "Tablets", icon: Tablet, description: "Portable entertainment & productivity", link: "/products?category=tablets" },
  { name: "Audio", icon: Headphones, description: "Immersive sound experiences", link: "/products?category=audio" },
  { name: "Monitors", icon: Monitor, description: "Stunning displays for work & play", link: "/products?category=monitors" },
  { name: "Accessories", icon: Mouse, description: "Enhance your tech setup", link: "/products?category=accessories" },
  { name: "Smart Home", icon: Home, description: "Connect & automate your living space", link: "/products?category=smart-home" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const CategoriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || isPaused) return;

    let animationFrameId: number;
    let lastTimestamp: DOMHighResTimeStamp;

    const scroll = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > 16) { // Roughly 60fps
        scrollElement.scrollLeft += 1; // Adjust scroll speed here
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
          scrollElement.scrollLeft = 0; // Loop back to start
        }
        lastTimestamp = timestamp;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <section className="py-16 bg-background">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          className="font-poppins font-bold text-xl md:text-4xl text-foreground"
          variants={fadeInUp}
        >
          Explore Our Categories
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground mt-2 mb-8 md:mb-12"
          variants={fadeInUp}
        >
          Find the perfect tech to power your productivity and lifestyle
        </motion.p>

        <motion.div
          className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          variants={staggerContainer} // Apply stagger to the container for cards
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div key={category.name} variants={fadeInUp}>
              <Link
                to={category.link}
                className="group relative flex-shrink-0 w-[200px] h-16 lg:w-[250px] lg:h-24
                           bg-gradient-to-br from-gray-800 to-gray-600 border border-gray-500
                           rounded-xl overflow-hidden p-3 flex items-center justify-start text-left
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-600/50 rounded-full flex items-center justify-center mr-3
                                transition-colors duration-300 group-hover:bg-gray-500/70">
                  <category.icon className="w-3 h-3 lg:w-6 lg:h-6 text-accent transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-[10px] text-white lg:text-base
                                 transition-colors duration-300 group-hover:text-accent">
                    {category.name}
                  </h3>
                  <p className="text-[8px] text-gray-300 lg:text-sm
                                transition-colors duration-300 group-hover:text-gray-100">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CategoriesSection;