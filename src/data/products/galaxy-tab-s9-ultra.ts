import { ProductDetails } from "../types";

export const galaxyTabS9Ultra: ProductDetails = {
  id: "galaxy-tab-s9-ultra",
  name: "Galaxy Tab S9 Ultra",
  category: "Tablets",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 1100000.00,
  rating: 4.8,
  reviewCount: 160,
  tag: "Premium",
  tagVariant: "destructive",
  limitedStock: true,
  fullDescription: `The Galaxy Tab S9 Ultra is Samsung's most powerful and largest tablet, featuring a stunning 14.6-inch Dynamic AMOLED 2X display. Powered by the Snapdragon 8 Gen 2 for Galaxy, it delivers unparalleled performance for gaming, multitasking, and creative work. Includes the S Pen for precision input.`,
  keyFeatures: [
    "Massive 14.6-inch Dynamic AMOLED 2X display",
    "Snapdragon 8 Gen 2 for Galaxy processor",
    "Included S Pen",
    "IP68 water and dust resistance",
    "Long-lasting battery",
  ],
  applications: `Ideal for professionals, artists, and power users who need a large, high-performance tablet for drawing, video editing, extensive multitasking, and immersive entertainment.`,
  detailedSpecs: [
    {
      group: "Display",
      items: [
        { label: "Size", value: "14.6-inch" },
        { label: "Panel Type", value: "Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "120Hz" },
        { label: "Resolution", value: "2960x1848" },
      ],
    },
    {
      group: "Performance",
      items: [
        { label: "Processor", value: "Snapdragon 8 Gen 2 for Galaxy" },
        { label: "RAM", value: "12GB/16GB" },
        { label: "Storage", value: "256GB/512GB/1TB" },
      ],
    },
  ],
  reviews: [
    { id: "rev40", author: "DigitalArtist", rating: 5, date: "2024-01-10", title: "Incredible screen for art!", comment: "The display is gorgeous and the S Pen is super responsive. My new favorite drawing tablet.", isVerifiedBuyer: true },
    { id: "rev41", author: "Multitasker", rating: 4, date: "2024-01-08", title: "A bit too big, but powerful", comment: "Amazing for productivity, but it's definitely a two-hand device.", isVerifiedBuyer: true },
  ],
  relatedProducts: ["surface-pro-9"],
};