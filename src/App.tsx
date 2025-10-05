import React, { useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import { CompareProvider } from "./context/CompareContext.tsx";
import CompareBar from "./components/common/CompareBar.tsx";
import ScrollToTop from "./components/common/ScrollToTop.tsx";
import LoadingPage from "./components/common/LoadingPage.tsx"; // Import the new LoadingPage

// Lazily load page components for code splitting
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Favorites = lazy(() => import("./pages/Favorites.tsx"));
const Compare = lazy(() => import("./pages/Compare.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const FAQ = lazy(() => import("./pages/FAQ.tsx"));
const Shipping = lazy(() => import("./pages/Shipping.tsx"));
const Returns = lazy(() => import("./pages/Returns.tsx"));
const Warranty = lazy(() => import("./pages/Warranty.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.tsx"));

const queryClient = new QueryClient();

const App = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CartProvider onOpenCartDrawer={() => setIsCartDrawerOpen(true)}>
            <FavoritesProvider>
              <CompareProvider>
                <Header
                  isCartDrawerOpen={isCartDrawerOpen}
                  setIsCartDrawerOpen={setIsCartDrawerOpen}
                />
                <Suspense fallback={<LoadingPage />}> {/* Wrap Routes with Suspense */}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/warranty" element={<Warranty />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Footer />
                <CompareBar />
              </CompareProvider>
            </FavoritesProvider>
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;