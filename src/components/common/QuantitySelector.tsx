"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({ 
  quantity, 
  setQuantity, 
  min = 1, 
  max = 10 
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= min && value <= max) {
        setQuantity(value);
      } else if (value < min) {
        setQuantity(min);
      } else if (value > max) {
        setQuantity(max);
      }
    }
  };

  return (
    <div className="flex items-center border border-border rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="h-10 w-10 rounded-l-lg rounded-r-none"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-16 h-10 text-center border-0 border-l border-r border-border bg-transparent text-foreground focus:outline-none focus:ring-0"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="h-10 w-10 rounded-r-lg rounded-l-none"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;