"use client";

import React from "react";
import "@google/model-viewer";

const Product3DViewer = () => {
  return (
    <model-viewer
      src="/models/sample-product.glb"
      alt="3D view of product"
      auto-rotate
      camera-controls
      style={{ width: "100%", height: "500px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}
    ></model-viewer>
  );
};

export default Product3DViewer;