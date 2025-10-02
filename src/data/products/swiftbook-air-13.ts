import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";
import { ProductDetails } from "../types";

export const swiftbookAir13: ProductDetails = {
  id: "swiftbook-air-13",
  name: "SwiftBook Air 13",
  category: "Laptops",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 680000.00,
  originalPrice: 720000.00,
  discountPercentage: 5,
  rating: 4.7,
  reviewCount: 190,
  tag: "Lightweight",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `The SwiftBook Air 13 is an ultra-portable laptop designed for on-the-go productivity. Weighing just 1.2kg, it features a vibrant 13.3-inch Full HD display, a powerful Intel Core i5 processor, and up to 12 hours of battery life. Perfect for students and professionals who need a reliable and lightweight companion.`,
  keyFeatures: [
    "Ultra-portable and lightweight design (1.2kg)",
    "Vibrant 13.3-inch Full HD display",
    "Intel Core i5 processor",
    "Up to 12 hours of battery life",
    "Fast SSD storage",
  ],
  applications: `Ideal for students, business travelers, and anyone needing a highly portable and efficient laptop for everyday tasks, web browsing, and light productivity.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Intel Core i5-1235U", icon: Cpu },
        { label: "RAM", value: "8GB LPDDR4X", icon: MemoryStick },
        { label: "Storage", value: "256GB NVMe SSD", icon: HardDrive },
        { label: "Graphics", value: "Intel Iris Xe Graphics" },
      ],
    },
    {
      group: "Display",
      items: [
        { label: "Size", value: "13.3-inch", icon: Monitor },
        { label: "Resolution", value: "Full HD (1920x1080)" },
      ],
    },
  ],
  reviews: [
    { id: "rev38", author: "StudentLife", rating: 5, date: "2024-01-05", title: "Perfect for university!", comment: "Lightweight, fast, and the battery lasts all day. Couldn't ask for more.", isVerifiedBuyer: true },
    { id: "rev39", author: "Traveler", rating: 4, date: "2024-01-01", title: "Great travel companion", comment: "Fits easily in my bag. Screen is good, but wish it was brighter outdoors.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["ultrafast-1tb-external-ssd"],
};