"use client";

import React, { useState, useEffect, useRef } from "react";
import "@google/model-viewer";
import { motion, Easing } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // Import Loader2

interface Product3DViewerProps {
  modelPath: string;
  productName: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const Product3DViewer = ({ modelPath, productName }: Product3DViewerProps) => {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const modelViewerElementRef = useRef<HTMLDivElement & { model?: any }>(null); // Ref for the model-viewer element

  useEffect(() => {
    const currentModelViewer = modelViewerElementRef.current;
    let loadTimeout: ReturnType<typeof setTimeout>;

    const handleLoad = () => {
      // Add a small delay after the 'load' event to ensure the model is fully rendered
      // before hiding our custom spinner.
      loadTimeout = setTimeout(() => {
        setIsModelLoading(false);
      }, 300); // 300ms delay
    };

    if (currentModelViewer) {
      currentModelViewer.addEventListener("load", handleLoad);
    }

    return () => {
      if (currentModelViewer) {
        currentModelViewer.removeEventListener("load", handleLoad);
      }
      clearTimeout(loadTimeout); // Clear timeout if component unmounts before it fires
    };
  }, [modelPath]); // Re-run effect if modelPath changes

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-72 lg:h-96 border rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/3d-viewer-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isModelLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}
      <model-viewer
        ref={modelViewerElementRef} // Attach the ref directly to model-viewer
        src={modelPath}
        alt={`3D view of ${productName}`}
        auto-rotate
        camera-controls
        poster="" // Disable default poster
        loading="eager" // Eagerly load the model
        // Removed reveal="manual" to allow opacity control to work
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          borderRadius: "12px",
          opacity: isModelLoading ? 0 : 1, // Hide model-viewer until loaded
          transition: "opacity 0.3s ease-in-out",
        }}
      ></model-viewer>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/70 backdrop-blur-sm text-xs text-muted-foreground px-2 py-1 rounded-md">
        Interactive 3D View of {productName}
      </div>
    </motion.div>
  );
};

export default Product3DViewer;