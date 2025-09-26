"use client";

import React from "react";
import ReturnsHero from "@/components/returns-page/ReturnsHero";
import ReturnsPolicyCards from "@/components/returns-page/ReturnsPolicyCards";
import ReturnsCTA from "@/components/returns-page/ReturnsCTA";

const Returns = () => {
  return (
    <div className="min-h-screen w-full">
      <ReturnsHero />
      <ReturnsPolicyCards />
      <ReturnsCTA />
    </div>
  );
};

export default Returns;