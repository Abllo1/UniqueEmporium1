"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as z from "zod";

// Define the AdminUser interface based on your database structure
export interface AdminUser {
  id: string; // Supabase UUID
  custom_user_id: string; // Custom ID for display
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  status: "active" | "inactive";
  total_orders: number;
}

// Form Schema for Add/Edit User (moved here for shared use)
export const userFormSchema = z.object({
  id: z.string().optional(), // For editing (Supabase UUID)
  custom_user_id: z.string().optional(), // For display, not directly editable via form
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required").max(15, "Phone number is too long"),
  role: z.enum(["customer", "admin"]).default("customer"),
  status: z.enum(["active", "inactive"]).default("active"),
  password: z.string().optional(), // Optional for edit, but required for add (handled in onSubmit)
});

export type UserFormData = z.infer<typeof userFormSchema>;

interface UseAdminUsersResult {
  users: AdminUser[];
  isLoadingUsers: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterRole: string;
  setFilterRole: (role: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalFilteredUsersCount: number;
  usersPerPage: number;
  fetchUsers: () => Promise<void>;
  addUser: (data: UserFormData) => Promise<boolean>;
  updateUser: (id: string, data: UserFormData) => Promise<boolean>;
  deactivateUser: (id: string) => Promise<boolean>;
}

const USERS_PER_PAGE = 10;

export const useAdminUsers = (): UseAdminUsersResult => {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        custom_user_id,
        first_name,
        last_name,
        email,
        phone,
        role,
        status
      `)
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      toast.error("Failed to load users.", { description: profilesError.message });
      setAllUsers([]);
      setIsLoadingUsers(false);
      return;
    }

    const usersWithOrders: AdminUser[] = await Promise.all(
      profiles.map(async (profile: any) => {
        const { count: totalOrders, error: ordersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', profile.id);

        if (ordersError) {
          console.error(`Error fetching orders for user ${profile.id}:`, ordersError);
        }

        return {
          id: profile.id,
          custom_user_id: profile.custom_user_id || 'N/A',
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          phone: profile.phone,
          role: profile.role,
          status: profile.status,
          total_orders: totalOrders || 0,
        };
      })
    );
    setAllUsers(usersWithOrders);
    setIsLoadingUsers(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = allUsers;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm) ||
          user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.custom_user_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (user) => user.status === filterStatus
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter(
        (user) => user.role === filterRole
      );
    }

    return filtered;
  }, [allUsers, searchTerm, filterStatus, filterRole]);

  const totalFilteredUsersCount = filteredUsers.length;
  const totalPages = Math.ceil(totalFilteredUsersCount / USERS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, currentPage]);

  const addUser = useCallback(async (data: UserFormData): Promise<boolean> => {
    if (!data.password) {
      toast.error("Password is required for new users.");
      return false;
    }
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
    });

    if (authError) {
      toast.error("Failed to add user.", { description: authError.message });
      return false;
    }

    if (authData.user) {
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({
          phone: data.phone,
          role: data.role,
          status: data.status,
        })
        .eq('id', authData.user.id);

      if (profileUpdateError) {
        console.error("Error updating new user's profile after signup:", profileUpdateError);
        toast.error("User added, but failed to set profile details.", { description: profileUpdateError.message });
        return false;
      } else {
        toast.success(`User "${data.first_name} ${data.last_name}" added successfully!`);
        fetchUsers();
        return true;
      }
    }
    return false;
  }, [fetchUsers]);

  const updateUser = useCallback(async (id: string, data: UserFormData): Promise<boolean> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        role: data.role,
        status: data.status,
      })
      .eq('id', id);

    if (error) {
      toast.error("Failed to update user.", { description: error.message });
      return false;
    } else {
      toast.success(`User "${data.first_name} ${data.last_name}" updated successfully!`);
      fetchUsers();
      return true;
    }
  }, [fetchUsers]);

  const deactivateUser = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'inactive' })
      .eq('id', id);

    if (error) {
      toast.error("Failed to deactivate user.", { description: error.message });
      return false;
    } else {
      toast.info(`User ${id} deactivated.`);
      fetchUsers();
      return true;
    }
  }, [fetchUsers]);

  return {
    users: paginatedUsers,
    isLoadingUsers,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterRole,
    setFilterRole,
    currentPage,
    setCurrentPage,
    totalPages,
    totalFilteredUsersCount,
    usersPerPage: USERS_PER_PAGE,
    fetchUsers,
    addUser,
    updateUser,
    deactivateUser,
  };
};