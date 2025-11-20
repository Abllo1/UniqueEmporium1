"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SlideOutSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutSearchBar = ({ isOpen, onClose }: SlideOutSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null); // Ref for the search bar container

  useEffect(() => {
    if (isOpen) {
      // Focus the input when the search bar opens
      inputRef.current?.focus();
      // Pre-fill search query if present in URL
      setSearchQuery(searchParams.get("query") || "");

      // Add event listener for clicks outside
      const handleClickOutside = (event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, searchParams, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={searchBarRef} // Attach the ref here
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sticky top-16 z-40 w-full overflow-hidden bg-background/95 backdrop-blur-sm border-b border-border"
        >
          <div className="mx-auto flex max-w-7xl items-center p-4">
            <form onSubmit={handleSearch} className="flex w-full space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-9 pr-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="shrink-0 rounded-full">
                Search
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideOutSearchBar;