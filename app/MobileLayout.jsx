
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPageUrl } from "@/lib/utils";
import { Home, LayoutGrid, Search, ShoppingCart, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCartItemCount } from "@/lib/db";

export default function MobileLayout({ children, currentPageName = null }) {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    // Update cart count when component mounts and when cart changes
    const updateCartCount = () => {
      const count = getCartItemCount();
      setCartCount(count);
      console.log('Cart count updated:', count); // Debug log
    };
    
    updateCartCount();
    
    // Listen for storage events to update cart count when cart changes in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'gula-cart') {
        updateCartCount();
      }
    };
    
    // Also listen for custom events when cart is updated
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleCartUpdate);
    
    // Periodic refresh to ensure cart count is always accurate
    const interval = setInterval(updateCartCount, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  const navigationItems = [
    { name: "Home", icon: Home, path: createPageUrl("Homepage") },
    { name: "Categories", icon: LayoutGrid, path: createPageUrl("Categories") },
    { name: "Search", icon: Search, path: createPageUrl("Search") },
    { name: "Cart", icon: ShoppingCart, path: createPageUrl("Cart"), ...(cartCount > 0 && { badge: cartCount }) },
    { name: "Account", icon: UserCircle, path: createPageUrl("Account") }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex flex-col items-center py-2 px-3 relative transition-colors ${
                  isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-black text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-black font-semibold' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
