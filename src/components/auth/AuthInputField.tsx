"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputFieldProps {
  type: string;
  placeholder: string;
  Icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  type,
  placeholder,
  Icon,
  value,
  onChange,
  className,
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
        type={inputType}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className={`bg-gray-100 border-none rounded-full py-3 px-4 pr-10 w-full text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 hover:scale-[1.01] ${className}`}
      />
      {isPasswordInput && value ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : (
        Icon && (
          <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        )
      )}
    </div>
  );
};

export default AuthInputField;