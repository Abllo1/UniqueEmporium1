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
          .select('first_name, last_name, role, custom_user_id, phone, status')
          .eq('id', currentSession.user.id)
          .single();

        if (!isMounted) return;

        if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
          console.error('Profile fetch error during auth change:', error);
          setAuthState(currentSession, { ...currentSession.user } as CustomUser);
        } else if (profile) {
          setAuthState(currentSession, {
            ...currentSession.user,
            first_name: profile.first_name,
            last_name: profile.last_name,
            role: profile.role,
            custom_user_id: profile.custom_user_id,
            phone: profile.phone,
            status: profile.status,
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
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName }
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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