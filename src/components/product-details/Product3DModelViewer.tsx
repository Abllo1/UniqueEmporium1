"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { Loader2, Box } from "lucide-react"; // Import Box icon
import { motion, Easing } from "framer-motion";

interface Product3DModelViewerProps {
  modelPath?: string; // Make optional to handle cases where it might be missing
  productName: string;
}

// Component to load and display the GLTF model
const Model = ({ path }: { path: string }) => {
  const gltf = useGLTF(path); // This will suspend or throw if path is bad
  return <primitive object={gltf.scene} scale={1} />; // Adjust scale as needed for your models
};

const Product3DModelViewer = ({ modelPath, productName }: Product3DModelViewerProps) => {
  // Fallback if modelPath is not provided or is empty
  if (!modelPath) {
    return (
      <motion.div
        className="relative w-full rounded-xl overflow-hidden shadow-lg bg-muted h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as Easing }}
      >
        <div className="text-center text-muted-foreground">
          <Box className="h-12 w-12 mx-auto mb-4" />
          <p className="font-semibold text-lg">3D Model Not Available</p>
          <p className="text-sm">Displaying a placeholder.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-full rounded-xl overflow-hidden shadow-lg bg-muted h-[300px] sm:h-[400px] md:h-[500px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as Easing }}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <Suspense
          fallback={
            <Html center>
              <div className="flex items-center justify-center bg-muted/50 text-muted-foreground p-4 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading 3D Model...
              </div>
            </Html>
          }
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" /> {/* Adds realistic lighting and reflections */}
          <Model path={modelPath} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>

        {/* Descriptive text overlay */}
        <Html position={[0, -1.2, 0]} center>
          <div className="text-sm text-muted-foreground bg-background/70 px-3 py-1 rounded-md backdrop-blur-sm">
            Interactive 3D View of {productName}
          </div>
        </Html>
      </Canvas>
    </motion.div>
  );
};

export default Product3DModelViewer;