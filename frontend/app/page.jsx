"use client";

import React from 'react';
import Link from 'next/link';
import { useFirebaseAuth } from '../src/contexts/FirebaseAuthContext';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated } = useFirebaseAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">E-commerce Store</h1>
            </div>
            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user?.displayName || user?.email}</span>
                  <a href="http://localhost:3001">
                    <Button variant="outline">Admin Panel</Button>
                  </a>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              We provide the best shopping experience with quality products and excellent service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Easy Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Browse and purchase products with our intuitive shopping experience
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  24/7 customer support to help you with any questions or issues
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Package className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Quality Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We only sell high-quality products from trusted brands and suppliers
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Competitive prices with regular discounts and special offers
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of satisfied customers and discover amazing products today
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Create Account
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 E-commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}