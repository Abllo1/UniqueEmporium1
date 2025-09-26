"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Handshake, Zap, ShieldCheck } from "lucide-react";

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly seek out and offer the latest technological advancements.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Transparency and honesty guide every interaction with our customers.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "We are committed to delivering superior products and services.",
  },
  {
    icon: ShieldCheck,
    title: "Customer Focus",
    description: "Your satisfaction is at the heart of everything we do.",
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

const AboutValues = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto text-center">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Badge variant="outline" className="mb-4 text-sm">Our Core Principles</Badge>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Values That Drive Us
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto" // Changed to 2 columns and added max-width for optimization
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {values.map((value, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="p-8 h-full text-left">
              <value.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-4 text-foreground">{value.title}</h3>
              <p className="text-xs text-muted-foreground">{value.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutValues;