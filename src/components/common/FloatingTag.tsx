"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FloatingTagProps {
  text: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const FloatingTag = ({ text, variant = "default", className }: FloatingTagProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -2, 0], // Subtle float animation
        rotate: [0, 1, -1, 0], // Subtle rotate animation
      }}
      transition={{
        scale: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.3, ease: "easeOut" },
        y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      }}
      className={cn("absolute top-2 left-2 z-10", className)}
    >
      <Badge variant={variant} className="px-2 py-1 text-xs font-semibold">
        {text}
      </Badge>
    </motion.div>
  );
};

export default FloatingTag;