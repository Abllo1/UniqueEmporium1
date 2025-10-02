import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";
import { ProductDetails } from "../types";

export const surfacePro9: ProductDetails = {
  id: "surface-pro-9",
  name: "Surface Pro 9",
  category: "Tablets",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 780000.00,
  originalPrice: 850000.00,
  discountPercentage: 8,
  rating: 4.6,
  reviewCount: 120,
  tag: "Productivity",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `The Surface Pro 9 is a versatile 2-in-1 device that combines the power of a laptop with the flexibility of a tablet. Featuring a stunning PixelSense display, it's perfect for work, creativity, and entertainment. Powered by the latest Intel Evo platform, it delivers fast performance and all-day battery life.`,
  keyFeatures: [
    "Versatile 2-in-1 design",
    "High-resolution PixelSense display",
    "Powerful Intel Evo platform",
    "All-day battery life",
    "Optional Surface Slim Pen 2 and Keyboard",
  ],
  applications: `Ideal for students, professionals, and artists who need a portable device for note-taking, drawing, presentations, and general computing tasks.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Intel Core i5/i7 Evo", icon: Cpu },
        { label: "RAM", value: "8GB/16GB LPDDR5", icon: MemoryStick },
        { label: "Storage", value: "256GB/512GB SSD", icon: HardDrive },
        { label: "Graphics", value: "Intel Iris Xe Graphics" },
      ],
    },
    {
      group: "Display",
      items: [
        { label: "Size", value: "13-inch", icon: Monitor },
        { label: "Resolution", value: "2880x1920" },
        { label: "Refresh Rate", value: "120Hz" },
        { label: "Touch", value: "10-point multi-touch" },
      ],
    },
  ],
  reviews: [
    { id: "rev26", author: "David L.", rating: 5, date: "2023-12-01", title: "Amazing versatility!", comment: "Perfect for my hybrid work setup. Love the pen input.", isVerifiedBuyer: true },
    { id: "rev27", author: "Sarah M.", rating: 4, date: "2023-11-25", title: "Great, but accessories are pricey", comment: "The device itself is fantastic, but the keyboard and pen add up.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["ergogrip-wireless-mouse"],
};