"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        className="text-center max-w-lg mx-auto p-8 rounded-xl shadow-2xl border border-destructive/30 bg-card"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="w-64 h-64 flex justify-center mx-auto mb-8">
          <img
            src="https://i.postimg.cc/2yrFyxKv/giphy.gif"
            alt="error-gif"
            className="w-full h-full object-contain animate-[fadeIn_1.6s_ease-in-out]"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground">This page is gone.</h1>
        <p className="text-lg text-muted-foreground mb-8">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg" variant="default">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;