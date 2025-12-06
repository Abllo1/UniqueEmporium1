"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as z from "zod";

// Define the DeliveryBannerMessage interface based on your database structure
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

// Form Schema for Add/Edit Banner Message
export const bannerFormSchema = z.object({
  id: z.string().optional(),
  message_type: z.string().min(1, "Message Type is required"),
  content: z.string().min(1, "Content is required").max(200, "Content cannot exceed 200 characters"),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
  priority: z.coerce.number().min(0).default(0),
  link_url: z.string().url("Invalid URL format").nullable().optional().or(z.literal("")),
  link_text: z.string().nullable().optional(),
  background_color: z.string().nullable().optional(),
  text_color: z.string().nullable().optional(),
  icon_name: z.string().nullable().optional(),
});

export type BannerFormData = z.infer<typeof bannerFormSchema>;

interface UseAdminBannersResult {
  banners: DeliveryBannerMessage[];
  isLoadingBanners: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalFilteredBannersCount: number;
  bannersPerPage: number;
  fetchBanners: () => Promise<void>;
  addBanner: (data: BannerFormData) => Promise<boolean>;
  updateBanner: (id: string, data: BannerFormData) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;
}

const BANNERS_PER_PAGE = 10;

export const useAdminBanners = (): UseAdminBannersResult => {
  const [allBanners, setAllBanners] = useState<DeliveryBannerMessage[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBanners = useCallback(async () => {
    setIsLoadingBanners(true);
    const { data, error } = await supabase
      .from('delivery_banner_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to load banner messages.", { description: error.message });
      setAllBanners([]);
    } else {
      setAllBanners(data || []);
    }
    setIsLoadingBanners(false);
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const filteredBanners = useMemo(() => {
    let filtered = allBanners;

    if (searchTerm) {
      filtered = filtered.filter(
        (banner) =>
          banner.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banner.message_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banner.link_text?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (banner) => banner.is_active === (filterStatus === "active")
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (banner) => banner.message_type === filterType
      );
    }

    return filtered;
  }, [allBanners, searchTerm, filterStatus, filterType]);

  const totalFilteredBannersCount = filteredBanners.length;
  const totalPages = Math.ceil(totalFilteredBannersCount / BANNERS_PER_PAGE);

  const paginatedBanners = useMemo(() => {
    const indexOfLastBanner = currentPage * BANNERS_PER_PAGE;
    const indexOfFirstBanner = indexOfLastBanner - BANNERS_PER_PAGE;
    return filteredBanners.slice(indexOfFirstBanner, indexOfLastBanner);
  }, [filteredBanners, currentPage]);

  const addBanner = useCallback(async (data: BannerFormData): Promise<boolean> => {
    const payload = {
      message_type: data.message_type,
      content: data.content,
      start_date: data.start_date ? new Date(data.start_date).toISOString() : null,
      end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
      is_active: data.is_active,
      priority: data.priority,
      link_url: data.link_url || null,
      link_text: data.link_text || null,
      background_color: data.background_color || null,
      text_color: data.text_color || null,
      icon_name: data.icon_name || null,
    };

    const { error } = await supabase
      .from('delivery_banner_messages')
      .insert([payload]);

    if (error) {
      toast.error("Failed to add banner message.", { description: error.message });
      return false;
    } else {
      toast.success(`Banner "${data.content}" added successfully!`);
      fetchBanners();
      return true;
    }
  }, [fetchBanners]);

  const updateBanner = useCallback(async (id: string, data: BannerFormData): Promise<boolean> => {
    const payload = {
      message_type: data.message_type,
      content: data.content,
      start_date: data.start_date ? new Date(data.start_date).toISOString() : null,
      end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
      is_active: data.is_active,
      priority: data.priority,
      link_url: data.link_url || null,
      link_text: data.link_text || null,
      background_color: data.background_color || null,
      text_color: data.text_color || null,
      icon_name: data.icon_name || null,
    };

    const { error } = await supabase
      .from('delivery_banner_messages')
      .update(payload)
      .eq('id', id);

    if (error) {
      toast.error("Failed to update banner message.", { description: error.message });
      return false;
    } else {
      toast.success(`Banner "${data.content}" updated successfully!`);
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
      toast.error("Failed to delete banner message.", { description: error.message });
      return false;
    } else {
      toast.info(`Banner message deleted.`);
      fetchBanners();
      return true;
    }
  }, [fetchBanners]);

  return {
    banners: paginatedBanners,
    isLoadingBanners,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterType,
    setFilterType,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFilteredBannersCount,
    bannersPerPage: BANNERS_PER_PAGE,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
  };
};