"use client";

import React from "react";
import WarrantyHero from "@/components/warranty-page/WarrantyHero";
import WarrantyInfoCards from "@/components/warranty-page/WarrantyInfoCards";
import WarrantyCTA from "@/components/warranty-page/WarrantyCTA";

const Warranty = () => {
  return (
    <div className="min-h-screen w-full">
      <WarrantyHero />
      <WarrantyInfoCards />
      <WarrantyCTA />
    </div>
  );
};

export default Warranty;