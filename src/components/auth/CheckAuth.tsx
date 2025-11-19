"use client";

import React, { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext.tsx"; // Corrected import path
import LoadingPage from "@/components/common/LoadingPage.tsx"; // Corrected import path
import { toast } from "sonner";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const { session, setAuthState, isLoading } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      if (!session) {
        // If no session, clear auth state and mark as not loading
        setAuthState(null, null);
        return;
      }

      // Fetch user profile from the 'profiles' table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('CheckAuth: Profile fetch error:', error);
        toast.error("Failed to load user profile.", { description: error.message });
        // Even if profile fetch fails, set the basic user from session
        setAuthState(session, session.user);
        return;
      }

      // Set the full auth state including profile data
      setAuthState(session, {
        ...session.user,
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.role,
      });
    };

    // Only run if session changes and we are still in a loading state
    // or if session is null and we need to clear state.
    // The `isLoading` from context will be true initially, and `setAuthState` will set it to false.
    if (session !== undefined) { // Ensure session is not `null` or `undefined` before attempting to load profile
      loadProfile();
    }
  }, [session, setAuthState]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}