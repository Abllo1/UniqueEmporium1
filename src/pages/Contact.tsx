"use client";

import React from "react";
import ContactHero from "@/components/contact-page/ContactHero.tsx";
import ContactInfoCards from "@/components/contact-page/ContactInfoCards.tsx";
import ContactFormMap from "@/components/contact-page/ContactFormMap.tsx";

const Contact = () => {
  return (
    <div className="min-h-screen w-full">
      <ContactHero />
      <ContactInfoCards />
      <ContactFormMap />
    </div>
  );
};

export default Contact;