import { ProductDetails } from "../types";

export const smartdeskStandingDesk: ProductDetails = {
  id: "smartdesk-standing-desk",
  name: "SmartDesk Standing Desk",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 280000.00,
  originalPrice: 300000.00,
  discountPercentage: 7,
  rating: 4.7,
  reviewCount: 100,
  tag: "Ergonomic",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `Improve your posture and productivity with the SmartDesk Standing Desk. This electric height-adjustable desk allows you to seamlessly switch between sitting and standing positions throughout your workday. Features a sturdy frame, quiet motors, and programmable memory presets for your preferred heights.`,
  keyFeatures: [
    "Electric height adjustment",
    "Sturdy steel frame",
    "Quiet dual motors",
    "Programmable memory presets",
    "Spacious desktop",
  ],
  applications: `Ideal for remote workers, office professionals, and students who want to incorporate more movement into their workday, reduce sedentary time, and improve overall well-being.`,
  detailedSpecs: [
    {
      group: "Mechanism",
      items: [
        { label: "Type", value: "Electric" },
        { label: "Motors", value: "Dual Motors" },
        { label: "Height Range", value: "70cm - 120cm" },
        { label: "Lift Speed", value: "38mm/s" },
      ],
    },
    {
      group: "Design",
      items: [
        { label: "Frame Material", value: "Steel" },
        { label: "Desktop Size", value: "120cm x 60cm (Customizable)" },
      ],
    },
  ],
  reviews: [
    { id: "rev54", author: "WorkFromHome", rating: 5, date: "2024-02-15", title: "Game-changer for my home office!", comment: "Easy to assemble, super stable, and I feel so much better standing throughout the day.", isVerifiedBuyer: true },
    { id: "rev55", author: "ProductivityHack", rating: 4, date: "2024-02-12", title: "Great desk, minor wobble at max height", comment: "Mostly solid, but there's a slight wobble when fully extended. Still highly recommend.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["ergofit-wireless-keyboard"],
  has3DModel: true,
  modelPath: "/models/smartdesk_standing_desk.glb",
};