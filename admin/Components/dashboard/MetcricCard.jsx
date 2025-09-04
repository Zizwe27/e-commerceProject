"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricCard({ title, value, trend, trendValue, isPositive = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-3">
            <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
              {title}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                {value}
              </h3>
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {trendValue}
                </div>
              )}
            </div>
            {trend && (
              <p className="text-xs text-gray-500">
                {trend}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}