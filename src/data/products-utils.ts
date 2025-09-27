import { mockProducts } from "./products-data";
import { Product, ProductDetails } from "./types";

export const getProductById = (id: string): ProductDetails | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByIds = (ids: string[]): ProductDetails[] => {
  return ids.map(id => getProductById(id)).filter((product): product is ProductDetails => product !== undefined);
};

// Helper to get a few random products for recommendations
export const getRandomProducts = (count: number, excludeId?: string): Product[] => {
  const filteredProducts = excludeId ? mockProducts.filter(p => p.id !== excludeId) : mockProducts;
  const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    images: p.images,
    price: p.price,
    originalPrice: p.originalPrice,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    reviewCount: p.reviewCount,
    tag: p.tag,
    tagVariant: p.tagVariant,
    limitedStock: p.limitedStock,
    specs: p.specs,
  }));
};

// Helper to get products for "Recently Viewed" (now uses actual IDs)
export const getRecentlyViewedProducts = (recentlyViewedIds: string[], currentProductId?: string): Product[] => {
  // Filter out the current product from the list of IDs if it's there
  const filteredIds = recentlyViewedIds.filter(id => id !== currentProductId);
  // Get the actual product objects based on these IDs
  const products = getProductsByIds(filteredIds);
  return products;
};