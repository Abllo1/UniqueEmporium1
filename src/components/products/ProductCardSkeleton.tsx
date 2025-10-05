"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming shadcn Skeleton component is available

const ProductCardSkeleton = () => {
  return (
    <Card className="relative h-[420px] flex flex-col overflow-hidden rounded-2xl shadow-lg animate-pulse">
      <div className="relative h-[200px] w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Skeleton className="h-full w-full" />
      </div>

      <CardContent className="p-4 flex flex-col flex-grow text-left">
        <Skeleton className="h-3 w-1/3 mb-1" /> {/* Category */}
        <Skeleton className="h-5 w-2/3 mb-2" /> {/* Product Name */}
        <Skeleton className="h-4 w-1/4 mb-2" /> {/* Price */}
        <Skeleton className="h-3 w-1/2 mb-2" /> {/* Limited Stock / Rating */}
        
        <div className="mt-auto pt-2">
          <Skeleton className="h-4 w-full" /> {/* View Details / Favorite */}
        </div>
      </CardContent>

      <div className="flex overflow-x-auto no-scrollbar rounded-b-2xl border-t border-border bg-muted/50 py-3 px-2 flex-shrink-0 space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 min-w-[100px] border rounded-md bg-background py-1 px-2 flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <div>
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;