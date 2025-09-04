
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function TopProducts({ products }) {
  const topProducts = products
    .filter(p => p.sales_count > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Top Performing Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/60 group hover:shadow-md transition-all duration-300"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h4>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Sales: ZMW {product.revenue?.toLocaleString()}
                </Badge>
                <span className="text-sm text-gray-500">
                  {product.sales_count} units sold
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
          </motion.div>
        ))}
        {topProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No sales data available yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
