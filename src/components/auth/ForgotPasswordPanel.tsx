"use client";

import React, { useState } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthInputField from "./AuthInputField";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ForgotPasswordPanelProps {
  onBackToSignIn: () => void;
  initialEmail?: string;
}

const ForgotPasswordPanel: React.FC<ForgotPasswordPanelProps> = ({ onBackToSignIn, initialEmail = "" }) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(initialEmail);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsResettingPassword(true);
    toast.loading("Sending password reset link...", { id: "password-reset-link" });
    const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
      redirectTo: `${window.location.origin}/auth?type=recovery`,
    });

    if (error) {
      toast.dismiss("password-reset-link");
      toast.error("Password Reset Failed", { description: error.message });
    } else {
      toast.dismiss("password-reset-link");
      toast.success("Password Reset Email Sent!", {
        description: "Please check your email for instructions to reset your password.",
      });
      onBackToSignIn(); // Go back to sign-in form after sending email
    }
    setIsResettingPassword(false);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-md min-h-[480px] flex flex-col justify-center items-center p-8 text-center">
      <UniqueEmporiumLogo className="h-[80px] w-auto mb-6" />
      <h1 className="font-bold text-xl text-foreground mb-4">Forgot Your Password?</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSendResetEmail} className="flex flex-col w-full items-center">
        <AuthInputField
          type="email"
          placeholder="Email"
          Icon={Mail}
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
          className="mb-4"
        />
        <Button
          type="submit"
          className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
          disabled={isResettingPassword}
        >
          {isResettingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
        </Button>
        <Button
          variant="link"
          onClick={onBackToSignIn}
          className="mt-4 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPanel;