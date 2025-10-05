"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </motion.div>
  );
};

export default LoadingPage;