"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Clock, TrendingUp, X, Star, ShoppingCart, Bell, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProducts, addToCart } from "@/lib/db";

export default function SearchPage() {
  const [recentSearches, setRecentSearches] = useState([
    "Wireless Earbuds",
    "Smart Home Devices", 
    "Portable Chargers"
  ]);

  const [trendingItems, setTrendingItems] = useState([
    "Gaming Keyboards",
    "Organic Skincare",
    "Eco-friendly Water Bottles"
  ]);

  const recommendedProducts = getProducts().slice(0, 2);

  const renderStars = (rating: number) => {
    return <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  const removeRecentSearch = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const removeTrendingItem = (index: number) => {
    setTrendingItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold text-black">Search</h1>
          </div>
          <div className="flex gap-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
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

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Recent Searches */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Recent Searches</h2>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{search}</span>
                </div>
                <button 
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => removeRecentSearch(index)}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Trending Now</h2>
          <div className="space-y-2">
            {trendingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{item}</span>
                </div>
                <button 
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => removeTrendingItem(index)}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Based on Your Browsing */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Based on Your Browsing</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="w-full h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.images[0]}')` }}
                />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500">{product.rating} ({product.review_count})</span>
                  </div>
                  <p className="text-lg font-semibold text-black mb-2">${product.price}</p>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-2 text-sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spring Sale Banner */}
        <div className="relative bg-gray-100 rounded-2xl p-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Spring Sale</h3>
            <p className="text-gray-600 mb-4">Up to 50% OFF</p>
            <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              SALE NOW &gt;
            </Button>
          </div>
        </div>

        {/* Exclusive Spring Sale Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="text-lg font-semibold text-black mb-2">Exclusive Spring Sale!</h3>
          <p className="text-gray-600 text-sm mb-4">
            Up to 50% off on selected electronics and accessories. Limited time offer, shop now!
          </p>
          <div className="text-right">
            <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
