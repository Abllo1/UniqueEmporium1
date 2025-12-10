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
  const LucideIcons: { [key: string]: LucideIcon } = { Truck, Gift, Tag, AlertCircle }; // Add more as needed
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  switch (messageType.toLowerCase()) {
    case 'delivery': return Truck;
    case 'promo': return Gift;
    case 'discount': return Tag;
    case 'alert': return AlertCircle;
    default: return Truck;
  }
};

// Function to generate a weighted pool of messages
const generateWeightedPool = (banners: DeliveryBannerMessage[]): DeliveryBannerMessage[] => {
  const pool: DeliveryBannerMessage[] = [];
  
  banners.forEach(banner => {
    // Use priority + 1 as weight to ensure minimum display count of 1
    const weight = Math.max(1, banner.priority + 1); 
    for (let i = 0; i < weight; i++) {
      pool.push(banner);
    }
  });

  // Simple shuffle function (Fisher-Yates)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool;
};

const SWITCH_INTERVAL_MS = 70000; // Switch content every 70 seconds

const DeliveryBanner: React.FC = () => {
  const [activeBanners, setActiveBanners] = useState<DeliveryBannerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New states for weighted cycling
  const [weightedPool, setWeightedPool] = useState<DeliveryBannerMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const fetchActiveBanners = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('delivery_banner_messages')
      .select('*')
      .eq('is_active', true)
      .or(`start_date.is.null,start_date.lte.${new Date().toISOString()}`)
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching active banners:", error);
      toast.error("Failed to load banner messages.");
      setActiveBanners([]);
      setWeightedPool([]);
    } else {
      setActiveBanners(data || []);
      if (data && data.length > 0) {
        setWeightedPool(generateWeightedPool(data));
      } else {
        setWeightedPool([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchActiveBanners();
    // Refetch periodically (e.g., every 5 minutes)
    const refetchInterval = setInterval(fetchActiveBanners, 300000); 
    return () => clearInterval(refetchInterval);
  }, [fetchActiveBanners]);

  // Effect to handle message switching based on the weighted pool
  useEffect(() => {
    if (weightedPool.length === 0) return;

    const interval = setInterval(() => {
      // Cycle through the weighted pool
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % weightedPool.length);
    }, SWITCH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [weightedPool]);

  // Animation variants for continuous horizontal slide (KEEP AS IS)
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

  if (isLoading || weightedPool.length === 0) {
    return null;
  }

  // Get the single current message to display
  const currentBanner = weightedPool[currentMessageIndex];

  // Function to render the single message block content
  const renderSingleMessageContent = (banner: DeliveryBannerMessage) => {
    const IconComponent = getBannerIcon(banner.icon_name, banner.message_type);
    return (
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
  };

  const messageContent = renderSingleMessageContent(currentBanner);

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
        // Key is crucial: when currentBanner changes, the motion.div content updates instantly, 
        // but the animation continues seamlessly.
        key={currentBanner.id + currentMessageIndex} 
      >
        {/* Repeat content blocks 7 times */}
        {[...Array(7)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
                "h-10 flex items-center bg-gradient-to-r from-red-600 to-pink-600",
                "min-w-[400px] justify-center",
                "rounded-xl mr-4"
            )}
          >
            {/* Render the single, current message content */}
            {messageContent}
            {/* Separator between repeating blocks */}
            <span className="mx-4 text-white/70">|</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DeliveryBanner;