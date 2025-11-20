"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/components/products/ProductCard.tsx";
import { useCart } from "@/context/CartContext.tsx";
import { useFavorites } from "@/context/FavoritesContext.tsx";
import toast from "react-hot-toast";

interface ProductInfoSectionProps {
  product: Product;
}

const ProductInfoSection = ({ product }: ProductInfoSectionProps) => {
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setQuantity(product.minOrderQuantity);
  }, [product.minOrderQuantity]);

  const unitPrice = product.price / product.minOrderQuantity;
  const originalUnitPrice = product.originalPrice ? product.originalPrice / product.minOrderQuantity : undefined;

  const discount = originalUnitPrice && unitPrice < originalUnitPrice
    ? Math.round(((originalUnitPrice - unitPrice) / originalUnitPrice) * 100)
    : 0;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= product.minOrderQuantity) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(product.minOrderQuantity); // Or 0, depending on desired behavior for empty input
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(product.minOrderQuantity, prev - 1));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    addToCart(product, quantity);
    toast.success(`${quantity} of ${product.name} added to cart!`);
    setIsAddingToCart(false);
  };

  const handleToggleFavorite = () => {
    if (isFavorited(product.id)) {
      removeFavorite(product.id);
      toast.success(`${product.name} removed from favorites.`);
    } else {
      addFavorite(product);
      toast.success(`${product.name} added to favorites!`);
    }
  };

  const favorited = isFavorited(product.id);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-0">
      {/* Category */}
      <span className="text-sm text-muted-foreground uppercase tracking-wide">
        {product.category}
      </span>

      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-card-foreground leading-tight">
        {product.name}
      </h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <p className="text-3xl font-bold text-primary">
          {(unitPrice * quantity).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
        </p>
        {originalUnitPrice && unitPrice < originalUnitPrice && (
          <div className="flex items-center gap-2">
            <p className="text-lg text-gray-400 line-through">
              {(originalUnitPrice * quantity).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </p>
            {discount > 0 && (
              <Badge variant="destructive" className="text-base font-medium px-2 py-1">
                -{discount}%
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* MOQ and Limited Stock */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <p>MOQ: {product.minOrderQuantity} pcs</p>
        {product.limitedStock && (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Limited Stock!
          </Badge>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementQuantity}
          disabled={quantity <= product.minOrderQuantity}
          className="h-10 w-10 rounded-full"
        >
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={product.minOrderQuantity}
          className="w-20 text-center text-base h-10"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={incrementQuantity}
          className="h-10 w-10 rounded-full"
        >
          +
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1 w-full h-[52px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Adding to Cart...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-[52px] w-[52px] flex-shrink-0 rounded-full"
          onClick={handleToggleFavorite}
        >
          <Heart className={cn("h-6 w-6", favorited && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      {/* Product Description */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-3">Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          {product.full_description || "No detailed description available for this product."}
        </p>
      </div>

      {/* Key Features */}
      {product.key_features && product.key_features.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {product.key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Style Notes */}
      {product.style_notes && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-3">Style Notes</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.style_notes}
          </p>
        </div>
      )}

      {/* Detailed Specs */}
      {product.detailed_specs && Object.keys(product.detailed_specs).length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-3">Detailed Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
            {Object.entries(product.detailed_specs).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{value as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfoSection;