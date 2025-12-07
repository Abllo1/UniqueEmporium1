"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthInputField from "./AuthInputField";
import AuthSocialLinks from "./AuthSocialLinks";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { useAuth } from "@/context/AuthContext";

interface SignUpPanelProps {
  onTogglePanel?: () => void; // For mobile view to switch to sign in
}

const SignUpPanel: React.FC<SignUpPanelProps> = ({ onTogglePanel }) => {
  const { signUpWithEmail } = useAuth();
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      await signUpWithEmail(signUpEmail, signUpPassword, signUpFirstName, signUpLastName);
    } catch (error) {
      // Error is already toasted by AuthContext
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col p-8 h-full w-full justify-center items-center text-center">
      <UniqueEmporiumLogo className="h-[60px] w-auto mb-[10px] md:h-[80px]" />
      <h1 className="font-bold text-[19px] text-foreground">Create Your Unique Account</h1>
      <AuthSocialLinks />
      <span className="text-xs mb-2 text-muted-foreground">
        Or use your email for registration
      </span>
      <div className="flex w-full gap-2">
        <AuthInputField
          type="text"
          placeholder="First Name"
          Icon={User}
          value={signUpFirstName}
          onChange={(e) => setSignUpFirstName(e.target.value)}
        />
        <AuthInputField
          type="text"
          placeholder="Surname"
          Icon={User}
          value={signUpLastName}
          onChange={(e) => setSignUpLastName(e.target.value)}
        />
      </div>
      <AuthInputField
        type="email"
        placeholder="Email"
        Icon={Mail}
        value={signUpEmail}
        onChange={(e) => setSignUpEmail(e.target.value)}
      />
      <AuthInputField
        type="password"
        placeholder="Password"
        Icon={Lock}
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="mt-4 rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
        disabled={isSigningUp}
      >
        {isSigningUp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
      </Button>
      {onTogglePanel && ( // Only show on mobile
        <Button variant="link" onClick={onTogglePanel} className="mt-4 text-sm text-primary hover:underline md:hidden">
          Already have an account? Sign In
        </Button>
      )}
    </form>
  );
};

export default SignUpPanel;