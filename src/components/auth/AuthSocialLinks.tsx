"use client";

import React from "react";
import GoogleSignInButton from "./GoogleSignInButton";

const AuthSocialLinks = () => {
  return (
    <div className="flex justify-center space-x-2 my-5">
      <GoogleSignInButton />
    </div>
  );
};

export default AuthSocialLinks;