"use client";

import HeroCarousel from "@/components/hero-carousel/HeroCarousel.tsx";
import HeroIntroBanner from "@/components/hero-intro-banner/HeroIntroBanner.tsx";
import CategoriesSection from "@/components/categories-section/CategoriesSection.tsx";
import ProductCard, { Product } from "@/components/products/ProductCard.tsx";
import WhyChooseUsSection from "@/components/why-choose-us/WhyChooseUsSection.tsx";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, Easing } from "framer-motion";
import { mockProducts, ProductDetails, getProductsByIds } from "@/data/products.ts"; // Import getProductsByIds
import RecentlyViewedProductsSection from "@/components/product-details/RecentlyViewedProductsSection.tsx"; // Import RecentlyViewedProductsSection
import TopSellingProductsSection from "@/components/top-selling-products/TopSellingProductsSection.tsx"; // Reverted to alias path
import React, { useEffect, useState, useRef } from "react"; // Import useEffect, useState, and useRef
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton.tsx"; // Import ProductCardSkeleton

// Select specific products from mockProducts to be featured
const featuredProductIds = [
  "zenbook-pro-14-oled",
  "soundwave-noise-cancelling-headphones",
  "ultrafast-1tb-external-ssd",
  "ergofit-wireless-keyboard",
  "smarthome-hub-pro",
  "powercharge-100w-gan-charger",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50, x: -50 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const RECENTLY_VIEWED_KEY = "recentlyViewedProducts";

const Index = () => {
  const [recentlyViewedProductIds, setRecentlyViewedProductIds] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true); // New loading state for featured products
  const featuredProductsRef = useRef<HTMLDivElement>(null); // Ref for the featured products section

  useEffect(() => {
    const storedViewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]") as string[];
    setRecentlyViewedProductIds(storedViewed);

    // Simulate loading for featured products
    setLoadingFeatured(true);
    const timer = setTimeout(() => {
      const fetchedFeatured = featuredProductIds
        .map(id => mockProducts.find(p => p.id === id))
        .filter((product): product is ProductDetails => product !== undefined);
      setFeaturedProducts(fetchedFeatured);
      setLoadingFeatured(false);
    }, 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  const actualRecentlyViewedProducts = getProductsByIds(recentlyViewedProductIds);

  // Function to scroll to the featured products section
  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen w-full">
      <HeroCarousel onScrollToFeatured={scrollToFeaturedProducts} />
      <HeroIntroBanner />
      <CategoriesSection />

      {/* Featured Products Section */}
      <section id="featured-products-section" ref={featuredProductsRef} className="py-16 bg-muted/30">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="font-poppins font-bold text-xl md:text-4xl text-foreground"
            variants={fadeInUp}
          >
            Featured Electronics
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground mt-2 mb-8 md:mb-12"
            variants={fadeInUp}
          >
            Discover our most popular laptops, gadgets, and accessories
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
            {loadingFeatured
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">Browse All Electronics</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Top Selling Products Section (on Home Page) */}
      <motion.div
        className="mt-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <TopSellingProductsSection />
      </motion.div>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Recently Viewed Products Section (on Home Page) */}
      <motion.div
        className="mt-16 mb-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <RecentlyViewedProductsSection products={actualRecentlyViewedProducts} />
      </motion.div>
    </div>
  );
};

export default Index;