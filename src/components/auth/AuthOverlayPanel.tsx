"use client";

import React from "react";
import { motion } from "framer-motion";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo";
import { Button } from "@/components/ui/button";

interface AuthOverlayPanelProps {
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
}

const AuthOverlayPanel: React.FC<AuthOverlayPanelProps> = ({ isActive, onToggleActive }) => {
  return (
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
          <Button
            onClick={() => onToggleActive(false)}
            className="ghost mt-5 bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
            id="signIn"
          >
            Sign In
          </Button>
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
          <Button
            onClick={() => onToggleActive(true)}
            className="ghost bg-transparent border-2 border-white text-white rounded-full text-xs font-bold py-3 px-11 tracking-wider uppercase hover:bg-white hover:text-secondary"
            id="signUp"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlayPanel;