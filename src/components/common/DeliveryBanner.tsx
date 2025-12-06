"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Truck, Gift, Tag, AlertCircle, LucideIcon } from 'lucide-react'; // Import additional icons
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom'; // Import Link for banner CTA

// Define the DeliveryBannerMessage interface
interface DeliveryBannerMessage {
  id: string;
  message_type: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  priority: number;
  link_url: string | null;
  link_text: string | null;
  background_color: string | null; // Not used for styling as per user request
  text_color: string | null;      // Not used for styling as per user request
  icon_name: string | null;
}

// Map message types to Lucide icons
const getBannerIcon = (iconName: string | null, messageType: string): LucideIcon => {
  if (iconName) {
    // Dynamically get icon from Lucide, fallback to default if not found
    const LucideIcons: { [key: string]: LucideIcon } = { Truck, Gift, Tag, AlertCircle }; // Add more as needed
    return LucideIcons[iconName] || Truck;
  }
  switch (messageType.toLowerCase()) {
    case 'delivery': return Truck;
    case 'promo': return Gift;
    case 'discount': return Tag;
    case 'alert': return AlertCircle;
    default: return Truck;
  }
};

const DeliveryBanner: React.FC = () => {
  const [activeBanners, setActiveBanners] = useState<DeliveryBannerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActiveBanners = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('delivery_banner_messages')
      .select('*')
      .eq('is_active', true)
      .or(`start_date.is.null,start_date.lte.${new Date().toISOString()}`)
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .order('priority', { ascending: false }) // Highest priority first
      .order('created_at', { ascending: false }); // Newest first for same priority

    if (error) {
      console.error("Error fetching active banners:", error);
      toast.error("Failed to load banner messages.");
      setActiveBanners([]);
    } else {
      setActiveBanners(data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchActiveBanners();
    // Optionally, refetch periodically if banners change frequently
    const interval = setInterval(fetchActiveBanners, 60000); // Refetch every minute
    return () => clearInterval(interval);
  }, [fetchActiveBanners]);

  // Animation variants for continuous horizontal slide
  const slide = {
    animate: {
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

  if (isLoading || activeBanners.length === 0) {
    return null; // Don't render if loading or no active banners
  }

  // Concatenate all active banner contents for continuous scroll
  const combinedBannerContent = activeBanners
    .map(banner => {
      const IconComponent = getBannerIcon(banner.icon_name, banner.message_type);
      const content = (
        <div className="flex items-center text-white font-semibold text-sm md:text-base">
          <IconComponent className="h-4 w-4 mr-3" />
          <Badge variant="secondary" className="bg-white text-red-600 text-xs md:text-sm px-3 py-1">
            {banner.content}
          </Badge>
          {banner.link_url && banner.link_text && (
            <Link to={banner.link_url} className="ml-4 text-white hover:underline text-xs md:text-sm">
              {banner.link_text} &rarr;
            </Link>
          )}
        </div>
      );
      return content;
    });

  // Render each banner content block separately within the scrolling container
  return (
    <div 
      className={cn(
        "fixed top-16 z-51 w-full overflow-hidden h-10 flex items-center",
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
          <div 
            key={i} 
            className={cn(
                "h-10 flex items-center bg-gradient-to-r from-red-600 to-pink-600",
                "min-w-[400px] justify-center",
                "rounded-xl mr-4"
            )}
          >
            {combinedBannerContent.map((contentBlock, idx) => (
              <React.Fragment key={idx}>
                {contentBlock}
                {/* Add a separator if there's more than one message */}
                {combinedBannerContent.length > 1 && idx < combinedBannerContent.length -1 && (
                  <span className="mx-4 text-white/70">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DeliveryBanner;