import { ProductDetails } from "../types";

export const powercharge100wGanCharger: ProductDetails = {
  id: "powercharge-100w-gan-charger",
  name: "PowerCharge 100W GaN Charger",
  category: "Accessories",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 25000.00,
  originalPrice: 30000.00,
  discountPercentage: 17,
  rating: 4.9,
  reviewCount: 450,
  tag: "Limited Stock",
  tagVariant: "destructive",
  limitedStock: true,
  fullDescription: `Revolutionize your charging experience with the PowerCharge 100W GaN Charger. Utilizing advanced Gallium Nitride (GaN) technology, this compact charger delivers a massive 100W of power, capable of fast-charging laptops, tablets, and smartphones simultaneously. With two USB-C ports and one USB-A port, it's the only charger you'll need for all your devices. Its intelligent power distribution ensures optimal charging speeds for each connected device.`,
  keyFeatures: [
    "Advanced Gallium Nitride (GaN) technology for compact size",
    "Massive 100W power output for fast charging",
    "Simultaneous charging for laptops, tablets, and smartphones",
    "Two USB-C ports and one USB-A port for versatile compatibility",
    "Intelligent power distribution for optimal charging speeds",
  ],
  applications: `An essential accessory for travelers, remote workers, and anyone with multiple devices needing fast and efficient charging. Perfect for decluttering your charging setup and ensuring all your gadgets are powered up quickly.`,
  detailedSpecs: [
    {
      group: "Power Output",
      items: [
        { label: "Total Output", value: "100W Max" },
        { label: "USB-C1/C2", value: "PD 100W Max" },
        { label: "USB-A", value: "QC 18W Max" },
      ],
    },
    {
      group: "Ports",
      items: [
        { label: "USB-C", value: "2" },
        { label: "USB-A", value: "1" },
      ],
    },
  ],
  reviews: [
    {
      id: "rev11",
      author: "Oscar P.",
      rating: 5,
      date: "2023-11-10",
      title: "Incredible charger!",
      comment: "Charges my laptop and phone super fast. So compact for travel. A must-have!",
      isVerifiedBuyer: true,
    },
    {
      id: "rev12",
      author: "Quinn R.",
      rating: 5,
      date: "2023-11-08",
      title: "Replaced all my other chargers",
      comment: "Finally, one charger for everything. No more bulky power bricks. Works perfectly.",
      isVerifiedBuyer: true,
    },
  ],
  relatedProducts: ["ergofit-wireless-keyboard"],
  has3DModel: true,
  modelPath: "/models/powercharge_100w_gan_charger.glb",
};