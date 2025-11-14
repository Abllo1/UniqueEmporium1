"use client";

import React, { useState, useEffect } from 'react';
import './GoogleSignInButton.css';

const GoogleSignInButton = () => {
  const [buttonState, setButtonState] = useState('');

  const handleClick = () => {
    // In a real app, this would trigger the Google OAuth flow.
    // For now, we just mark it as clicked.
    if (buttonState.includes('clicked')) return;
    setButtonState('clicked');
    
    // Simulate a brief loading state before resetting
    setTimeout(() => {
      setButtonState('');
    }, 1500);
  };

  const baseClasses = "firebaseui-idp-google flex items-center justify-center select-none p-3 px-5 bg-white border-0 rounded-full shadow-md outline-none overflow-hidden transform cursor-pointer";
  const textClasses = "firebaseui-idp-text ml-2 font-medium text-sm text-gray-600";

  return (
    <button
      className={`${baseClasses} ${buttonState}`}
      data-provider-id="google.com"
      onClick={handleClick}
    >
      <span className="firebaseui-idp-icon-wrapper h-[18px] w-[18px]">
        <img
          className="firebaseui-idp-icon h-full w-auto"
          alt=""
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        />
      </span>
      <span className={`${textClasses} hidden sm:inline-block`}>
        Sign in with Google
      </span>
      <span className={`${textClasses} inline-block sm:hidden`}>
        Google
      </span>
    </button>
  );
};

export default GoogleSignInButton;