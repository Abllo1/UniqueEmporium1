import { HardDrive } from "lucide-react";
import { ProductDetails } from "../types";

export const ultrafast1TbExternalSsd: ProductDetails = {
  id: "ultrafast-1tb-external-ssd",
  name: "UltraFast 1TB External SSD",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 150000.00,
  originalPrice: 165000.00,
  discountPercentage: 9,
  rating: 4.7,
  reviewCount: 130,
  tag: "Storage",
  tagVariant: "destructive",
  limitedStock: false,
  fullDescription: `Carry your data with confidence and speed using the UltraFast 1TB External SSD. This ultra-fast external solid-state drive offers massive storage capacity in a pocket-sized design. With USB 3.2 Gen2 connectivity, achieve blazing-fast read/write speeds of up to 1000MB/s, perfect for large files, 4K videos, and gaming libraries. Its durable, shock-resistant build ensures your data is safe on the go.`,
  keyFeatures: [
    "Ultra-fast external solid-state drive",
    "Massive 1TB storage capacity in a pocket-sized design",
    "USB 3.2 Gen2 connectivity for blazing-fast read/write speeds",
    "Perfect for large files, 4K videos, and gaming libraries",
    "Durable, shock-resistant build for data safety on the go",
  ],
  applications: `Essential for professionals, content creators, and gamers who need to quickly transfer and store large amounts of data. Ideal for expanding laptop storage, backing up important files, or running games directly from the drive.`,
  detailedSpecs: [
    {
      group: "Storage",
      items: [
        { icon: HardDrive, label: "Capacity", value: "1TB" },
        { label: "Type", value: "External SSD" },
      ],
    },
    {
      group: "Performance",
      items: [
        { label: "Interface", value: "USB 3.2 Gen2 (10Gbps)" },
        { label: "Read Speed", value: "Up to 1050MB/s" },
        { label: "Write Speed", value: "Up to 1000MB/s" },
      ],
    },
  ],
  reviews: [
    {
      id: "rev23",
      author: "Jack K.",
      rating: 5,
      date: "2023-11-09",
      title: "Blazing fast and tiny!",
      comment: "Transfers huge files in seconds. Fits in my pocket. Essential for my work.",
      isVerifiedBuyer: true,
    },
    {
      id: "rev24",
      author: "Laura M.",
      rating: 4,
      date: "2023-11-06",
      title: "Great, but runs warm",
      comment: "Performance is excellent, but it gets noticeably warm during sustained transfers. Not a dealbreaker.",
      isVerifiedBuyer: false,
    },
  ],
  relatedProducts: ["zenbook-pro-14-oled"],
  has3DModel: true,
  modelPath: "/models/ultrafast_1tb_external_ssd.glb",
};