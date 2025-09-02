"use client";

import React, { useState } from "react";
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Bell, ZoomIn, Truck, Calendar, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductById, addToCart } from "@/lib/db";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedColor, setSelectedColor] = useState("black");
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-black text-white hover:bg-gray-800">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  const colors = ["black", "white", "purple"];
  
  // Size selection removed - will only be relevant for clothes and shoes categories when added later

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-lg font-semibold text-black text-center flex-1">{product.title}</h1>
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            placeholder="Search Gula Store..."
            className="w-full pl-10 bg-gray-100 border-none rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Product Image */}
      <div className="relative px-4 py-6">
        <div className="relative">
          <div 
            className="w-full h-80 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url('${product.images[0]}')` }}
          />
          {product.compare_at_price && (
            <span className="absolute top-4 left-4 px-3 py-1 text-sm font-medium rounded-full bg-red-500 text-white">
              Sale
            </span>
          )}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Image Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 0 ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">{product.title}</h2>
          <p className="text-2xl font-bold text-black mb-3">${product.price}</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">({product.review_count} reviews)</span>
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Color</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{
                  backgroundColor: color === "white" ? "#ffffff" : color === "purple" ? "#a855f7" : "#000000"
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>



        {/* Delivery Information */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-black">Estimated Delivery</h4>
              <p className="text-sm text-gray-600">
                Delivers to Zambia within 3-5 business days. Free standard shipping over $50.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-black">Shipping Cost Calculator</h4>
              <p className="text-sm text-gray-600 mb-2">
                Enter your postcode to get an exact shipping estimate.
              </p>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Calculate Shipping
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-6">
            <button 
              className={`pb-2 border-b-2 font-medium ${
                activeTab === "description" 
                  ? "border-black text-black" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button 
              className={`pb-2 font-medium ${
                activeTab === "specifications" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button 
              className={`pb-2 font-medium ${
                activeTab === "reviews" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
            <button 
              className={`pb-2 font-medium ${
                activeTab === "qa" 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("qa")}
            >
              Q&A
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="text-sm text-gray-700 leading-relaxed">
            <p className="mb-4">
              {product.description}
            </p>
            <p className="mb-4">
              Experience unparalleled audio clarity with our premium wireless earbuds. 
              These earbuds deliver immersive sound and deep bass that brings 
              your music to life.
            </p>
            <p className="mb-4">
              Designed for comfort and secure fit, these earbuds feature intuitive 
              touch controls and long-lasting battery life. The sleek portable 
              charging case ensures your earbuds are always ready when you are.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="text-sm text-gray-700">
            <p>Specifications content would go here...</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-sm text-gray-700">
            <p>Reviews content would go here...</p>
          </div>
        )}

        {activeTab === "qa" && (
          <div className="text-sm text-gray-700">
            <p>Q&A content would go here...</p>
          </div>
        )}

        {/* Share This Product */}
        <div className="mb-32">
          <h3 className="text-lg font-semibold text-black mb-3">Share This Product</h3>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Facebook className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Total Price</p>
            <p className="text-lg font-bold text-black">${product.price}</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-8 py-3" onClick={handleAddToCart}>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
