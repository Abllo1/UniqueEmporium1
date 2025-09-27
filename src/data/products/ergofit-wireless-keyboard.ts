import { Wifi, BatteryCharging } from "lucide-react";
import { ProductDetails } from "../types";

export const ergofitWirelessKeyboard: ProductDetails = {
  id: "ergofit-wireless-keyboard",
  name: "ErgoFit Wireless Keyboard",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 60000.00,
  rating: 4.5,
  reviewCount: 180,
  tag: "Ergonomic",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `The ErgoFit Wireless Keyboard is designed for maximum comfort and productivity. Its split, curved layout and integrated palm rest reduce strain on your wrists and forearms, making long typing sessions more comfortable. Enjoy quiet, responsive keys and seamless wireless connectivity.`,
  keyFeatures: [
    "Ergonomic split design",
    "Integrated palm rest",
    "Quiet, responsive keys",
    "2.4GHz wireless connectivity",
    "Long battery life",
  ],
  applications: `Perfect for office workers, writers, and anyone who spends extended periods typing and wants to improve comfort and reduce the risk of repetitive strain injuries.`,
  detailedSpecs: [
    {
      group: "Design",
      items: [
        { label: "Layout", value: "Split ergonomic" },
        { label: "Palm Rest", value: "Integrated" },
        { label: "Key Type", value: "Membrane" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Wireless", value: "2.4GHz USB Receiver", icon: Wifi },
        { label: "Battery", value: "2x AAA (included)", icon: BatteryCharging },
      ],
    },
  ],
  reviews: [
    { id: "rev30", author: "Chris P.", rating: 5, date: "2023-12-10", title: "My wrists thank me!", comment: "Huge improvement in comfort. Took a day to get used to, but now I love it.", isVerifiedBuyer: true },
    { id: "rev31", author: "Laura K.", rating: 4, date: "2023-12-05", title: "Good, but a bit bulky", comment: "Works great, but it's quite large on my desk.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["gaming-pro-wireless-mouse"],
  has3DModel: true,
  modelPath: "/models/ergofit_wireless_keyboard.glb",
};