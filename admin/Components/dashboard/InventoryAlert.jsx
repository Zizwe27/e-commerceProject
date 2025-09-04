"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InventoryAlert({ products, onRestock }) {
  const lowStockProducts = products.filter(p => p.stock_quantity <= p.low_stock_threshold);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Inventory Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence mode="popLayout">
          {lowStockProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>All products are well stocked!</p>
            </motion.div>
          ) : (
            lowStockProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-200/60"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      {product.stock_quantity} in stock
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onRestock(product.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all"
                >
                  Restock Now
                </Button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}