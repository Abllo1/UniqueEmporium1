"use client";

import React from "react";
import ShippingHero from "@/components/shipping-page/ShippingHero";
import ShippingInfoCards from "@/components/shipping-page/ShippingInfoCards";
import ShippingCTA from "@/components/shipping-page/ShippingCTA";

const Shipping = () => {
  return (
    <div className="min-h-screen w-full">
      <ShippingHero />
      <ShippingInfoCards />
      <ShippingCTA />
    </div>
  );
};

export default Shipping;