"use client";

import React from "react";
import AboutHero from "../components/about-page/AboutHero.tsx";
import AboutStats from "../components/about-page/AboutStats.tsx";
import AboutStory from "../components/about-page/AboutStory.tsx";
import AboutValues from "../components/about-page/AboutValues.tsx";
import SeoHelmet from "@/components/common/SeoHelmet.tsx";

const About = () => {
  return (
    <div className="min-h-screen w-full">
      <SeoHelmet
        title="About Us | Unique Emporium Nigeria Wholesale Fashion"
        description="Learn about Unique Emporium, Nigeria’s trusted wholesale fashion hub. Serving resellers and boutique owners with quality bulk products."
        canonicalUrl="https://uniqueemporium.com.ng/about"
        ogTitle="About Unique Emporium | Wholesale Fashion in Nigeria"
        ogDescription="Discover our mission, values, and commitment to providing high-quality wholesale fashion for resellers and boutique owners."
        ogUrl="https://uniqueemporium.com.ng/about"
        twitterTitle="About Unique Emporium | Nigeria Wholesale Fashion"
        twitterDescription="Serving fashion entrepreneurs and resellers with premium wholesale products across Nigeria."
      />
      <AboutHero />
      <AboutStats />
      <AboutStory />
      {/* <AboutTeam /> - Removed */}
      <AboutValues />
    </div>
  );
};

export default About;