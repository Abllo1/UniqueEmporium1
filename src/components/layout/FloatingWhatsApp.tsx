"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { MessageCircle, X, User, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTogglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 0.4, ease: "easeOut" as Easing } },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex items-end justify-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* WhatsApp Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "relative w-72 md:w-80 p-6 rounded-xl shadow-2xl",
              "bg-neon-purple/20 backdrop-blur-md border border-neon-purple/50",
              "flex flex-col space-y-4 text-neon-purple-foreground mr-4"
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-neon-purple-foreground hover:bg-neon-purple/30"
                onClick={handleTogglePanel}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            <h3 className="font-poppins text-lg font-semibold text-neon-purple-foreground">
              If you have any queries or want to chat with us directly 👇👇
            </h3>
            <Button
              asChild
              className="w-full bg-neon-purple hover:bg-neon-purple/90 text-neon-purple-foreground"
            >
              <a
                href="https://wa.me/message/CHT2INJ4SKUMH1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => isMobile && setIsOpen(false)} // Close on tap for mobile
              >
                <User className="mr-2 h-4 w-4" /> Rep 1 – Customer Care
              </a>
            </Button>
            <Button
              asChild
              className="w-full bg-neon-purple hover:bg-neon-purple/90 text-neon-purple-foreground"
            >
              <a
                href="https://wa.me/message/5KPFXJHULYLID1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => isMobile && setIsOpen(false)} // Close on tap for mobile
              >
                <Package className="mr-2 h-4 w-4" /> Rep 2 – Order Support
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Icon */}
      <motion.button
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-neon-purple shadow-lg text-neon-purple-foreground"
        onClick={handleTogglePanel}
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="h-8 w-8" />
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;