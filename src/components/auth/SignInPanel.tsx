"use client";

import React, { useState } from "react";
import { Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthInputField from "./AuthInputField";
import AuthSocialLinks from "./AuthSocialLinks";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { useAuth } from "@/context/AuthContext";

interface SignInPanelProps {
  onForgotPasswordClick: (e: React.MouseEvent) => void;
  onTogglePanel?: () => void; // For mobile view to switch to sign up
}

const SignInPanel: React.FC<SignInPanelProps> = ({ onForgotPasswordClick, onTogglePanel }) => {
  const { signInWithEmail } = useAuth();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await signInWithEmail(signInEmail, signInPassword);
    } catch (error) {
      // Error is already toasted by AuthContext
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col p-8 h-full w-full justify-center items-center text-center">
      <UniqueEmporiumLogo className="h-[60px] w-auto mb-[10px] md:h-[80px]" />
      <h1 className="font-bold text-[19px] text-foreground">Sign In to Your Emporium</h1>
      <AuthSocialLinks />
      <span className="text-xs mb-2 text-muted-foreground">Or sign in using E-Mail Address</span>
      <AuthInputField
        type="email"
        placeholder="Email"
        Icon={Mail}
        value={signInEmail}
        onChange={(e) => setSignInEmail(e.target.value)}
      />
      <AuthInputField
        type="password"
        placeholder="Password"
        Icon={Lock}
        value={signInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
      />
      <a
        href="#"
        onClick={onForgotPasswordClick}
        className="text-sm text-primary my-4 hover:underline"
      >
        Forgot your password?
      </a>
      <Button
        type="submit"
        className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
        disabled={isSigningIn}
      >
        {isSigningIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
      </Button>
      {onTogglePanel && ( // Only show on mobile
        <Button variant="link" onClick={onTogglePanel} className="mt-4 text-sm text-primary hover:underline md:hidden">
          Don't have an account? Sign Up
        </Button>
      )}
    </form>
  );
};

export default SignInPanel;