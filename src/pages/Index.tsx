"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion, Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as Easing,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Background elements for visual interest */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as Easing }}
      >
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion background"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 py-12 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight font-poppins mb-6"
          variants={itemVariants}
        >
          Unique Emporium
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Discover curated luxury thrift and vintage fashion. Each piece tells a story, waiting to become part of yours.
        </motion.p>
        <motion.div variants={itemVariants}>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link to="/products" className="flex items-center gap-2">
                Shop the Collection <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
    </div>
  );
};

export default Index;