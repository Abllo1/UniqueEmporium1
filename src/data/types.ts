import { LucideIcon } from "lucide-react"; // Import LucideIcon for spec icons

export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  tagVariant?: "default" | "secondary" | "destructive" | "outline";
  limitedStock?: boolean;
  specs?: { icon?: LucideIcon; label: string; value: string }[]; // Use LucideIcon type
}

export interface ProductDetails extends Product {
  fullDescription: string;
  keyFeatures: string[];
  applications: string;
  detailedSpecs: {
    group: string;
    items: { label: string; value: string; icon?: LucideIcon }[]; // Use LucideIcon type
  }[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    title: string;
    comment: string;
    isVerifiedBuyer: boolean;
  }[];
  relatedProducts: string[];
  has3DModel?: boolean;
  modelPath?: string;
}