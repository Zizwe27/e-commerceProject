"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Users, 
  BarChart3,
  ArrowRight
} from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: 'ZMW 45,231',
    change: '+20.1%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-green-500',
  },
  {
    name: 'Orders',
    value: '2,350',
    change: '+180.1%',
    changeType: 'positive',
    icon: ShoppingCart,
    color: 'bg-blue-500',
  },
  {
    name: 'Products',
    value: '12,234',
    change: '+19%',
    changeType: 'positive',
    icon: Package,
    color: 'bg-purple-500',
  },
  {
    name: 'Active Customers',
    value: '573',
    change: '+201',
    changeType: 'positive',
    icon: Users,
    color: 'bg-orange-500',
  },
];

const quickActions = [
  {
    name: 'View Analytics',
    description: 'Check your business performance',
    href: '/analytics',
    icon: BarChart3,
    color: 'bg-blue-500',
  },
  {
    name: 'Manage Orders',
    description: 'Process and track orders',
    href: '/orders',
    icon: ShoppingCart,
    color: 'bg-green-500',
  },
  {
    name: 'Update Products',
    description: 'Add or modify product catalog',
    href: '/products',
    icon: Package,
    color: 'bg-purple-500',
  },
  {
    name: 'Payment Overview',
    description: 'Monitor transactions and revenue',
    href: '/payments',
    icon: CreditCard,
    color: 'bg-orange-500',
  },
];

export default function DashboardOverview() {
  const router = useRouter();
  
  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100 text-lg">
          Here's what's happening with your e-commerce business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card 
            key={action.name} 
            className="bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleNavigation(action.href)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${action.color} bg-opacity-10`}>
                  <action.icon className={`h-6 w-6 ${action.color.replace('bg-', 'text-')}`} />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.name}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '#1234', customer: 'John Doe', amount: 'ZMW 299.99', status: 'Delivered' },
                { id: '#1235', customer: 'Jane Smith', amount: 'ZMW 199.99', status: 'Processing' },
                { id: '#1236', customer: 'Bob Johnson', amount: 'ZMW 399.99', status: 'Shipped' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleNavigation('/orders')}
            >
              View All Orders
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Wireless Headphones', sales: 234, revenue: 'ZMW 23,400' },
                { name: 'Smart Watch', sales: 189, revenue: 'ZMW 18,900' },
                { name: 'Laptop Stand', sales: 156, revenue: 'ZMW 7,800' },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 mr-3">#{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">{product.revenue}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleNavigation('/products')}
            >
              View All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 