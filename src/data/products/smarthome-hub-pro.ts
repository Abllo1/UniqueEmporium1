import { Wifi, ShieldCheck } from "lucide-react";
import { ProductDetails } from "../types";

export const smarthomeHubPro: ProductDetails = {
  id: "smarthome-hub-pro",
  name: "SmartHome Hub Pro",
  category: "Smart Home",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 65000.00,
  rating: 4.2,
  reviewCount: 80,
  tag: undefined,
  tagVariant: undefined,
  limitedStock: true,
  fullDescription: `The SmartHome Hub Pro is the central brain for your connected home. Seamlessly integrate and control all your smart devices, from lighting and thermostats to security cameras and door locks, all from one intuitive app. Compatible with multiple protocols like Zigbee, Z-Wave, and Wi-Fi, it offers unparalleled flexibility. Enjoy advanced automation, voice assistant integration (Alexa, Google Assistant), and robust security features to keep your home safe and smart.`,
  keyFeatures: [
    "Centralized control for all smart devices",
    "Multi-protocol compatibility (Zigbee, Z-Wave, Wi-Fi)",
    "Advanced automation and customizable routines",
    "Voice assistant integration (Alexa, Google Assistant)",
    "Robust security features with AES-128 encryption",
  ],
  applications: `Essential for building a comprehensive smart home ecosystem. Ideal for homeowners looking to automate lighting, climate, security, and entertainment systems, enhancing convenience, energy efficiency, and peace of mind.`,
  detailedSpecs: [
    {
      group: "Connectivity",
      items: [
        { label: "Protocols", value: "Wi-Fi, Zigbee, Z-Wave, Bluetooth", icon: Wifi },
        { label: "Ethernet", value: "1x Gigabit Ethernet" },
      ],
    },
    {
      group: "Features",
      items: [
        { label: "Voice Assistants", value: "Amazon Alexa, Google Assistant" },
        { label: "Automation", value: "Customizable routines" },
        { label: "Security", value: "AES-128 Encryption", icon: ShieldCheck },
      ],
    },
  ],
  reviews: [
    {
      id: "rev9",
      author: "Kevin L.",
      rating: 4,
      date: "2023-09-28",
      title: "Solid hub, easy setup",
      comment: "Works well with all my devices. Setup was surprisingly simple. A few minor bugs, but updates are frequent.",
      isVerifiedBuyer: true,
    },
    {
      id: "rev10",
      author: "Mia N.",
      rating: 3,
      date: "2023-09-20",
      title: "Good potential, needs refinement",
      comment: "It's powerful, but the app can be a bit slow sometimes. Hoping for performance improvements.",
      isVerifiedBuyer: false,
    },
  ],
  relatedProducts: ["echo-dot-5th-gen"],
  has3DModel: true,
  modelPath: "/models/smarthome_hub_pro.glb",
};