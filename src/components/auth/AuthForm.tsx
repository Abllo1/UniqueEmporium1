"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

// Import new modular components
import AuthInputField from "./AuthInputField"; // Re-exporting from here for convenience
import AuthSocialLinks from "./AuthSocialLinks"; // Re-exporting from here for convenience
import SignInPanel from "./SignInPanel";
import SignUpPanel from "./SignUpPanel";
import ForgotPasswordPanel from "./ForgotPasswordPanel";
import SetNewPasswordPanel from "./SetNewPasswordPanel";
import AuthOverlayPanel from "./AuthOverlayPanel";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isActive, setIsActive] = useState(false); // Controls desktop sliding panel
  const [showForgotPasswordInput, setShowForgotPasswordInput] = useState(false);
  const [showSetNewPasswordForm, setShowSetNewPasswordForm] = useState(false);

  // State for pre-filling forgot password email
  const [prefillEmailForForgotPassword, setPrefillEmailForForgotPassword] = useState("");

  const isMobile = useIsMobile();

  // Effect to check URL for password recovery parameters
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "recovery") {
      setShowSetNewPasswordForm(true);
      setShowForgotPasswordInput(false);
      setIsActive(false);
      toast.info("Please set your new password.", { description: "You've been redirected from your password reset email." });
    } else {
      setShowSetNewPasswordForm(false);
    }
  }, [searchParams]);

  const handleForgotPasswordClick = (e: React.MouseEvent, emailToPrefill: string) => {
    e.preventDefault();
    setPrefillEmailForForgotPassword(emailToPrefill);
    setShowForgotPasswordInput(true);
  };

  const handleBackToSignIn = () => {
    setShowForgotPasswordInput(false);
    setPrefillEmailForForgotPassword("");
  };

  const handlePasswordUpdated = () => {
    setShowSetNewPasswordForm(false);
    // Any other cleanup or redirection can happen here, but SetNewPasswordPanel already navigates.
  };

  // Render "Set New Password" form if type=recovery is in URL
  if (showSetNewPasswordForm) {
    return <SetNewPasswordPanel onPasswordUpdated={handlePasswordUpdated} />;
  }

  // Render "Forgot Password" email input form
  if (showForgotPasswordInput) {
    return <ForgotPasswordPanel onBackToSignIn={handleBackToSignIn} initialEmail={prefillEmailForForgotPassword} />;
  }

  // Mobile View with vertical sliding prompt (default state)
  if (isMobile) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-md h-[650px]">
        {/* Sign-Up Form */}
        <div
          className={`absolute left-0 w-full h-[65%] transition-all duration-1600 ease-in-out ${
            isActive ? "bottom-0" : "-bottom-full"
          }`}
        >
          <SignUpPanel onTogglePanel={() => setIsActive(false)} />
        </div>

        {/* Sign-In Form */}
        <div
          className={`absolute left-0 w-full h-[65%] transition-all duration-1600 ease-in-out ${
            isActive ? "-top-full" : "top-0"
          }`}
        >
          <SignInPanel onForgotPasswordClick={(e) => handleForgotPasswordClick(e, "")} onTogglePanel={() => setIsActive(true)} />
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute left-0 w-full h-[35%] overflow-hidden z-10 transition-all duration-1600 ease-in-out ${
            isActive
              ? "bottom-[65%] rounded-b-[60px]"
              : "bottom-0 rounded-t-[60px]"
          }`}
        >
          <div
            className={`bg-gradient-to-b from-secondary to-secondary/80 text-white relative h-[200%] w-full transition-transform duration-1600 ease-in-out ${
              isActive
                ? "transform -translate-y-1/2"
                : "transform translate-y-0"
            }`}
          >
            {/* Sign Up Prompt (Top half) - Shown when Sign-In form is active */}
            <div className="absolute top-0 left-0 w-full h-[50%] flex flex-col items-center justify-center text-center px-8 py-[0.4rem]">
              <h1 className="font-bold text-2xl">Start Your Journey!</h1>
              <p className="text-sm font-light leading-5 tracking-wider my-4">
                Enter your details and discover unique wholesale fashion.
              </p>
              <Button
                onClick={() => setIsActive(true)}
                className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
              >
                Sign Up
              </Button>
            </div>

            {/* Sign In Prompt (Bottom half) - Shown when Sign-Up form is active */}
            <div className="absolute top-1/2 left-0 w-full h-[50%] flex flex-col items-center justify-center text-center px-8 py-[0.4rem]">
              <UniqueEmporiumLogo className="h-16 w-auto mb-[10px]" />
              <h1 className="font-bold text-2xl">Welcome Back!</h1>
              <p className="text-sm font-light leading-5 tracking-wider my-4">
                Log in to manage your orders and explore new collections.
              </p>
              <Button
                onClick={() => setIsActive(false)}
                className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop View (default state)
  return (
    <div
      className={`bg-white rounded-[90px] shadow-2xl relative overflow-hidden w-[768px] max-w-full min-h-[480px] transition-all duration-300`}
      style={{
        boxShadow:
          "30px 14px 28px rgba(0, 0, 5, .2), 0 10px 10px rgba(0, 0, 0, .2)",
        opacity: 0.95,
      }}
    >
      {/* SIGN UP CONTAINER (Registration Form) */}
      <div
        className={`absolute top-0 h-full transition-all duration-1600 ease-in-out left-0 w-1/2 z-10 ${
          isActive ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"
        }`}
      >
        <SignUpPanel />
      </div>

      {/* SIGN IN CONTAINER (Login Form) */}
      <div
        className={`absolute top-0 h-full transition-all duration-1600 ease-in-out left-0 w-1/2 z-20 ${
          isActive ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <SignInPanel onForgotPasswordClick={(e) => handleForgotPasswordClick(e, "")} />
      </div>

      {/* OVERLAY CONTAINER */}
      <AuthOverlayPanel isActive={isActive} onToggleActive={setIsActive} />
    </div>
  );
}