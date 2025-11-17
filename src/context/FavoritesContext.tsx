"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";
import { Product } from "@/components/products/ProductCard.tsx";
import { toast } from "sonner";
import { useAuth } from "./AuthContext.tsx";
import { supabase } from "@/integrations/supabase/client"; // Fixed: Updated import path

// Define the structure for the database table 'favorites'
interface FavoriteDB {
  user_id: string;
  product_id: string;
  product_data: Product; // Store the full product object for easy retrieval
}

interface FavoritesContextType {
  favoriteItems: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorited: (productId: string) => boolean;
  totalFavorites: number;
  isLoadingFavorites: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: isLoadingAuth } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const fetchFavorites = useCallback(async (userId: string) => {
    setIsLoadingFavorites(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('product_data')
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites.");
      setFavoriteItems([]);
    } else {
      // Map the product_data JSON object back to the Product array
      const items = data.map(item => item.product_data as Product);
      setFavoriteItems(items);
    }
    setIsLoadingFavorites(false);
  }, []);

  useEffect(() => {
    if (!isLoadingAuth) {
      if (user) {
        fetchFavorites(user.id);
      } else {
        // Clear favorites if user logs out
        setFavoriteItems([]);
        setIsLoadingFavorites(false);
      }
    }
  }, [user, isLoadingAuth, fetchFavorites]);

  const addFavorite = useCallback(async (product: Product) => {
    if (!user) {
      toast.error("Please sign in to add favorites.");
      return;
    }

    if (favoriteItems.some((item) => item.id === product.id)) {
      return; // Already favorited
    }

    const newFavorite: FavoriteDB = {
      user_id: user.id,
      product_id: product.id,
      product_data: product,
    };

    const { error } = await supabase
      .from('favorites')
      .insert([newFavorite]);

    if (error) {
      console.error("Error adding favorite:", error);
      toast.error(`Failed to add ${product.name} to favorites.`);
    } else {
      setFavoriteItems((prevItems) => {
        toast.success(`${product.name} added to your favorites!`);
        return [...prevItems, product];
      });
    }
  }, [user, favoriteItems]);

  const removeFavorite = useCallback(async (productId: string) => {
    if (!user) return;

    const removedItem = favoriteItems.find(item => item.id === productId);

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error("Error removing favorite:", error);
      toast.error(`Failed to remove favorite.`);
    } else {
      setFavoriteItems((prevItems) => {
        if (removedItem) {
          toast.info(`${removedItem.name} removed from favorites.`);
        }
        return prevItems.filter((item) => item.id !== productId);
      });
    }
  }, [user, favoriteItems]);

  const isFavorited = useCallback((productId: string) => {
    return favoriteItems.some((item) => item.id === productId);
  }, [favoriteItems]);

  const totalFavorites = favoriteItems.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addFavorite,
        removeFavorite,
        isFavorited,
        totalFavorites,
        isLoadingFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};