"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react'; // Default icon
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons for dynamic icons
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDeliveryBanners } from '@/hooks/useDeliveryBanners'; // NEW: Import the hook

const DeliveryBanner: React.FC = () => {
  const { activeBanner, isLoading } = useDeliveryBanners();

  // Animation variants for continuous horizontal slide
  const slide = {
    animate: {
      // Start off-screen left, end off-screen right
      x: ["-100%", "100%"], 
      transition: {
        x: {
          duration: 70, // 70 seconds for extremely slow speed
          ease: "linear",
          repeat: Infinity,
        },
      },
    },
  };

  // Type guard to check if a string is a valid Lucide icon key
  const isLucideIconKey = (key: string): key is keyof typeof LucideIcons => {
    return key in LucideIcons;
  };

  // Render the banner content based on activeBanner
  const renderBannerContent = (banner: typeof activeBanner) => {
    if (!banner) return null;

    const IconComponent = banner.icon_name && isLucideIconKey(banner.icon_name)
      ? LucideIcons[banner.icon_name]
      : Truck; // Fallback to Truck icon

    const content = (
      <div className={cn(
          "h-10 flex items-center justify-center",
          "min-w-[400px] rounded-xl mr-4", // Added rounding and margin to separate blocks
          banner.background_color || "bg-gradient-to-r from-red-600 to-pink-600" // Dynamic or default background
      )}>
          <div className={cn(
            "flex items-center font-semibold text-sm md:text-base",
            banner.text_color || "text-white" // Dynamic or default text color
          )}>
            <IconComponent className="h-4 w-4 mr-3" />
            <Badge variant="secondary" className="bg-white text-red-600 text-xs md:text-sm px-3 py-1">
              {banner.content}
            </Badge>
            {banner.link_url && banner.link_text && (
              <a 
                href={banner.link_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn("ml-4 underline hover:no-underline", banner.text_color || "text-white")}
              >
                {banner.link_text}
              </a>
            )}
          </div>
      </div>
    );

    return content;
  };

  if (isLoading || !activeBanner) {
    return null; // Don't render if loading or no active banner
  }

  return (
    <div 
      className={cn(
        "fixed top-16 z-51 w-full overflow-hidden h-10 flex items-center", // Changed to fixed, top-16, and z-51
      )}
    >
      <motion.div
        className="h-full flex items-center whitespace-nowrap"
        variants={slide as any}
        initial={{ x: "-100%" }}
        animate="animate"
      >
        {/* Repeat content blocks, each carrying its own background */}
        {[...Array(7)].map((_, i) => (
          <React.Fragment key={i}>
            {renderBannerContent(activeBanner)}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default DeliveryBanner;