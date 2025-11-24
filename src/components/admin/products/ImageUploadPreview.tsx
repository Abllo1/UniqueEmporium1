"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import ImageWithFallback from "@/components/common/ImageWithFallback.tsx";
import { cn } from "@/lib/utils";

interface ImageUploadPreviewProps {
  register: any; // from react-hook-form
  imagePreviewUrls: string[]; // Changed to array of URLs
  errors: any; // from react-hook-form
  label: string;
  description: string;
}

const ImageUploadPreview = ({
  register,
  imagePreviewUrls, // Changed to array of URLs
  errors,
  label,
  description,
}: ImageUploadPreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div className="space-y-2">
        <Label htmlFor="newImageFiles">{label}</Label>
        <Input
          id="newImageFiles"
          type="file"
          accept="image/*"
          multiple // Added multiple attribute
          {...register("newImageFiles")}
        />
        <p className="text-xs text-muted-foreground">{description}</p>
        {errors.newImageFiles && <p className="text-destructive text-sm">{errors.newImageFiles.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Image Previews</Label>
        <div className="flex flex-wrap gap-2"> {/* Display multiple images */}
          {imagePreviewUrls.length > 0 ? (
            imagePreviewUrls.map((url, index) => (
              <div key={index} className="h-24 w-24 rounded-md border flex items-center justify-center overflow-hidden bg-muted">
                <img src={url} alt={`Image Preview ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))
          ) : (
            <div className="h-24 w-24 rounded-md border flex items-center justify-center overflow-hidden bg-muted">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPreview;