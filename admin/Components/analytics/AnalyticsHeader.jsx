"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

export default function AnalyticsHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics & Insights</h1>
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white/80 border border-gray-200/60 rounded-xl">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Time Range:</span> Last 30 Days
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Category:</span> All Categories
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Channel:</span> All Channels
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
      </div>
    </div>
  );
}