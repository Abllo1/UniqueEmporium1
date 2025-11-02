"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext.tsx";

interface OrderSummaryCardProps {
  vatRate?: number;
  freeShippingThreshold?: number;
  shippingCost?: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20, x: -20 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const OrderSummaryCard = ({
  vatRate = 0, // Changed VAT rate to 0
  freeShippingThreshold = 100000, // Free shipping over ₦100,000
  shippingCost = 3500, // Base shipping cost ₦3,500
}: OrderSummaryCardProps) => {
  const { cartItems, totalItems, totalPrice } = useCart();

  const subtotal = totalPrice;
  const vat = subtotal * vatRate; // This will now be 0
  const calculatedShipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const total = subtotal + vat + calculatedShipping;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card className="rounded-2xl shadow-lg h-full">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items ({totalItems})</span>
            <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
          </div>
          {/* Removed VAT display */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-foreground">
              {calculatedShipping === 0 ? "Free" : formatCurrency(calculatedShipping)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex flex-col items-start text-lg font-bold">
          <div className="flex justify-between w-full mb-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="text-sm text-muted-foreground font-normal mt-2">
            Prices are final — no VAT or hidden charges.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OrderSummaryCard;