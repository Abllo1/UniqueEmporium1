import { Monitor } from "lucide-react";
import { ProductDetails } from "../types";

export const prodisplayXdr: ProductDetails = {
  id: "prodisplay-xdr",
  name: "ProDisplay XDR",
  category: "Monitors",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 2500000.00,
  rating: 4.9,
  reviewCount: 90,
  tag: "Professional",
  tagVariant: "destructive",
  limitedStock: true,
  fullDescription: `The ProDisplay XDR is a groundbreaking 32-inch Retina 6K display designed for professional workflows. With extreme dynamic range (XDR), stunning brightness, and incredible contrast, it delivers an unparalleled viewing experience for color-critical work.`,
  keyFeatures: [
    "32-inch Retina 6K display",
    "Extreme Dynamic Range (XDR)",
    "1,000,000:1 contrast ratio",
    "P3 wide color gamut",
    "Thunderbolt 3 connectivity",
  ],
  applications: `Essential for video editors, graphic designers, photographers, and developers who require the highest color accuracy and resolution for their professional work.`,
  detailedSpecs: [
    {
      group: "Display",
      items: [
        { label: "Size", value: "32-inch", icon: Monitor },
        { label: "Resolution", value: "6016x3384 (6K)" },
        { label: "Brightness", value: "1000 nits sustained, 1600 nits peak" },
        { label: "Color Gamut", value: "P3 wide color" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Thunderbolt", value: "1x Thunderbolt 3" },
        { label: "USB-C", value: "3x USB-C" },
      ],
    },
  ],
  reviews: [
    { id: "rev32", author: "Alex G.", rating: 5, date: "2023-12-15", title: "The best display I've ever used!", comment: "Unbelievable color accuracy and brightness. A game-changer for my studio.", isVerifiedBuyer: true },
    { id: "rev33", author: "Sophie H.", rating: 4, date: "2023-12-10", title: "Expensive, but worth it for pros", comment: "The price is steep, but the quality is unmatched for professional work.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["zenbook-pro-14-oled"],
  has3DModel: true,
  modelPath: "/models/prodisplay_xdr.glb",
};