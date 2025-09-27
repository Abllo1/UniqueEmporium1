"use client";

import React, { useState } from "react";
import { motion, Easing } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/context/CartContext.tsx";
import { ShippingFormValues } from "./ShippingForm.tsx"; // Import types
import { PaymentFormValues } from "./PaymentForm.tsx"; // Import types
import { useCart } from "@/context/CartContext.tsx"; // Import useCart

interface OrderReviewProps {
  onPlaceOrder: () => void;
  onBack: () => void;
  shippingDetails: ShippingFormValues;
  paymentDetails: PaymentFormValues;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const OrderReview = ({ onPlaceOrder, onBack, shippingDetails, paymentDetails }: OrderReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, totalPrice } = useCart(); // Get cartItems and totalPrice from CartContext

  const handlePlaceOrderClick = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    onPlaceOrder();
  };

  const formatNaira = (amount: number) =>
    amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 });

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full"
    >
      <Card className="rounded-lg shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-5 w-5" /> Order Review
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Shipping Address</h3>
            <p className="text-muted-foreground">{shippingDetails.fullName}</p>
            <p className="text-muted-foreground">{shippingDetails.address1}</p>
            {shippingDetails.address2 && <p className="text-muted-foreground">{shippingDetails.address2}</p>}
            <p className="text-muted-foreground">{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
            <p className="text-muted-foreground">{shippingDetails.phoneNumber}</p>
            <p className="text-muted-foreground">{shippingDetails.email}</p>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Payment Method</h3>
            <p className="text-muted-foreground">Card Holder: {paymentDetails.cardHolderName}</p>
            <p className="text-muted-foreground">Card ending in **** **** **** {paymentDetails.cardNumber.slice(-4)}</p>
            <p className="text-muted-foreground">Expires: {paymentDetails.expiryDate}</p>
          </div>

          {/* Items in Order */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Items in Order ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-b-0 last:pb-0">
                  <img src={item.images[0]} alt={item.name} className="h-16 w-16 object-contain rounded-md border" />
                  <div className="flex-grow">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {formatNaira(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">{formatNaira(item.quantity * item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto">
              Back to Payment
            </Button>
            <Button type="button" className="w-full md:w-auto" size="lg" onClick={handlePlaceOrderClick} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderReview;