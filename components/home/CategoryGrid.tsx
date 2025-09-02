"use client";

import React from "react";
import Link from "next/link";
import { Zap, Shirt, Home, Star, Monitor, Briefcase } from "lucide-react";
import { getCategories } from "@/lib/db";

export default function CategoryGrid() {
  const categories = getCategories();

  // Map category slugs to icons and colors
  const getCategoryDisplay = (category: any) => {
    const displayMap = {
      'electronics': {
        icon: Zap,
        color: 'bg-blue-100',
        iconColor: 'text-blue-700'
      },
      'computers': {
        icon: Monitor,
        color: 'bg-purple-100',
        iconColor: 'text-purple-700'
      },
      'travel': {
        icon: Briefcase,
        color: 'bg-green-100',
        iconColor: 'text-green-700'
      }
    };

    return displayMap[category.slug] || {
      icon: Star,
      color: 'bg-gray-100',
      iconColor: 'text-gray-700'
    };
  };

  return (
    <div className="px-4 mb-8">
      <h3 className="text-lg font-semibold text-black mb-4">Shop by Category</h3>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          const display = getCategoryDisplay(category);
          const IconComponent = display.icon;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className={`w-12 h-12 ${display.color} rounded-xl flex items-center justify-center mb-2 shadow-sm`}>
                <IconComponent className={`w-6 h-6 ${display.iconColor}`} strokeWidth={2} />
              </div>
              <span className="text-xs text-gray-700 font-medium text-center">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}