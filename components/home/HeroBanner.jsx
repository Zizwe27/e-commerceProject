import React from "react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <div className="px-4">
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
  );
}