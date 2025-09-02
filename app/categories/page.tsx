import React from "react";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Zap, Monitor, Briefcase, Star } from "lucide-react";
import { getCategories } from "@/lib/db";

export default function CategoriesPage() {
  const categories = getCategories();
  
  // Map category slugs to icons and colors
  const getCategoryDisplay = (category) => {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold text-black">Categories</h1>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search Gula Store..."
            className="pl-10 bg-gray-100 border-none rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 py-8">
        <h2 className="text-lg font-semibold text-black mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category) => {
            const display = getCategoryDisplay(category);
            const IconComponent = display.icon;
            
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-20 h-20 ${display.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-10 h-10 ${display.iconColor}`} strokeWidth={2} />
                </div>
                <span className="text-base font-medium text-gray-900 text-center">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
