"use client";

import React from "react";
import { Search, Bell, Heart, Star, ShoppingCart, Eye, Zap, Shirt, Home, Star as StarIcon, Folder } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryGrid from "@/components/home/CategoryGrid.tsx";
import { getProducts, addToCart } from "@/lib/db";

export default function Homepage() {
  // Get first 2 products as recommended products
  const recommendedProducts = getProducts().slice(0, 2);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Ribbon */}
      <div className="bg-black text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Folder className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold">Gula</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome to Gula Store</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-black">Homepage</h1>
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search Gula Store..."
            className="pl-10 bg-gray-100 border-none rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-6">
        <div 
          className="relative rounded-2xl overflow-hidden h-48"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative p-6 h-full flex flex-col justify-center text-white">
            <h2 className="text-2xl font-bold mb-2">Unlock Your Style</h2>
            <p className="text-white/90 mb-4 text-sm">
              Discover the latest trends and exclusive collections
            </p>
            <Button className="bg-white text-black hover:bg-gray-100 w-fit px-6 py-2 rounded-lg font-medium">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <CategoryGrid />

      {/* Recommended for You */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-black mb-4">Recommended for You</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="flex-shrink-0 w-40 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div 
                className="w-full h-24 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.images[0]}')` }}
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-xs mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-semibold text-black">${product.price}</span>
                  {product.compare_at_price && (
                    <span className="text-xs text-gray-500 line-through">${product.compare_at_price}</span>
                  )}
                </div>
                <Button 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-1.5 text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Limited Time Offer */}
      <div className="px-4 mb-32">
        <div className="bg-gray-100 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-black mb-2">Limited Time Offer!</h3>
          <p className="text-gray-600 text-sm mb-4">
            Enjoy up to 50% Off on all Smart Home devices. Don't miss out!
          </p>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-200 rounded-lg">
            Discover More
          </Button>
        </div>
      </div>
    </div>
  );
}