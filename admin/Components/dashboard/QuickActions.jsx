"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Package } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: "Add New Product",
      icon: Plus,
      url: '/products/add',
      primary: true
    },
    {
      title: "View All Orders",
      icon: Eye,
      url: '/orders',
      primary: false
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Package className="w-5 h-5 text-blue-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              asChild
              className={`w-full justify-start gap-3 h-12 text-left transition-all duration-200 ${
                action.primary
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/60'
              }`}
            >
              <Link href={action.url}>
                <action.icon className="w-5 h-5" />
                {action.title}
              </Link>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}