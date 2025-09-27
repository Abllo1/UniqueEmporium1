import { BatteryCharging, Wifi } from "lucide-react";
import { ProductDetails } from "../types";

export const gamingProWirelessMouse: ProductDetails = {
  id: "gaming-pro-wireless-mouse",
  name: "Gaming Pro Wireless Mouse",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 45000.00,
  originalPrice: 50000.00,
  discountPercentage: 10,
  rating: 4.7,
  reviewCount: 280,
  tag: "Gaming",
  tagVariant: "destructive",
  limitedStock: false,
  fullDescription: `Dominate the competition with the Gaming Pro Wireless Mouse. Featuring an ultra-fast optical sensor with up to 26,000 DPI, lightning-fast wireless connectivity, and a lightweight ergonomic design, it's built for precision and speed. Customizable RGB lighting and programmable buttons complete your gaming setup.`,
  keyFeatures: [
    "Ultra-fast optical sensor (up to 26,000 DPI)",
    "Lightning-fast wireless connectivity",
    "Lightweight ergonomic design",
    "Customizable RGB lighting",
    "Programmable buttons",
  ],
  applications: `Essential for competitive gamers and esports enthusiasts who demand extreme precision, speed, and comfort for peak performance.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Sensor", value: "Optical (26,000 DPI)" },
        { label: "Tracking Speed", value: "650 IPS" },
        { label: "Acceleration", value: "50G" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Wireless", value: "2.4GHz USB Receiver", icon: Wifi },
        { label: "Battery Life", value: "Up to 100 hours", icon: BatteryCharging },
      ],
    },
  ],
  reviews: [
    { id: "rev44", author: "EsportsChamp", rating: 5, date: "2024-01-20", title: "Best gaming mouse ever!", comment: "Super precise, no lag, and incredibly comfortable for long sessions.", isVerifiedBuyer: true },
    { id: "rev45", author: "CasualGamer", rating: 4, date: "2024-01-18", title: "Great, but a bit pricey", comment: "Fantastic performance, but it's a premium price for a mouse.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["gaming-beast-desktop-pc"],
  has3DModel: true,
  modelPath: "/models/gaming_pro_wireless_mouse.glb",
};