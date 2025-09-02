"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, ShoppingBag, Search, Bell, Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, getCartItemCount, CartItem } from "@/lib/db";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Load cart data on component mount
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart);
    setCartTotal(getCartTotal());
    setItemCount(getCartItemCount());
  };

  const handleQuantityChange = (productId: string, newQuantity: number, variant?: string) => {
    updateCartItemQuantity(productId, newQuantity, variant);
    loadCart(); // Reload cart data
  };

  const handleRemoveItem = (productId: string, variant?: string) => {
    removeFromCart(productId, variant);
    loadCart(); // Reload cart data
  };

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-black">Your Cart</h1>
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

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.variant || 'default'}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url('${item.product.images[0]}')` }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{item.product.title}</h3>
                    {item.variant && <p className="text-gray-500 text-sm">{item.variant}</p>}
                    <p className="text-lg font-semibold text-black mt-1">${item.product.price}</p>
                    <p className="text-green-600 text-sm">In Stock</p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-3">
                      <button 
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.variant)}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-medium">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.variant)}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-3">
                      <button 
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 text-sm"
                        onClick={() => handleRemoveItem(item.id, item.variant)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                      <button className="text-gray-600 hover:text-black text-sm">
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Promo Code</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  className="flex-1 bg-gray-50 border-gray-200"
                />
                <Button className="bg-black text-white hover:bg-gray-800 px-6">
                  Apply
                </Button>
              </div>
            </div>

            {/* Estimate Shipping */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Estimate Shipping</h3>
              <p className="text-gray-600 text-sm mb-2">Shipping to: 123 Main Street, Anytown, CA 90210</p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                Change Location
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Estimate</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/shipping">
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 text-lg font-medium">
                Proceed to Checkout ({itemCount} items)
              </Button>
            </Link>
          </>
        )}
      </div>
      
      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
