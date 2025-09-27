import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";
import { ProductDetails } from "../types";

export const cyberbookPro16: ProductDetails = {
  id: "cyberbook-pro-16",
  name: "CyberBook Pro 16",
  category: "Laptops",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 1500000.00,
  originalPrice: 1600000.00,
  discountPercentage: 6,
  rating: 4.9,
  reviewCount: 170,
  tag: "Creator",
  tagVariant: "destructive",
  limitedStock: false,
  fullDescription: `The CyberBook Pro 16 is a high-performance laptop built for creative professionals and power users. Featuring a stunning 16-inch Mini-LED display, Intel Core i9 processor, NVIDIA RTX 4070 graphics, and 32GB of RAM, it handles the most demanding tasks with ease. Its robust aluminum chassis and advanced cooling ensure sustained performance.`,
  keyFeatures: [
    "Stunning 16-inch Mini-LED display",
    "Intel Core i9 processor",
    "NVIDIA RTX 4070 graphics",
    "32GB RAM and 1TB SSD",
    "Robust aluminum chassis",
  ],
  applications: `Ideal for video editors, 3D artists, software developers, and gamers who require top-tier performance and a high-quality display for intensive creative and computing tasks.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Intel Core i9-13900H", icon: Cpu },
        { label: "RAM", value: "32GB DDR5", icon: MemoryStick },
        { label: "Storage", value: "1TB NVMe SSD", icon: HardDrive },
        { label: "Graphics", value: "NVIDIA GeForce RTX 4070" },
      ],
    },
    {
      group: "Display",
      items: [
        { label: "Size", value: "16-inch", icon: Monitor },
        { label: "Panel Type", value: "Mini-LED" },
        { label: "Resolution", value: "2560x1600" },
        { label: "Refresh Rate", value: "120Hz" },
      ],
    },
  ],
  reviews: [
    { id: "rev50", author: "ProEditor", rating: 5, date: "2024-02-05", title: "Unmatched performance for editing!", comment: "Handles 8K footage like a dream. The screen is incredible.", isVerifiedBuyer: true },
    { id: "rev51", author: "DeveloperX", rating: 5, date: "2024-02-01", title: "Powerful workstation", comment: "Compiles code super fast. Great for virtual machines and heavy development.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["zenbook-pro-14-oled"],
  has3DModel: true,
  modelPath: "/models/cyberbook_pro_16.glb",
};