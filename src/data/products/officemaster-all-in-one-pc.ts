import { Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react";
import { ProductDetails } from "../types";

export const officemasterAllInOnePc: ProductDetails = {
  id: "officemaster-all-in-one-pc",
  name: "OfficeMaster All-in-One PC",
  category: "Laptops", // Broad category for computing devices
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 700000.00,
  originalPrice: 750000.00,
  discountPercentage: 6,
  rating: 4.4,
  reviewCount: 90,
  tag: "Office",
  tagVariant: "secondary",
  limitedStock: false,
  fullDescription: `The OfficeMaster All-in-One PC offers a sleek, space-saving design with powerful performance for all your business and home office needs. Featuring a vibrant 24-inch Full HD display, Intel Core i7 processor, and ample storage, it's ready for multitasking, video conferencing, and everyday computing.`,
  keyFeatures: [
    "Sleek, space-saving all-in-one design",
    "Vibrant 24-inch Full HD display",
    "Intel Core i7 processor",
    "Integrated webcam and speakers",
    "Wireless keyboard and mouse included",
  ],
  applications: `Perfect for home offices, small businesses, and families needing a reliable and efficient computer for productivity, online learning, and entertainment.`,
  detailedSpecs: [
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Intel Core i7-12700", icon: Cpu },
        { label: "RAM", value: "16GB DDR4", icon: MemoryStick },
        { label: "Storage", value: "512GB SSD + 1TB HDD", icon: HardDrive },
      ],
    },
    {
      group: "Display",
      items: [
        { label: "Size", value: "24-inch", icon: Monitor },
        { label: "Resolution", value: "Full HD (1920x1080)" },
        { label: "Touchscreen", value: "Optional" },
      ],
    },
  ],
  reviews: [
    { id: "rev42", author: "OfficePro", rating: 5, date: "2024-01-15", title: "Great for my home office!", comment: "Clean setup, fast performance, and the screen is perfect for my work.", isVerifiedBuyer: true },
    { id: "rev43", author: "FamilyUser", rating: 4, date: "2024-01-12", title: "Solid family computer", comment: "Handles all our needs, but the speakers could be better.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["prodisplay-xdr"],
};