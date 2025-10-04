"use client";

import React from "react";
import "@google/model-viewer";

const Product3DViewer = () => {
  return (
    <model-viewer
      src="/models/sample-product.glb" // Hardcoded model path as requested
      alt="3D view of product"
      auto-rotate
      camera-controls
      className="w-full h-[500px] bg-[#f9f9f9] rounded-xl" // Fixed height to 500px
    ></model-viewer>
  );
};

export default Product3DViewer;