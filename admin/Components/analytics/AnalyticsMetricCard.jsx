"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function AnalyticsMetricCard({ title, value, trend, isPositive = false }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline justify-between mt-2">
          <p className="text-3xl font-bold">{value}</p>
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trend}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">vs last month</p>
      </CardContent>
    </Card>
  );
}