import { ProductDetails } from "../types";

export const soundwaveNoiseCancellingHeadphones: ProductDetails = {
  id: "soundwave-noise-cancelling-headphones",
  name: "SoundWave Noise-Cancelling Headphones",
  category: "Audio",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 175000.00,
  rating: 4.5,
  reviewCount: 230,
  tag: "New Arrival",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `Immerse yourself in pure audio bliss with the SoundWave Noise-Cancelling Headphones. Featuring advanced active noise cancellation, these headphones block out distractions, allowing you to focus on your music, podcasts, or calls. The ergonomic design ensures supreme comfort for extended listening sessions, while the powerful drivers deliver rich, detailed sound with deep bass. With up to 30 hours of battery life and quick charging, your soundtrack never has to stop.`,
  keyFeatures: [
    "Advanced Hybrid Active Noise Cancellation",
    "Ergonomic design for supreme comfort",
    "Rich, detailed sound with deep bass",
    "Up to 30 hours of battery life",
    "Quick charging capabilities",
  ],
  applications: `Perfect for audiophiles, commuters, students, and anyone seeking an immersive listening experience without distractions. Great for travel, work, or simply relaxing with your favorite tunes.`,
  detailedSpecs: [
    {
      group: "Audio",
      items: [
        { label: "Driver Size", value: "40mm" },
        { label: "Frequency Response", value: "20Hz - 20kHz" },
        { label: "Noise Cancellation", value: "Hybrid Active Noise Cancellation" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Bluetooth", value: "Bluetooth 5.2" },
        { label: "Codecs", value: "SBC, AAC, aptX" },
        { label: "Wired", value: "3.5mm Audio Jack" },
      ],
    },
  ],
  reviews: [
    {
      id: "rev3",
      author: "Charlie D.",
      rating: 5,
      date: "2023-11-01",
      title: "Best headphones I've owned!",
      comment: "The ANC is incredible, and the sound quality is fantastic. Very comfortable too.",
      isVerifiedBuyer: true,
    },
    {
      id: "rev4",
      author: "Eve F.",
      rating: 4,
      date: "2023-10-28",
      title: "Great value for money",
      comment: "Solid performance, good battery. A bit bulky for my taste, but overall excellent.",
      isVerifiedBuyer: false,
    },
  ],
  relatedProducts: ["zenbook-pro-14-oled", "ergofit-wireless-keyboard"],
};