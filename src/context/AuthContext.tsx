"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface CustomUser extends User {
  first_name?: string;
  last_name?: string;
  role?: string;
}

interface AuthContextType {
  session: Session | null;
  user: CustomUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setAuthState: (session: Session | null, user: CustomUser | null) => void; // New function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Still managed here initially

  // New function to set all auth-related states
  const setAuthState = (newSession: Session | null, newUser: CustomUser | null) => {
    setSession(newSession);
    setUser(newUser);
    setIsAdmin(newUser?.role === 'admin');
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    // Fetch initial session
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      // isLoading will be set to false by CheckAuth once profile is loaded
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      // isLoading will be set to false by CheckAuth once profile is loaded
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Auth actions (signIn, signUp, signOut) remain here
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    const { data: { user: newUser }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    });

    if (error) {
      throw error;
    }
    return newUser;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAdmin,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        setAuthState,
      }}
    >
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