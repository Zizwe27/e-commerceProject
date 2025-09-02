import React from "react";
import { ArrowLeft, Check, Home, Briefcase, Truck, Calendar, Minus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
  const orderItems = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      quantity: 1,
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      quantity: 1,
      price: 349.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      name: "Smartwatch with Heart Rate Monitor",
      quantity: 2,
      price: 259.00,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop"
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-black">Shipping Details</h2>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="w-16 h-1 bg-black mx-2"></div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">2</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 text-sm">
          <span className="text-black font-medium">Cart</span>
          <span className="text-black font-medium">Shipping</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Shipping Address</h3>
          
          {/* Saved Addresses */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Home Address</span>
              </div>
              <Button variant="outline" className="text-gray-700 border-gray-300">
                Use
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Work Address</span>
              </div>
              <Button variant="outline" className="text-gray-700 border-gray-300">
                Use
              </Button>
            </div>
          </div>

          {/* Address Form */}
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              defaultValue="Alice Johnson"
              className="bg-white border-gray-200"
            />
            <Input
              placeholder="Address Line 1"
              defaultValue="123 Main St."
              className="bg-white border-gray-200"
            />
            <Input
              placeholder="Address Line 2 (Optional)"
              defaultValue="Apt 4B"
              className="bg-white border-gray-200"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                defaultValue="Springfield"
                className="bg-white border-gray-200"
              />
              <Input
                placeholder="State"
                defaultValue="IL"
                className="bg-white border-gray-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Zip Code"
                defaultValue="62704"
                className="bg-white border-gray-200"
              />
              <Input
                placeholder="Country"
                defaultValue="USA"
                className="bg-white border-gray-200"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="save-address"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="save-address" className="text-sm text-gray-700">
                Save this address for future use
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Order Summary</h3>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-black">${item.price}</span>
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Subtotal (3 items)</span>
                <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Tax</span>
                <span className="text-sm font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-black">Order Total</span>
                  <span className="font-bold text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-4 text-lg font-medium">
            Continue to Payment
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-4">
            <Minus className="w-5 h-5 mr-2" />
            Cancel Order
          </Button>
        </div>
      </div>
      
      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}

