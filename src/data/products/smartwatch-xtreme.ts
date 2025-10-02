import { ProductDetails } from "../types";

export const smartwatchXtreme: ProductDetails = {
  id: "smartwatch-xtreme",
  name: "SmartWatch Xtreme",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 120000.00,
  originalPrice: 135000.00,
  discountPercentage: 11,
  rating: 4.5,
  reviewCount: 210,
  tag: "Fitness",
  tagVariant: "default",
  limitedStock: true,
  fullDescription: `The SmartWatch Xtreme is your ultimate companion for fitness and connectivity. Featuring a vibrant AMOLED display, advanced health tracking (heart rate, SpO2, sleep), GPS, and long battery life, it keeps you informed and motivated. Make calls, receive notifications, and control music directly from your wrist.`,
  keyFeatures: [
    "Vibrant AMOLED display",
    "Advanced health tracking (HR, SpO2, Sleep)",
    "Built-in GPS",
    "Long battery life",
    "Water resistant",
  ],
  applications: `Ideal for fitness enthusiasts, athletes, and anyone who wants to monitor their health, track workouts, and stay connected on the go.`,
  detailedSpecs: [
    {
      group: "Display",
      items: [
        { label: "Type", value: "AMOLED" },
        { label: "Size", value: "1.4-inch" },
        { label: "Resolution", value: "454x454" },
      ],
    },
    {
      group: "Health Sensors",
      items: [
        { label: "Heart Rate", value: "Optical" },
        { label: "SpO2", value: "Yes" },
        { label: "Sleep Tracking", value: "Yes" },
      ],
    },
  ],
  reviews: [
    { id: "rev46", author: "FitnessFan", rating: 5, date: "2024-01-25", title: "Love this watch!", comment: "Tracks everything perfectly, and the battery lasts for days. Great for my runs.", isVerifiedBuyer: true },
    { id: "rev47", author: "TechWearer", rating: 4, date: "2024-01-22", title: "Stylish and functional", comment: "Looks great and has all the features I need. Notifications are a bit small.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["soundwave-noise-cancelling-headphones"],
};