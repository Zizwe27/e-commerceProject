"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  BarChart3, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Megaphone,
  Menu,
  X,
  Settings,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeToggle } from '../ui/theme-toggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, component: 'Dashboard' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, component: 'Analytics' },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, component: 'Orders' },
  { name: 'Products', href: '/products', icon: Package, component: 'Products' },
  { name: 'Payments', href: '/payments', icon: CreditCard, component: 'Payments' },
  { name: 'Marketing', href: '/marketing', icon: Megaphone, component: 'Marketing' },
  { name: 'Settings', href: '/settings', icon: Settings, component: 'Settings' },
];

export default function MainLayout({ children, currentPage = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (page) => {
    router.push(page.href);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-card border-r border-border">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-foreground">E-commerce Admin</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                  currentPage === item.name
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r border-border">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-foreground">E-commerce Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                  currentPage === item.name
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h2 className="text-lg font-semibold text-foreground">{currentPage}</h2>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/settings')}
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      </div>
    </ThemeProvider>
  );
} 