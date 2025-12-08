"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CustomUser extends User {
  first_name?: string;
  last_name?: string;
  role?: string;
  custom_user_id?: string;
  phone?: string;
  status?: string;
  avatar_url?: string; // NEW: Add avatar_url to CustomUser interface
}

interface AuthContextType {
  session: Session | null;
  user: CustomUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  setAuthState: (session: Session | null, user: CustomUser | null) => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const setAuthState = (newSession: Session | null, newUser: CustomUser | null) => {
    setSession(newSession);
    setUser(newUser);
    setIsAdmin(newUser?.role === 'admin');
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const handleAuthChange = async (currentSession: Session | null) => {
      if (!isMounted) return;

      if (currentSession) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, role, custom_user_id, phone, status, avatar_url') // NEW: Select avatar_url
          .eq('id', currentSession.user.id)
          .single();

        if (!isMounted) return;

        const userMetadata = currentSession.user.user_metadata;
        let profileToUpdate = { ...profile }; // Start with fetched profile or empty object

        // If profile exists, check for updates from OAuth metadata.
        if (profile) {
            let needsUpdate = false;
            const updatePayload: { [key: string]: any } = {};

            // Check first_name
            const oauthFirstName = userMetadata?.first_name || (userMetadata?.full_name?.split(' ')[0]);
            if (oauthFirstName && profile.first_name !== oauthFirstName) {
                updatePayload.first_name = oauthFirstName;
                needsUpdate = true;
            }

            // Check last_name
            const oauthLastName = userMetadata?.last_name || (userMetadata?.full_name?.split(' ').slice(1).join(' '));
            if (oauthLastName && profile.last_name !== oauthLastName) {
                updatePayload.last_name = oauthLastName;
                needsUpdate = true;
            }

            // Check avatar_url
            const oauthAvatarUrl = userMetadata?.avatar_url;
            if (oauthAvatarUrl && profile.avatar_url !== oauthAvatarUrl) {
                updatePayload.avatar_url = oauthAvatarUrl;
                needsUpdate = true;
            }

            if (needsUpdate) {
                const { data: updatedProfile, error: updateError } = await supabase
                    .from('profiles')
                    .update(updatePayload)
                    .eq('id', currentSession.user.id)
                    .select('first_name, last_name, role, custom_user_id, phone, status, avatar_url') // Select avatar_url
                    .single();

                if (updateError) {
                    console.error('Error updating profile with OAuth data:', updateError);
                    toast.error("Failed to update profile with new OAuth data.");
                } else if (updatedProfile) {
                    profileToUpdate = updatedProfile;
                    console.log("Profile updated with OAuth data.");
                }
            }
        }

        if (error && error.code !== 'PGRST116') {
            console.error('Profile fetch error during auth change:', error);
            setAuthState(currentSession, { ...currentSession.user } as CustomUser);
        } else if (profileToUpdate) {
            setAuthState(currentSession, {
                ...currentSession.user,
                first_name: profileToUpdate.first_name,
                last_name: profileToUpdate.last_name,
                role: profileToUpdate.role,
                custom_user_id: profileToUpdate.custom_user_id,
                phone: profileToUpdate.phone,
                status: profileToUpdate.status,
                avatar_url: profileToUpdate.avatar_url, // NEW: Include avatar_url in AuthContext user state
            });
        } else {
            setAuthState(currentSession, { ...currentSession.user } as CustomUser);
        }
      } else {
        setAuthState(null, null);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) handleAuthChange(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Sign In Failed", { description: error.message });
      throw error; // Re-throw to allow AuthForm to handle loading state
    } else {
      toast.success("Signed in successfully!", { description: "Welcome back to Unique Emporium!" });
    }
  };

  const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName }
      }
    });
    if (error) {
      toast.error("Sign Up Failed", { description: error.message });
      throw error; // Re-throw to allow AuthForm to handle loading state
    } else {
      toast.success("Account created!", { description: "Please check your email to confirm your account, then sign in." });
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Sign Out Failed", { description: error.message });
      throw error;
    } else {
      toast.info("You have been signed out.", { description: "See you again soon!" });
    }
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      isAdmin,
      isLoading,
      setAuthState,
      signInWithEmail,
      signUpWithEmail,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};