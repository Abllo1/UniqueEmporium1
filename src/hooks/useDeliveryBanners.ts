"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DeliveryBannerMessage {
  id: string;
  message_type: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  priority: number;
  link_url: string | null;
  link_text: string | null;
  background_color: string | null;
  text_color: string | null;
  icon_name: string | null;
  created_at: string;
  updated_at: string;
}

interface UseDeliveryBannersResult {
  banners: DeliveryBannerMessage[];
  activeBanner: DeliveryBannerMessage | null;
  isLoading: boolean;
  fetchBanners: () => Promise<void>;
  addBanner: (data: Omit<DeliveryBannerMessage, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateBanner: (id: string, data: Partial<Omit<DeliveryBannerMessage, 'id' | 'created_at' | 'updated_at'>>) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;
}

export const useDeliveryBanners = (): UseDeliveryBannersResult => {
  const [banners, setBanners] = useState<DeliveryBannerMessage[]>([]);
  const [activeBanner, setActiveBanner] = useState<DeliveryBannerMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('delivery_banner_messages')
      .select('*')
      .order('priority', { ascending: false }) // Order by priority, highest first
      .order('created_at', { ascending: false }); // Then by newest

    if (error) {
      console.error("Error fetching delivery banners:", error);
      toast.error("Failed to load delivery banners.", { description: error.message });
      setBanners([]);
      setActiveBanner(null);
    } else {
      setBanners(data || []);

      // Determine the single active banner for public display
      const now = new Date();
      const currentActive = (data || []).find(banner =>
        banner.is_active &&
        (banner.start_date === null || new Date(banner.start_date) <= now) &&
        (banner.end_date === null || new Date(banner.end_date) >= now)
      );
      setActiveBanner(currentActive || null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const addBanner = useCallback(async (data: Omit<DeliveryBannerMessage, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    const { error } = await supabase
      .from('delivery_banner_messages')
      .insert([data]);

    if (error) {
      toast.error("Failed to add banner.", { description: error.message });
      return false;
    } else {
      toast.success("Banner added successfully!");
      fetchBanners();
      return true;
    }
  }, [fetchBanners]);

  const updateBanner = useCallback(async (id: string, data: Partial<Omit<DeliveryBannerMessage, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    const { error } = await supabase
      .from('delivery_banner_messages')
      .update(data)
      .eq('id', id);

    if (error) {
      toast.error("Failed to update banner.", { description: error.message });
      return false;
    } else {
      toast.success("Banner updated successfully!");
      fetchBanners();
      return true;
    }
  }, [fetchBanners]);

  const deleteBanner = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('delivery_banner_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete banner.", { description: error.message });
      return false;
    } else {
      toast.info("Banner deleted.");
      fetchBanners();
      return true;
    }
  }, [fetchBanners]);

  return {
    banners,
    activeBanner,
    isLoading,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
  };
};