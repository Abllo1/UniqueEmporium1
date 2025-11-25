"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { Shirt, Baby, Gem, ShoppingBag, LucideIcon, ChevronLeft, ChevronRight } from "lucide-react"; // Added ChevronLeft, ChevronRight
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useCategories, Category } from "@/hooks/useCategories";
import useEmblaCarousel from "embla-carousel-react"; // Import useEmblaCarousel
import { Button } from "@/components/ui/button"; // Import Button

// Map category names to Lucide icons (fallback if no image)
const getCategoryIcon = (categoryName: string): LucideIcon => {
  const lowerName = categoryName.toLowerCase();
  if (lowerName.includes("kid") || lowerName.includes("child")) return Baby;
  if (lowerName.includes("men") || lowerName.includes("shirt")) return Shirt;
  if (lowerName.includes("amazon")) return ShoppingBag;
  if (lowerName.includes("shein") || lowerName.includes("gown")) return Shirt;
  return Gem; // Default icon
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as Easing } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50, x: -50 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const CategoriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const { categories, isLoading } = useCategories();
  const scrollSpeed = 1;

  // Embla Carousel setup for desktop/tablet navigation
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Conditionally create the list of categories to display
  const categoriesToDisplay = isMobile ? [...categories, ...categories] : categories;

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !isMobile || isLoading) {
      return;
    }

    let animationFrameId: number;
    let lastTimestamp: DOMHighResTimeStamp;

    const scroll = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > 16 && !isPaused) {
        scrollElement.scrollLeft += scrollSpeed;
        
        const singleSetWidth = scrollElement.scrollWidth / 2; 

        if (scrollElement.scrollLeft >= singleSetWidth) {
          scrollElement.scrollLeft = 0;
        }
        lastTimestamp = timestamp;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isMobile, scrollSpeed, isLoading]);

  if (isLoading) {
    return (
      <section className="relative py-[0.4rem] bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-4 rounded-3xl bg-primary/20">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; 
  }

  return (
    <section className="relative py-[0.4rem] bg-primary/10">
      <motion.div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
          "pt-6 pb-4 rounded-3xl bg-primary/20"
        )}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6"> {/* Wrapper for title and buttons */}
          <motion.h2
            className="font-poppins font-bold text-xl md:text-4xl text-foreground"
            variants={fadeInUp}
          >
            Explore Our Collections
          </motion.h2>
          {/* Navigation Buttons (visible only on md and up) */}
          {!isMobile && categories.length > 0 && ( // Only show buttons if not mobile and categories exist
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <motion.p
          className="text-sm text-muted-foreground mt-2 mb-8 md:mb-12"
          variants={fadeInUp}
        >
          Find the perfect style to express your uniqueness
        </motion.p>

        <motion.div
          className="flex overflow-x-auto whitespace-nowrap gap-2 pb-4 no-scrollbar
                     md:grid md:gap-4 md:grid-rows-2 md:grid-flow-col md:whitespace-normal"
          ref={isMobile ? scrollRef : emblaRef} // Use scrollRef for mobile, emblaRef for desktop
          onMouseEnter={() => isMobile && setIsPaused(true)}
          onMouseLeave={() => isMobile && setIsPaused(false)}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex md:grid md:grid-rows-2 md:grid-flow-col md:gap-4"> {/* Inner div for Embla/Grid */}
            {categoriesToDisplay.map((category, index) => {
              const IconComponent = getCategoryIcon(category.name);
              
              return (
                <motion.div
                  key={`${category.id}-${index}`}
                  variants={itemVariants}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0 min-w-[120px] md:w-[180px] md:min-w-[180px] lg:w-[200px] lg:min-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-md mb-3 bg-white flex items-center justify-center">
                      {category.image_url ? (
                        <ImageWithFallback
                          src={category.image_url}
                          alt={category.name}
                          containerClassName="w-full h-full object-cover"
                          fallbackLogoClassName="h-8 w-8"
                        />
                      ) : (
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                      )}
                    </div>
                    <p className="text-[10px] md:text-sm lg:text-sm font-bold text-gray-900 text-center mt-2 leading-tight">
                      {category.name.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {word}
                          {i < category.name.split(' ').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CategoriesSection;