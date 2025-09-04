import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function PaymentMetricCard({ title, value, trend, isPositive }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-2">ZMW {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div className={`flex items-center text-xs mt-2 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>{trend} vs previous</span>
        </div>
      </CardContent>
    </Card>
  );
}