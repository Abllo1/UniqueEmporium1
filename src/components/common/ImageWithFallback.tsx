"use client";

import React, { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import UniqueEmporiumLogo from "@/components/logo/UniqueEmporiumLogo.tsx";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | undefined;
  alt: string;
  containerClassName?: string; // Class for the wrapper div
  fallbackLogoClassName?: string; // Class for the fallback logo itself
  // NEW OPTIMIZATION PROPS
  width?: number; // Desired display width (for transformation)
  height?: number; // Desired display height (for transformation)
  quality?: number; // Image quality (0-100)
  format?: 'auto' | 'webp' | 'avif'; // Desired format
  lazy?: boolean; // Enable native lazy loading
}

const ImageWithFallback = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackLogoClassName,
  width,
  height,
  quality = 85, // Default quality for optimization
  format = 'webp', // Default format for optimization
  lazy = false, // Default to eager loading
  ...props
}: ImageWithFallbackProps) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'failed'>(
    src ? 'loading' : 'failed'
  );

  const handleImageLoad = useCallback(() => {
    setImageStatus('loaded');
  }, []);

  const handleImageError = useCallback(() => {
    setImageStatus('failed');
  }, []);

  // Function to generate optimized URL using Supabase Storage transformations
  const getOptimizedUrl = useCallback((originalUrl: string | undefined) => {
    if (!originalUrl) return undefined;

    try {
      const url = new URL(originalUrl);
      // Check if it's a Supabase Storage URL (assuming the public path structure)
      if (url.hostname.includes('supabase.co') && url.pathname.includes('/storage/v1/object/public/')) {
        const params = new URLSearchParams();
        
        // Add resizing parameters
        if (width) params.set('width', width.toString());
        if (height) params.set('height', height.toString());
        
        // Add quality and format parameters
        params.set('quality', quality.toString());
        params.set('format', format);

        // Append transformations as query parameters
        url.search = params.toString();
        return url.toString();
      }
      // If not a recognized Supabase URL, return original
      return originalUrl;
    } catch (e) {
      // If URL parsing fails, return original src
      return originalUrl;
    }
  }, [width, height, quality, format]);

  const optimizedSrc = useMemo(() => getOptimizedUrl(src), [src, getOptimizedUrl]);

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", containerClassName)}>
      {imageStatus === 'loading' && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      {imageStatus === 'failed' || !src ? (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted">
          <UniqueEmporiumLogo className={cn("h-[140px] w-[140px] object-contain opacity-20", fallbackLogoClassName)} />
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          className={cn("w-full h-full object-cover transition-opacity duration-300", className)}
          style={{ opacity: imageStatus === 'loaded' ? 1 : 0 }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={lazy ? "lazy" : "eager"} // Native lazy loading
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;