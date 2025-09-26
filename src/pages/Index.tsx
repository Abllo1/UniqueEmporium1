"use client";

import HeroCarousel from "@/components/hero-carousel/HeroCarousel.tsx";
import HeroIntroBanner from "@/components/hero-intro-banner/HeroIntroBanner.tsx";
import CategoriesSection from "@/components/categories-section/CategoriesSection.tsx"; // Re-adding .tsx extension

const Index = () => {
  return (
    <div className="relative min-h-screen w-full">
      <HeroCarousel />
      <HeroIntroBanner />
      <CategoriesSection />
      {/* Placeholder for the "Featured Products" section that the CTA button scrolls to */}
      <section id="featured-products" className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our latest and greatest offerings.
          </p>
          {/* Add your product cards or other content here */}
        </div>
      </section>
    </div>
  );
};

export default Index;