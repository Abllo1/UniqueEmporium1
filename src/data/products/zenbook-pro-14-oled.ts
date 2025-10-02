import { Cpu, MemoryStick, HardDrive, Monitor, Wifi, ShieldCheck } from "lucide-react";
import { ProductDetails } from "../types";

export const zenbookPro14Oled: ProductDetails = {
  id: "zenbook-pro-14-oled",
  name: "ZenBook Pro 14 OLED",
  category: "Laptops",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  price: 950000.00,
  originalPrice: 1000000.00,
  discountPercentage: 5,
  rating: 4.8,
  reviewCount: 150,
  tag: "Best Seller",
  tagVariant: "destructive",
  limitedStock: true,
  fullDescription: `The ZenBook Pro 14 OLED is a powerhouse designed for creative professionals. Featuring a stunning 14-inch 4K OLED display, it delivers vibrant colors and deep blacks, perfect for graphic design, video editing, and immersive entertainment. Powered by the latest Intel Core i7 processor and 16GB of RAM, it handles demanding tasks with ease. Its sleek, lightweight design makes it highly portable, while the long-lasting battery ensures you stay productive on the go. Experience unparalleled performance and visual brilliance.`,
  keyFeatures: [
    "Stunning 4K OLED display for vibrant visuals",
    "Powerful Intel Core i7 processor for demanding tasks",
    "Lightweight and portable design",
    "Long-lasting battery for on-the-go productivity",
    "NVIDIA GeForce RTX 3050 graphics for creative work and light gaming",
  ],
  applications: `Ideal for graphic designers, video editors, photographers, and anyone requiring high-performance computing with exceptional visual fidelity. Also suitable for students and professionals who need a powerful yet portable workstation.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Intel Core i7-12700H", icon: Cpu },
        { label: "RAM", value: "16GB DDR4", icon: MemoryStick },
        { label: "Storage", value: "512GB NVMe SSD", icon: HardDrive },
        { label: "Graphics", value: "NVIDIA GeForce RTX 3050" },
      ],
    },
    {
      group: "Display",
      items: [
        { label: "Size", value: "14-inch", icon: Monitor },
        { label: "Resolution", value: "4K OLED (3840x2400)" },
        { label: "Refresh Rate", value: "90Hz" },
        { label: "Brightness", value: "550 nits peak" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Wi-Fi", value: "Wi-Fi 6E", icon: Wifi },
        { label: "Bluetooth", value: "Bluetooth 5.2" },
        { label: "Ports", value: "2x Thunderbolt 4, 1x USB 3.2 Gen 2, HDMI 2.1, Audio Jack" },
      ],
    },
  ],
  reviews: [
    {
      id: "rev1",
      author: "Alice J.",
      rating: 5,
      date: "2023-10-26",
      title: "Absolutely stunning!",
      comment: "The OLED screen is breathtaking. Perfect for my design work. Performance is top-notch.",
      isVerifiedBuyer: true,
    },
    {
      id: "rev2",
      author: "Bob K.",
      rating: 4,
      date: "2023-10-20",
      title: "Great laptop, minor quibbles",
      comment: "Fast and powerful. Battery life is good, but could be better under heavy load. Still highly recommend.",
      isVerifiedBuyer: true,
    },
    {
      id: "rev25",
      author: "Carol S.",
      rating: 5,
      date: "2023-11-01",
      title: "Best laptop for creatives!",
      comment: "I've been using this for a month now, and it handles all my video editing projects without a hitch. The screen is a dream.",
      isVerifiedBuyer: true,
    },
  ],
  relatedProducts: ["soundwave-noise-cancelling-headphones", "ultrawide-monitor-32"],
};