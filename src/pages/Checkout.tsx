"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import CheckoutHeader from "@/components/checkout/CheckoutHeader.tsx";
import CheckoutProgress from "@/components/checkout/CheckoutProgress.tsx";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard.tsx";
import EmptyCartState from "@/components/checkout/EmptyCartState.tsx";
import OrderPlacedState from "@/components/checkout/OrderPlacedState.tsx";
import { useCart } from "@/context/CartContext.tsx";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button"; // Added Button import

// Placeholder for form data types
interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface OrderData {
  shipping: ShippingInfo | null;
  payment: PaymentInfo | null;
}

const formTransitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" as Easing },
  }),
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({ shipping: null, payment: null });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const isMobile = useIsMobile();

  useEffect(() => {
    if (cartItems.length === 0 && !isOrderPlaced) {
      // If cart becomes empty and order isn't placed, redirect or show empty state
      // For now, we'll just show the empty state.
    }
  }, [cartItems, isOrderPlaced]);

  const handleNextStep = (data: any) => {
    setDirection(1);
    if (currentStep === 1) {
      setOrderData((prev) => ({ ...prev, shipping: data }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setOrderData((prev) => ({ ...prev, payment: data }));
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handlePlaceOrder = async () => {
    // Simulate API call for placing order
    toast.loading("Placing your order...", { id: "place-order-toast" });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, send orderData to backend
    console.log("Order Data:", orderData, "Cart Items:", cartItems);

    toast.dismiss("place-order-toast");
    toast.success("Order Placed Successfully!", {
      description: "You will receive an email confirmation shortly.",
    });

    clearCart(); // Clear cart after successful order
    setIsOrderPlaced(true);
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return <EmptyCartState />;
  }

  if (isOrderPlaced) {
    return <OrderPlacedState />;
  }

  // Placeholder components for now
  const ShippingForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Shipping Information</h2>
      <p className="text-muted-foreground">Please provide your delivery details.</p>
      <div className="bg-muted/20 p-4 rounded-md">
        <p>Shipping form fields will go here.</p>
        <p>First Name, Last Name, Address, City, State, Zip Code, Phone, Email</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => handleNextStep({ /* dummy data */ })}>Continue to Payment</Button>
      </div>
    </div>
  );

  const PaymentForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Payment Information</h2>
      <p className="text-muted-foreground">Enter your payment details.</p>
      <div className="bg-muted/20 p-4 rounded-md">
        <p>Payment form fields will go here.</p>
        <p>Card Name, Card Number, Expiry Date, CVV</p>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>Back to Shipping</Button>
        <Button onClick={() => handleNextStep({ /* dummy data */ })}>Review Order</Button>
      </div>
    </div>
  );

  const OrderReview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Review Your Order</h2>
      <p className="text-muted-foreground">Please confirm all details before placing your order.</p>
      <div className="bg-muted/20 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Shipping Details:</h3>
        <p>{orderData.shipping ? `${orderData.shipping.firstName} ${orderData.shipping.lastName}` : 'N/A'}</p>
        <p>{orderData.shipping ? orderData.shipping.address : 'N/A'}</p>
        <p>{orderData.shipping ? `${orderData.shipping.city}, ${orderData.shipping.state} ${orderData.shipping.zipCode}` : 'N/A'}</p>
        <h3 className="font-semibold mt-4 mb-2">Payment Details:</h3>
        <p>{orderData.payment ? `Card ending in ${orderData.payment.cardNumber.slice(-4)}` : 'N/A'}</p>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep}>Back to Payment</Button>
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ShippingForm />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <OrderReview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <CheckoutHeader />
      <CheckoutProgress currentStep={currentStep} />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms (2/3 width on desktop) */}
        <motion.div
          className="lg:col-span-2"
          key={currentStep} // Key for AnimatePresence to detect component change
          custom={direction}
          variants={formTransitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {renderStepContent()}
        </motion.div>

        {/* Right Column: Order Summary (1/3 width on desktop, fixed) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default Checkout;