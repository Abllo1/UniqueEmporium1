"use client";

import React from "react";
import CategoriesSection from "@/components/categories-section/CategoriesSection.tsx";
import SeoHelmet from "@/components/common/SeoHelmet.tsx";

const CategoriesPage = () => {
  return (
    <>
      <SeoHelmet
        title="Product Categories | Unique Emporium Wholesale Nigeria"
        description="Explore wholesale fashion categories in Nigeria. From SHEIN gowns to kidswear, vintage shirts, and curated bundles for resellers."
        canonicalUrl="https://uniqueemporium.com.ng/categories"
        ogTitle="Browse Product Categories | Unique Emporium"
        ogDescription="Wholesale fashion categories for resellers and boutique owners in Nigeria."
        ogUrl="https://uniqueemporium.com.ng/categories"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="Browse Product Categories | Unique Emporium"
        twitterDescription="SHEIN gowns, kidswear, vintage shirts, and curated bundles available in bulk."
      />
      <div className="min-h-screen w-full">
        <CategoriesSection />
      </div>
    </>
  );
};

export default CategoriesPage;