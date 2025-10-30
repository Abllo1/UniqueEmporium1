"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface UniqueEmporiumLogoProps {
  className?: string;
  alt?: string;
}

const UniqueEmporiumLogo = ({ className, alt = "Unique Emporium Logo" }: UniqueEmporiumLogoProps) => {
  return (
    <img
      src="/unique-emporium-logo.png" // Path to the logo image in the public folder
      alt={alt}
      className={cn("h-auto", className)} // Allows for flexible sizing via Tailwind classes
    />
  );
};

export default UniqueEmporiumLogo;