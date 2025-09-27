import { Wifi } from "lucide-react";
import { ProductDetails } from "../types";

export const portableProjectorMini: ProductDetails = {
  id: "portable-projector-mini",
  name: "Portable Projector Mini",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 95000.00,
  rating: 4.3,
  reviewCount: 70,
  tag: "Entertainment",
  tagVariant: "secondary",
  limitedStock: false,
  fullDescription: `Transform any space into a home theater with the Portable Projector Mini. This compact projector delivers a bright, clear image up to 100 inches, with built-in speakers and versatile connectivity options. Perfect for movie nights, presentations, or gaming on the go.`,
  keyFeatures: [
    "Compact and portable design",
    "Projects up to 100-inch image",
    "Built-in stereo speakers",
    "HDMI, USB, and Wi-Fi connectivity",
    "Long-lasting LED lamp",
  ],
  applications: `Ideal for home entertainment, outdoor movie nights, business presentations, and casual gaming, offering a large-screen experience anywhere.`,
  detailedSpecs: [
    {
      group: "Display",
      items: [
        { label: "Resolution", value: "1080p (Native)" },
        { label: "Brightness", value: "300 ANSI Lumens" },
        { label: "Projection Size", value: "30-100 inches" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "HDMI", value: "1x" },
        { label: "USB", value: "1x" },
        { label: "Wi-Fi", value: "Yes", icon: Wifi },
      ],
    },
  ],
  reviews: [
    { id: "rev48", author: "MovieBuff", rating: 5, date: "2024-01-30", title: "Great for outdoor movies!", comment: "Surprisingly bright and clear. Easy to set up. Kids love it.", isVerifiedBuyer: true },
    { id: "rev49", author: "Presenter", rating: 4, date: "2024-01-28", title: "Handy for presentations", comment: "Works well for quick meetings, but the fan can be a bit loud.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["smarthome-hub-pro"],
  has3DModel: true,
  modelPath: "/models/portable_projector_mini.glb",
};