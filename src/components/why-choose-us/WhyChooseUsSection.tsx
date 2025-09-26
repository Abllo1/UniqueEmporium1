"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { ShieldCheck, Truck, Headset, DollarSign, RefreshCw, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Every product is rigorously tested for performance and durability.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Shipping",
    description: "Get your tech delivered quickly and safely to your doorstep.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description: "Our dedicated team is always here to help you with any queries.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Enjoy the best deals and value for your money on all electronics.",
  },
  {
    icon: RefreshCw,
    title: "Hassle-Free Returns",
    description: "Easy and straightforward return policy for your peace of mind.",
  },
  {
    icon: Award,
    title: "Trusted Brand",
    description: "Join thousands of satisfied customers who trust ElectroPro.",
  },
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

const WhyChooseUsSection = () => {
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
          Why Choose ElectroPro?
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground mt-2 mb-8 md:mb-12"
          variants={fadeInUp}
        >
          Experience the difference with our commitment to quality, service, and innovation.
        </motion.p>

        {/* Banner Image */}
        <motion.div
          className="relative w-full max-w-5xl mx-auto h-48 md:h-64 rounded-xl overflow-hidden shadow-lg mb-12"
          variants={fadeInUp}
        >
          <img
            src="/public/placeholder.svg" // Placeholder image for the banner
            alt="Why Choose Us Banner"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Large Illustrative Image (Desktop Only) */}
          <motion.div
            className="hidden md:block relative h-96 rounded-xl overflow-hidden shadow-xl"
            variants={fadeInUp}
          >
            <img
              src="/public/placeholder.svg" // Large illustrative image
              alt="ElectroPro Advantage"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-card"
                variants={fadeInUp}
              >
                <motion.div
                  className="mb-4"
                  animate={{
                    y: [0, -5, 0], // Vertical float
                    rotateX: [0, 5, 0], // Subtle X-axis rotation
                    rotateZ: [0, 2, 0], // Subtle Z-axis rotation
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut" as Easing,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.1, // Stagger the icon animation
                  }}
                >
                  <reason.icon className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;