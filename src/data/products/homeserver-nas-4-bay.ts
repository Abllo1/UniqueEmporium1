import { HardDrive } from "lucide-react";
import { ProductDetails } from "../types";

export const homeserverNas4Bay: ProductDetails = {
  id: "homeserver-nas-4-bay",
  name: "HomeServer NAS 4-Bay",
  category: "Smart Home",
  images: ["/placeholder.svg", "/placeholder.svg"],
  price: 350000.00,
  originalPrice: 380000.00,
  discountPercentage: 8,
  rating: 4.6,
  reviewCount: 60,
  tag: "Storage",
  tagVariant: "default",
  limitedStock: false,
  fullDescription: `The HomeServer NAS 4-Bay is a powerful network-attached storage solution for your home or small office. Easily store, share, and back up all your digital files, photos, and videos. Supports up to 4 hard drives for massive capacity and data redundancy. Stream media to all your devices.`,
  keyFeatures: [
    "4-bay network-attached storage (NAS)",
    "Centralized data storage and backup",
    "Media streaming capabilities",
    "Data redundancy (RAID support)",
    "Easy setup and management",
  ],
  applications: `Ideal for families, content creators, and small businesses needing a reliable and scalable solution for storing large amounts of data, media streaming, and secure backups.`,
  detailedSpecs: [
    {
      group: "Storage",
      items: [
        { label: "Drive Bays", value: "4x 3.5-inch/2.5-inch SATA", icon: HardDrive },
        { label: "Max Capacity", value: "Up to 80TB (20TB per drive)" },
        { label: "RAID Support", value: "RAID 0, 1, 5, 6, 10" },
      ],
    },
    {
      group: "Connectivity",
      items: [
        { label: "Ethernet", value: "2x Gigabit Ethernet" },
        { label: "USB", value: "2x USB 3.0" },
      ],
    },
  ],
  reviews: [
    { id: "rev52", author: "DataHoarder", rating: 5, date: "2024-02-10", title: "Excellent home server!", comment: "Easy to set up, fast transfers, and I feel much safer with my data backed up.", isVerifiedBuyer: true },
    { id: "rev53", author: "MediaStreamer", rating: 4, date: "2024-02-08", title: "Great for Plex", comment: "Streams all my movies without a hitch. The interface could be a bit more modern.", isVerifiedBuyer: false },
  ],
  relatedProducts: ["ultrafast-1tb-external-ssd"],
  has3DModel: true,
  modelPath: "/models/homeserver_nas_4_bay.glb",
};