import { Camera, Mic } from "lucide-react";
import { ProductDetails } from "../types";

export const visionpro4kWebcam: ProductDetails = {
  id: "visionpro-4k-webcam",
  name: "VisionPro 4K Webcam",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 80000.00,
  rating: 4.6,
  reviewCount: 110,
  tag: "Streaming",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `Elevate your video calls and streaming with the VisionPro 4K Webcam. Featuring stunning 4K Ultra HD resolution, autofocus, and a wide 90-degree field of view, it delivers crystal-clear video quality. Built-in dual microphones ensure your voice is heard clearly, even in noisy environments.`,
  keyFeatures: [
    "4K Ultra HD resolution",
    "Autofocus and auto light correction",
    "Wide 90-degree field of view",
    "Dual noise-cancelling microphones",
    "Privacy shutter",
  ],
  applications: `Perfect for remote work, online meetings, content creation, and live streaming, providing superior video and audio quality.`,
  detailedSpecs: [
    {
      group: "Camera",
      items: [
        { label: "Resolution", value: "4K UHD (3840x2160)", icon: Camera },
        { label: "Frame Rate", value: "30fps (4K), 60fps (1080p)" },
        { label: "Field of View", value: "90 degrees" },
        { label: "Focus", value: "Autofocus" },
      ],
    },
    {
      group: "Audio",
      items: [
        { label: "Microphones", value: "Dual omni-directional", icon: Mic },
        { label: "Noise Cancellation", value: "Yes" },
      ],
    },
  ],
  reviews: [
    { id: "rev36", author: "VideoCreator", rating: 5, date: "2023-12-25", title: "Amazing clarity!", comment: "My streams look so much more professional now. The autofocus is spot on.", isVerifiedBuyer: true },
    { id: "rev37", author: "RemoteWorker", rating: 4, date: "2023-12-20", title: "Great for meetings", comment: "Much better than my laptop camera. Good value for 4K.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["gaming-beast-desktop-pc"],
};