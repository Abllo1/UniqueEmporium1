"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion, Easing } from "framer-motion";
import { ProductDetails as ProductDetailsType } from "@/data/types"; // Updated import
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

interface ProductBreadcrumbProps {
  product: ProductDetailsType;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-1" /> Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/products">Electronics</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/products?category=${product.category.toLowerCase().replace(/\s/g, '-')}`}>
                {product.category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};

export default ProductBreadcrumb;