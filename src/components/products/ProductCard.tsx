"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, Easing, RepeatType } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Scale, Loader2, HardDrive, MemoryStick, Cpu, Monitor, BatteryCharging } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import FloatingTag from "@/components/common/FloatingTag.tsx";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // Using sonner for toasts
import { Link } from "react-router-dom";

interface ProductSpec {
  icon: React.ElementType;
  value: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviews: number;
  tag?: string;
  tagVariant?: "default" | "secondary" | "destructive" | "outline";
  stockStatus?: "in-stock" | "limited" | "out-of-stock";
  isFavorite?: boolean;
  specs?: ProductSpec[];
}

interface ProductCardProps {
  product: Product;
  disableEntryAnimation?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const ProductCard = ({ product, disableEntryAnimation = false }: ProductCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(product.isFavorite || false);
  const [isComparing, setIsComparing] = useState(false); // Placeholder for comparison state

  const specsScrollRef = useRef<HTMLDivElement>(null);
  const specsScrollAnimationRef = useRef<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll for specs on hover (desktop only)
  useEffect(() => {
    const scrollElement = specsScrollRef.current;
    if (!scrollElement) return;

    let animationFrameId: number;
    let lastTimestamp: DOMHighResTimeStamp;

    const scroll = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > 16) { // Roughly 60fps
        scrollElement.scrollLeft += 1; // Adjust scroll speed here
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
          scrollElement.scrollLeft = 0; // Loop back to start
        }
        lastTimestamp = timestamp;
      }
      specsScrollAnimationRef.current = requestAnimationFrame(scroll);
    };

    if (hovered) {
      specsScrollAnimationRef.current = requestAnimationFrame(scroll);
    } else {
      if (specsScrollAnimationRef.current) {
        cancelAnimationFrame(specsScrollAnimationRef.current);
      }
      scrollElement.scrollLeft = 0; // Reset scroll position when not hovered
    }

    return () => {
      if (specsScrollAnimationRef.current) {
        cancelAnimationFrame(specsScrollAnimationRef.current);
      }
    };
  }, [hovered]);


  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if card is a link
    e.stopPropagation(); // Stop event from bubbling to parent Link
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`${product.name} added to cart!`);
    setIsAddingToCart(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
    toast.info(isFavorited ? `${product.name} removed from favorites.` : `${product.name} added to favorites!`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsComparing((prev) => !prev);
    if (!isComparing) {
      toast.info(`${product.name} added to comparison.`);
      // Add logic to check comparison limit
      // if (comparisonList.length >= 3) { toast.warning("Comparison limit reached (3 products)."); }
    } else {
      toast.info(`${product.name} removed from comparison.`);
    }
  };

  const discountBadge = product.originalPrice && product.discountPercentage ? (
    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
      {product.discountPercentage}% OFF
    </span>
  ) : null;

  return (
    <motion.div
      variants={disableEntryAnimation ? {} : fadeInUp}
      initial={disableEntryAnimation ? null : "hidden"}
      whileInView={disableEntryAnimation ? null : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <motion.div // Wrapped Card with motion.div
          className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300"
          whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)" }}
        >
          <Card> {/* Card component is now inside motion.div */}
            {product.tag && (
              <FloatingTag text={product.tag} variant={product.tagVariant} className="absolute -right-2 -top-2 z-20" />
            )}

            {/* Product Image Carousel */}
            <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-muted">
              <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container flex h-full">
                  {product.images.map((image, index) => (
                    <div className="embla__slide relative flex-none" key={index}>
                      <motion.img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Overlay */}
              {product.rating > 0 && (
                <div className="absolute right-3 top-3 z-10 flex items-center rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {product.rating.toFixed(1)}
                </div>
              )}

              {/* Image Dots Indicator */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 space-x-1">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full bg-white/50 transition-colors duration-200",
                        index === selectedIndex && "bg-white",
                      )}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); emblaApi && emblaApi.scrollTo(index); }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows (Desktop Only) */}
              {product.images.length > 1 && (
                <AnimatePresence>
                  {hovered && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:flex"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollPrev(); }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:flex"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollNext(); }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>
              )}

              {/* Mobile Action Buttons (Always Visible on Mobile) */}
              <div className="absolute bottom-2 left-2 z-10 flex gap-2 md:hidden">
                <Button variant="secondary" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
                  <Heart className={cn("h-4 w-4", isFavorited && "fill-red-500 text-red-500")} />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8" onClick={handleCompare}>
                  <Scale className={cn("h-4 w-4", isComparing && "fill-blue-500 text-blue-500")} />
                </Button>
              </div>
              <Button
                className="absolute bottom-2 right-2 z-10 h-8 px-3 text-xs md:hidden"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                Add
              </Button>

              {/* Hover Overlay (Desktop Only) */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-10 hidden items-center justify-center gap-2 bg-primary/80 md:flex"
                  >
                    <Button onClick={handleAddToCart} disabled={isAddingToCart}>
                      {isAddingToCart ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                      Add to Cart
                    </Button>
                    <Button variant="secondary" onClick={handleCompare}>
                      <Scale className="mr-2 h-4 w-4" /> Compare
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Product Information Section */}
            <CardContent className="flex flex-grow flex-col p-4">
              <p className="text-[0.55rem] uppercase text-muted-foreground">{product.category}</p>
              <h3 className="font-poppins line-clamp-2 text-sm font-semibold text-card-foreground transition-colors duration-200 group-hover:text-primary">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-baseline">
                  <p className="font-bold text-base text-primary">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <p className="ml-2 text-xs text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  )}
                  {discountBadge}
                </div>
                {product.stockStatus === "limited" && (
                  <p className="hidden text-xs font-medium text-red-500 md:block">Limited Stock!</p>
                )}
              </div>
            </CardContent>

            {/* Horizontal Scrolling Specifications Section */}
            {product.specs && product.specs.length > 0 && (
              <div
                ref={specsScrollRef}
                className="flex flex-shrink-0 overflow-x-auto no-scrollbar rounded-b-2xl border-t border-border bg-muted/50 py-3 px-2"
              >
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex flex-shrink-0 items-center whitespace-nowrap px-3 text-xs text-muted-foreground">
                    <spec.icon className="mr-1 h-3 w-3" />
                    {spec.value}
                  </div>
                ))}
              </div>
            )}

            {/* Footer Actions (View Details & Favorites) */}
            <CardFooter className="flex items-center justify-between p-4 pt-2">
              <span className="hidden text-sm text-primary transition-colors duration-200 group-hover:text-accent md:inline-flex">
                View Details &rarr;
              </span>
              <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
                <Heart className={cn("h-4 w-4", isFavorited && "fill-red-500 text-red-500")} />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;