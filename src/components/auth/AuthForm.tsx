"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Lock, Mail, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"; // Added Eye, EyeOff, ArrowLeft
import { useIsMobile } from "@/hooks/use-mobile";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "@/context/AuthContext.tsx"; // Import useAuth
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useSearchParams
import { supabase } from "@/integrations/supabase/client"; // Import supabase client
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo.tsx"; // Import the logo
import { Button } from "@/components/ui/button"; // Import Button for consistency

// Helper component for social links
const SocialLinks = () => (
  <div className="flex justify-center space-x-2 my-5">
    <GoogleSignInButton />
  </div>
);

// Helper component for input fields
interface InputFieldProps {
  type: string;
  placeholder: string;
  Icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Added className prop
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  Icon,
  value,
  onChange,
  className, // Destructure className
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordInput = type === "password";
  const inputType = isPasswordInput ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full my-2">
      <input
        type={inputType} // Use the dynamically determined type
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className={`bg-gray-100 border-none rounded-full py-3 px-4 pr-10 w-full text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 hover:scale-[1.01] ${className}`} // Apply className
      />
      {isPasswordInput && value ? ( // Only show eye icon if it's a password field and has a value
        <button
          type="button" // Important: prevent form submission
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : (
        Icon && ( // Render default icon if not a password field or no value
          <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        )
      )}
    </div>
  );
};

