import React from "react";
import { Button } from "@/components/ui/button";

export default function LimitedTimeOffer() {
  return (
    <div className="px-4 pb-8">
      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-black mb-2">Limited Time Offer!</h3>
        <p className="text-gray-600 text-sm mb-4">
          Enjoy up to 50% off on all Smart Home devices. Don't miss out!
        </p>
        <Button variant="outline" className="rounded-lg">
          Discover More
        </Button>
      </div>
    </div>
  );
}