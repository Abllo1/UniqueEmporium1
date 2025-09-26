"use client";

import HeroCarousel from "@/components/hero-carousel/HeroCarousel.tsx";
import HeroIntroBanner from "@/components/hero-intro-banner/HeroIntroBanner.tsx";
import CategoriesSection from "@/components/categories-section/CategoriesSection.tsx";
import ProductCard from "@/components/products/ProductCard.tsx";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, Easing } from "framer-motion";
import { HardDrive, MemoryStick, Cpu, Monitor, BatteryCharging } from "lucide-react"; // Import icons for specs

// Define the Product interface (copied from ProductCard.tsx for explicit typing)
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

// Placeholder product data
const featuredProducts: Product[] = [ // Explicitly type the array
  {
    id: "fp1",
    name: "ZenBook Pro 14 OLED",
    category: "Laptops",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 1899.00,
    originalPrice: 2199.00,
    discountPercentage: 13,
    rating: 4.8,
    reviews: 150,
    tag: "Best Seller",
    tagVariant: "destructive",
    stockStatus: "in-stock",
    isFavorite: false,
    specs: [
      { icon: Cpu, value: "Intel i7-12700H" },
      { icon: MemoryStick, value: "16GB RAM" },
      { icon: HardDrive, value: "1TB SSD" },
      { icon: Monitor, value: "14\" OLED" },
    ],
  },
  {
    id: "fp2",
    name: "SoundWave Max Headphones",
    category: "Audio",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 349.99,
    originalPrice: 399.99,
    discountPercentage: 12,
    rating: 4.5,
    reviews: 230,
    tag: "New Arrival",
    tagVariant: "default",
    stockStatus: "in-stock",
    isFavorite: true,
    specs: [
      { icon: BatteryCharging, value: "30h Battery" },
      { icon: Cpu, value: "ANC" },
      { icon: MemoryStick, value: "Bluetooth 5.2" },
    ],
  },
  {
    id: "fp3",
    name: "UltraView 32-inch Monitor",
    category: "Monitors",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 799.00,
    rating: 4.7,
    reviews: 95,
    stockStatus: "limited",
    isFavorite: false,
    specs: [
      { icon: Monitor, value: "32\" 4K UHD" },
      { icon: MemoryStick, value: "144Hz" },
      { icon: HardDrive, value: "HDR600" },
    ],
  },
  {
    id: "fp4",
    name: "ErgoGrip Wireless Mouse",
    category: "Accessories",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 59.99,
    rating: 4.6,
    reviews: 310,
    tag: "Top Rated",
    tagVariant: "secondary",
    stockStatus: "in-stock",
    isFavorite: false,
    specs: [
      { icon: BatteryCharging, value: "60h Battery" },
      { icon: Cpu, value: "Ergonomic" },
    ],
  },
  {
    id: "fp5",
    name: "SmartHome Hub Pro",
    category: "Smart Home",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 129.00,
    rating: 4.2,
    reviews: 80,
    stockStatus: "in-stock",
    isFavorite: false,
    specs: [
      { icon: Cpu, value: "AI Assistant" },
      { icon: MemoryStick, value: "Zigbee/Wi-Fi" },
    ],
  },
  {
    id: "fp6",
    name: "PowerCharge 100W GaN Charger",
    category: "Accessories",
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 49.99,
    originalPrice: 59.99,
    discountPercentage: 17,
    rating: 4.9,
    reviews: 450,
    tag: "Limited Stock",
    tagVariant: "destructive",
    stockStatus: "limited",
    isFavorite: false,
    specs: [
      { icon: BatteryCharging, value: "100W GaN" },
      { icon: Cpu, value: "USB-C PD" },
    ],
  },
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
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const Index = () => {
  return (
    <div className="relative min-h-screen w-full">
      <HeroCarousel />
      <HeroIntroBanner />
      <CategoriesSection />

      {/* Featured Products Section */}
      <section id="featured-products-section" className="py-16 bg-muted/30">
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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} disableEntryAnimation={true} />
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">Browse All Electronics</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;