export default function AuthForm() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Initialize useSearchParams

  const [isActive, setIsActive] = useState(false); // Controls desktop sliding panel
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false); // For new password form submission

  // States for Sign In form
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // States for Sign Up form
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // States for Forgot Password flow
  const [showForgotPasswordInput, setShowForgotPasswordInput] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showSetNewPasswordForm, setShowSetNewPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const isMobile = useIsMobile();

  // Effect to check URL for password recovery parameters
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "recovery") {
      setShowSetNewPasswordForm(true);
      setShowForgotPasswordInput(false); // Ensure other forms are hidden
      setIsActive(false); // Ensure desktop sliding panel is in default state
      toast.info("Please set your new password.", { description: "You've been redirected from your password reset email." });
    } else {
      setShowSetNewPasswordForm(false);
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await signInWithEmail(signInEmail, signInPassword);
      // Redirection is now handled by CheckAuth and toast by AuthContext
    } catch (error) {
      // Error is already toasted by AuthContext, just handle loading state
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      await signUpWithEmail(signUpEmail, signUpPassword, signUpFirstName, signUpLastName);
      // Redirection is now handled by CheckAuth and toast by AuthContext
    } catch (error) {
      // Error is already toasted by AuthContext, just handle loading state
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPasswordInput(true);
    setForgotPasswordEmail(signInEmail); // Pre-fill with current sign-in email if available
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsResettingPassword(true);
    toast.loading("Sending password reset link...", { id: "password-reset-link" });
    const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
      redirectTo: `${window.location.origin}/auth?type=recovery`, // Redirect back to auth page with recovery type
    });

    if (error) {
      toast.dismiss("password-reset-link");
      toast.error("Password Reset Failed", { description: error.message });
    } else {
      toast.dismiss("password-reset-link");
      toast.success("Password Reset Email Sent!", {
        description: "Please check your email for instructions to reset your password.",
      });
      setShowForgotPasswordInput(false); // Hide the email input form
      setForgotPasswordEmail(""); // Clear email field
    }
    setIsResettingPassword(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      toast.error("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsResettingPassword(true);
    toast.loading("Updating password...", { id: "update-password" });

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.dismiss("update-password");
      toast.error("Failed to update password.", { description: error.message });
    } else {
      toast.dismiss("update-password");
      toast.success("Password updated successfully!", {
        description: "You can now sign in with your new password.",
      });
      // Clear fields and redirect to main login view
      setNewPassword("");
      setConfirmNewPassword("");
      setShowSetNewPasswordForm(false);
      navigate("/auth", { replace: true }); // Remove recovery params from URL
    }
    setIsResettingPassword(false);
  };

  // Render "Set New Password" form if type=recovery is in URL
  if (showSetNewPasswordForm) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-md min-h-[480px] flex flex-col justify-center items-center p-8 text-center">
        <UniqueEmporiumLogo className="h-[80px] w-auto mb-6" />
        <h1 className="font-bold text-xl text-foreground mb-4">Set Your New Password</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleUpdatePassword} className="flex flex-col w-full items-center">
          <InputField
            type="password"
            placeholder="New Password"
            Icon={Lock}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-2"
          />
          <InputField
            type="password"
            placeholder="Confirm New Password"
            Icon={Lock}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mb-4"
          />
          <Button
            type="submit"
            className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
            disabled={isResettingPassword}
          >
            {isResettingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : "Set Password"}
          </Button>
        </form>
      </div>
    );
  }

  // Render "Forgot Password" email input form
  if (showForgotPasswordInput) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-md min-h-[480px] flex flex-col justify-center items-center p-8 text-center">
        <UniqueEmporiumLogo className="h-[80px] w-auto mb-6" />
        <h1 className="font-bold text-xl text-foreground mb-4">Forgot Your Password?</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSendResetEmail} className="flex flex-col w-full items-center">
          <InputField
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
            onClick={() => setShowForgotPasswordInput(false)}
            className="mt-4 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
          </Button>
        </form>
      </div>
    );
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
          <form onSubmit={handleSignUp} className="flex flex-col p-8 h-full w-full justify-center items-center text-center">
            <h1 className="font-bold text-[19px] text-foreground">Create Your Unique Account</h1>
            <SocialLinks />
            <span className="text-xs mb-2 text-muted-foreground">
              Or use your email for registration
            </span>
            <div className="flex w-full gap-2">
              <InputField
                type="text"
                placeholder="First Name"
                Icon={User}
                value={signUpFirstName}
                onChange={(e) => setSignUpFirstName(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Surname"
                Icon={User}
                value={signUpLastName}
                onChange={(e) => setSignUpLastName(e.target.value)}
              />
            </div>
            <InputField
              type="email"
              placeholder="Email"
              Icon={Mail}
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Password"
              Icon={Lock}
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
              disabled={isSigningUp}
            >
              {isSigningUp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign-In Form */}
        <div
          className={`absolute left-0 w-full h-[65%] transition-all duration-1600 ease-in-out ${
            isActive ? "-top-full" : "top-0"
          }`}
        >
          <form onSubmit={handleSignIn} className="flex flex-col p-8 h-full w-full justify-center items-center text-center">
            <UniqueEmporiumLogo className="h-[60px] w-auto mb-[10px]" />
            <h1 className="font-bold text-[19px] text-foreground">Sign In to Your Emporium</h1>
            <SocialLinks />
            <span className="text-xs mb-2 text-muted-foreground">Or use your email account</span>
            <InputField
              type="email"
              placeholder="Email"
              Icon={Mail}
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Password"
              Icon={Lock}
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <a
              href="#"
              onClick={handleForgotPasswordClick} // Use the new handler
              className="text-sm text-primary my-4 hover:underline"
            >
              Forgot your password?
            </a>
            <button
              type="submit"
              className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
              disabled={isSigningIn}
            >
              {isSigningIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </button>
          </form>
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
              <button
                onClick={() => setIsActive(true)}
                className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Prompt (Bottom half) - Shown when Sign-Up form is active */}
            <div className="absolute top-1/2 left-0 w-full h-[50%] flex flex-col items-center justify-center text-center px-8 py-[0.4rem]">
              <UniqueEmporiumLogo className="h-16 w-auto mb-[10px]" />
              <h1 className="font-bold text-2xl">Welcome Back!</h1>
              <p className="text-sm font-light leading-5 tracking-wider my-4">
                Log in to manage your orders and explore new collections.
              </p>
              <button
                onClick={() => setIsActive(false)}
                className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
              >
                Sign In
              </button>
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
        <form onSubmit={handleSignUp} className="bg-white flex flex-col p-12 h-full justify-center items-center text-center">
          <UniqueEmporiumLogo className="h-[80px] w-auto mb-[10px]" />
          <h1 className="font-bold m-0 text-[19px] text-foreground">Create Your Unique Account</h1>
          <SocialLinks />
          <span className="text-xs mb-2 text-muted-foreground">
            Or use your Email for registration
          </span>
          <div className="flex w-full gap-2">
            <InputField
              type="text"
              placeholder="First Name"
              Icon={User}
              value={signUpFirstName}
              onChange={(e) => setSignUpFirstName(e.target.value)}
            />
            <InputField
              type="text"
              placeholder="Surname"
              Icon={User}
              value={signUpLastName}
              onChange={(e) => setSignUpLastName(e.target.value)}
            />
          </div>
          <InputField
            type="email"
            placeholder="Email"
            Icon={Mail}
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            Icon={Lock}
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
            disabled={isSigningUp}
          >
            {isSigningUp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </div>

      {/* SIGN IN CONTAINER (Login Form) */}
      <div
        className={`absolute top-0 h-full transition-all duration-1600 ease-in-out left-0 w-1/2 z-20 ${
          isActive ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <form onSubmit={handleSignIn} className="flex flex-col p-12 h-full justify-center items-center text-center">
          <UniqueEmporiumLogo className="h-[80px] w-auto mb-[10px]" />
          <h1 className="font-bold m-0 text-[19px] text-foreground">Sign In to Your Emporium</h1>
          <SocialLinks />
          <span className="text-xs mb-2 text-muted-foreground">Or sign in using E-Mail Address</span>
          <InputField
            type="email"
            placeholder="Email"
            Icon={Mail}
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            Icon={Lock}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
          />
          <a href="#" onClick={handleForgotPasswordClick} className="text-sm text-primary my-4 hover:underline">
            Forgot your password?
          </a>
          <button
            type="submit"
            className="rounded-full border border-secondary bg-secondary text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-secondary/80 disabled:opacity-50"
            disabled={isSigningIn}
          >
            {isSigningIn ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>

      {/* OVERLAY CONTAINER */}
      <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1600 ease-in-out z-[100] ${
          isActive ? "transform -translate-x-full" : "transform translate-x-0"
        }`}
      >
        <div
          className={`bg-gradient-to-r from-secondary to-secondary/80 bg-cover bg-no-repeat bg-center text-white relative left-[-100%] h-full w-[200%] transform transition-transform duration-1600 ease-in-out ${
            isActive ? "translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* OVERLAY LEFT (Sign In Prompt) */}
          <div
            className={`absolute top-0 flex flex-col justify-center items-center p-10 h-full w-1/2 text-center transform transition-transform duration-1600 ease-in-out ${
              isActive ? "translate-y-0" : "translate-y-[-20%]"
            }`}
          >
            <UniqueEmporiumLogo className="h-20 w-auto mb-[10px]" />
            <h1 className="font-bold m-0 text-3xl">Welcome Back!</h1>
            <p className="text-sm font-light leading-5 tracking-wider my-5">
              Log in to manage your orders and explore new collections.
            </p>
            <button
              onClick={() => setIsActive(false)}
              className="ghost mt-5 bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase transition duration-80 active:scale-95 focus:outline-none hover:bg-white hover:text-secondary"
              id="signIn"
            >
              Sign In
            </button>
          </div>

          {/* OVERLAY RIGHT (Sign Up Prompt) */}
          <div
            className={`absolute top-0 right-0 flex flex-col justify-center items-center p-10 h-full w-1/2 text-center transform transition-transform duration-1600 ease-in-out ${
              isActive ? "translate-y-[20%]" : "translate-y-0"
            }`}
          >
            <UniqueEmporiumLogo className="h-20 w-auto mb-[10px]" />
            <h1 className="font-bold m-0 text-3xl">Start Your Journey!</h1>
            <p className="text-sm font-light leading-5 tracking-wider my-5">
              Sign up if you still don't have an account to discover unique wholesale fashion.
            </p>
            <button
              onClick={() => setIsActive(true)}
              className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
              id="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}