"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeProps {
  count: number;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const Badge = ({ count, variant = "destructive", className }: BadgeProps) => {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -right-2 -top-2 z-10"
        >
          <ShadcnBadge
            variant={variant}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs",
              className,
            )}
          >
            {count}
          </ShadcnBadge>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Badge;