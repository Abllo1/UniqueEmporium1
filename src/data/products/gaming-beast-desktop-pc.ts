import { Cpu, MemoryStick, HardDrive } from "lucide-react";
import { ProductDetails } from "../types";

export const gamingBeastDesktopPc: ProductDetails = {
  id: "gaming-beast-desktop-pc",
  name: "Gaming Beast Desktop PC",
  category: "Laptops", // Assuming 'Laptops' is a broad category for high-performance computing
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 1800000.00,
  originalPrice: 2000000.00,
  discountPercentage: 10,
  rating: 4.9,
  reviewCount: 250,
  tag: "Gaming",
  tagVariant: "destructive",
  limitedStock: false,
  fullDescription: `Unleash the ultimate gaming experience with the Gaming Beast Desktop PC. Equipped with a powerful Intel i9 processor and NVIDIA GeForce RTX 4090 graphics, it delivers unparalleled performance for the most demanding games and creative applications. Liquid-cooled and housed in a sleek, RGB-lit chassis, this PC is built for extreme performance and aesthetics.`,
  keyFeatures: [
    "Intel Core i9-14900K Processor",
    "NVIDIA GeForce RTX 4090 Graphics Card",
    "32GB DDR5 RAM",
    "2TB NVMe SSD Storage",
    "Advanced Liquid Cooling System",
  ],
  applications: `Designed for hardcore gamers, esports enthusiasts, streamers, and professionals who require top-tier performance for gaming, 3D rendering, video editing, and other resource-intensive tasks.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { icon: Cpu, label: "CPU", value: "Intel Core i9-14900K" },
        { icon: MemoryStick, label: "RAM", value: "32GB DDR5-6000" },
        { icon: HardDrive, label: "Storage", value: "2TB NVMe SSD" },
        { label: "Graphics", value: "NVIDIA GeForce RTX 4090" },
      ],
    },
    {
      group: "Cooling",
      items: [
        { label: "CPU Cooler", value: "360mm AIO Liquid Cooler" },
        { label: "Case Fans", value: "6x RGB Fans" },
      ],
    },
  ],
  reviews: [
    { id: "rev34", author: "GamerPro", rating: 5, date: "2023-12-20", title: "Absolute powerhouse!", comment: "Runs every game at max settings without breaking a sweat. Worth every penny!", isVerifiedBuyer: true },
    { id: "rev35", author: "TechGuru", rating: 5, date: "2023-12-18", title: "Stunning performance and looks", comment: "Not just powerful, but also looks incredible with the RGB lighting.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["prodisplay-xdr", "gaming-pro-wireless-mouse"],
};