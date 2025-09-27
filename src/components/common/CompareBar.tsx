"use client";

import React from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scale, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCompare } from "@/context/CompareContext.tsx"; // Import useCompare

const CompareBar = () => {
  const { compareItems, totalCompareItems, clearCompare, COMPARE_LIMIT } = useCompare();
  const location = useLocation();

  // Only show the bar if there are items to compare and not on the compare page itself
  const showBar = totalCompareItems > 0 && location.pathname !== "/compare";

  const barVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as Easing } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" as Easing } },
  };

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg p-4
                     flex items-center justify-between flex-wrap gap-3"
          variants={barVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6" />
            <span className="font-semibold text-lg">
              {totalCompareItems} / {COMPARE_LIMIT} Items Selected for Comparison
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary" className="px-6">
              <Link to="/compare">Compare Now</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={clearCompare} className="text-primary-foreground hover:bg-primary-foreground/10">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;