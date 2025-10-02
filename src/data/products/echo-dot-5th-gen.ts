import { Speaker, Mic, Wifi } from "lucide-react";
import { ProductDetails } from "../types";

export const echoDot5thGen: ProductDetails = {
  id: "echo-dot-5th-gen",
  name: "Echo Dot (5th Gen)",
  category: "Smart Home",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 45000.00,
  rating: 4.7,
  reviewCount: 300,
  tag: "Smart Speaker",
  tagVariant: "secondary",
  limitedStock: false,
  fullDescription: `The Echo Dot (5th Gen) is Amazon's most popular smart speaker with Alexa. Enjoy improved audio for vibrant sound, deeper bass, and clear vocals. Ask Alexa to play music, answer questions, read the news, check the weather, set alarms, control compatible smart home devices, and more.`,
  keyFeatures: [
    "Improved audio with deeper bass",
    "Built-in Alexa voice assistant",
    "Control smart home devices",
    "Compact design",
    "Privacy controls",
  ],
  applications: `Ideal for anyone looking to add smart home capabilities, stream music, get information, or manage daily tasks hands-free.`,
  detailedSpecs: [
    {
      group: "Audio",
      items: [
        { label: "Speaker", value: "1.73-inch front-firing speaker", icon: Speaker },
        { label: "Microphones", value: "Multiple microphones", icon: Mic },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Wi-Fi", value: "Dual-band Wi-Fi", icon: Wifi },
        { label: "Bluetooth", value: "Bluetooth 5.0" },
      ],
    },
  ],
  reviews: [
    { id: "rev28", author: "Mark T.", rating: 5, date: "2023-12-05", title: "Love my new Echo Dot!", comment: "Sound is surprisingly good for its size. Alexa is super helpful.", isVerifiedBuyer: true },
    { id: "rev29", author: "Jessica R.", rating: 4, date: "2023-11-30", title: "Great, but sometimes mishears me", comment: "Mostly works perfectly, but occasionally struggles with my accent.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["smarthome-hub-pro"],
};