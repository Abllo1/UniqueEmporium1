"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryItem {
  image: string;
  label: string;
}

const categoryContent: CategoryItem[] = [
  {"image": "women_category.svg", "label": "Women"},
  {"image": "curve_category.svg", "label": "Curve"},
  {"image": "kids_category.svg", "label": "Kids"},
  {"image": "men_category.svg", "label": "Men"},
  {"image": "fall_winter_category.svg", "label": "Fall & Winter"},
  {"image": "jewelry_category.svg", "label": "Jewelry & Accessories"},
  {"image": "underwear_category.svg", "label": "Underwear & Sleepwear"},
  {"image": "cellphones_category.svg", "label": "Cell Phones & Accessories"},
  {"image": "shoes_category.svg", "label": "Shoes"},
  {"image": "home_living_category.svg", "label": "Home & Living"},
  {"image": "beauty_health_category.svg", "label": "Beauty & Health"},
  {"image": "baby_maternity.svg", "label": "Baby & Maternity"},
  {"image": "sports_outdoor_category.svg", "label": "Sports & Outdoor"},
  {"image": "tops_category.svg", "label": "Tops"},
  {"image": "dresses_category.svg", "label": "Dresses"},
  {"image": "bags_luggage_category.svg", "label": "Bags & Luggage"}
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as Easing } },
};

const CategoryCardsSection = () => {
  return (
    <section className="py-3 lg:py-9 bg-[#f8f8f8]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          className="font-poppins font-bold text-xl md:text-4xl text-foreground text-center mb-8"
          variants={fadeInUp}
        >
          Shop by Category
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[18px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categoryContent.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center p-[10px] bg-white rounded-[36px] shadow-md cursor-pointer"
            >
              <Link
                to={`/products?category=${category.label.toLowerCase().replace(/\s/g, '-')}`}
                className="flex flex-col items-center justify-center w-full h-full text-center"
              >
                <img
                  src={`/${category.image}`}
                  alt={category.label}
                  className="h-[90px] w-[90px] lg:h-[120px] lg:w-[120px] object-cover rounded-full"
                />
                <p className="font-poppins font-semibold text-[0.85rem] lg:text-[1rem] text-[#333] mt-2 text-center">
                  {category.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CategoryCardsSection;