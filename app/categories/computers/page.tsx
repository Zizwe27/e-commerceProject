"use client";

import React from "react";
import { ArrowLeft, Search, Filter, Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, addToCart } from "@/lib/db";

export default function ComputersPage() {
  const products = getProductsByCategory('computers');

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/categories" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold text-black">Computers</h1>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search Computers..."
            className="pl-10 bg-gray-100 border-none rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Results and Filters */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">{products.length} Results Found</span>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-sm">Sort By</span>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Product Image */}
                <div className="relative">
                  <div 
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.images[0]}')` }}
                  />
                  {product.compare_at_price && (
                    <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                      Sale
                    </span>
                  )}
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-black">${product.price}</span>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-500 line-through">${product.compare_at_price}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-2 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
