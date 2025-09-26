"use client";

import React from "react";
import PrivacyHero from "@/components/privacy-page/PrivacyHero";
import PrivacyPolicyCards from "@/components/privacy-page/PrivacyPolicyCards";
import PrivacyCTA from "@/components/privacy-page/PrivacyCTA";

const Privacy = () => {
  return (
    <div className="min-h-screen w-full">
      <PrivacyHero />
      <PrivacyPolicyCards />
      <PrivacyCTA />
    </div>
  );
};

export default Privacy;