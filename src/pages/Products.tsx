"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialCategory = searchParams.get("category") || "";
  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  useEffect(() => {
    setCurrentQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a product search API call
    console.log("Searching for:", currentQuery);
    console.log("Category filter:", initialCategory);
    // For now, just update the URL if needed or perform a client-side filter
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {initialCategory ? `${initialCategory} Products` : "All Products"}
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Explore our wide range of electronics.
      </p>

      <form onSubmit={handleSearchSubmit} className="flex max-w-md mx-auto mb-8 space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9"
            value={currentQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder Product Cards - now rendering 20 */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
            <img src="/placeholder.svg" alt={`Product ${index + 1}`} className="w-32 h-32 object-cover mb-4" />
            <h3 className="font-semibold text-lg mb-1">Product Name {index + 1}</h3>
            <p className="text-muted-foreground text-sm mb-2">Category</p>
            <p className="font-bold text-xl">${(100 + index * 50).toFixed(2)}</p>
            <Button className="mt-4 w-full">Add to Cart</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;