"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Badge } from '../Components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Search,
  Calendar,
  Filter
} from 'lucide-react';

// Mock data for analytics
const mockAnalyticsData = {
  metrics: [
    {
      title: "Total Revenue",
      value: "$125,450.78",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Total Orders", 
      value: "2,150",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart
    },
    {
      title: "Average Order Value",
      value: "$58.35", 
      change: "-1.1%",
      trend: "down",
      icon: BarChart3
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: "+0.5%", 
      trend: "up",
      icon: Users
    }
  ],
  topProducts: [
    { name: "Wireless Earbuds Pro", sales: 1580, revenue: 15800 },
    { name: "Smartwatch Series 5", sales: 1200, revenue: 24000 },
    { name: "Portable Bluetooth Speaker", sales: 950, revenue: 7125 },
    { name: "USB-C Hub Adapter", sales: 800, revenue: 4000 },
    { name: "Ergonomic Office Chair", sales: 650, revenue: 19500 }
  ],
  topCategories: [
    { name: "Electronics", revenue: 25000 },
    { name: "Home Goods", revenue: 18000 },
    { name: "Apparel", revenue: 15000 },
    { name: "Health & Beauty", revenue: 12000 },
    { name: "Books", revenue: 8000 }
  ],
  customerPatterns: [
    { name: "Alice Wonderland", orders: 15, spent: 1250.75, lastOrder: "2024-03-22" },
    { name: "Bob The Builder", orders: 12, spent: 980.50, lastOrder: "2024-03-20" },
    { name: "Charlie Chaplin", orders: 8, spent: 720.00, lastOrder: "2024-03-18" },
    { name: "Diana Prince", orders: 20, spent: 1800.25, lastOrder: "2024-03-25" },
    { name: "Eve Harrington", orders: 7, spent: 550.90, lastOrder: "2024-03-15" },
    { name: "Frank Sinatra", orders: 10, spent: 890.10, lastOrder: "2024-03-19" },
    { name: "Grace Kelly", orders: 18, spent: 1500.00, lastOrder: "2024-03-21" }
  ],
  refundData: [
    { orderId: "ORD1001", product: "Wireless Earbuds Pro", refund: 50.00, event: "Newsletter Signup", date: "2024-03-20" },
    { orderId: "ORD1002", product: "Smartwatch Series 5", refund: 0.00, event: "App Download", date: "2024-03-21" },
    { orderId: "ORD1003", product: "Portable Bluetooth Speaker", refund: 20.00, event: "Product Review", date: "2024-03-22" },
    { orderId: "ORD1004", product: "USB-C Hub Adapter", refund: 0.00, event: "Referral Conversion", date: "2024-03-23" },
    { orderId: "ORD1005", product: "Ergonomic Office Chair", refund: 0.00, event: "First Purchase", date: "2024-03-24" },
    { orderId: "ORD1006", product: "Wireless Earbuds Pro", refund: 0.00, event: "Newsletter Signup", date: "2024-03-25" },
    { orderId: "ORD1007", product: "Smartwatch Series 5", refund: 30.00, event: "Product Review", date: "2024-03-26" }
  ]
};

export default function AnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [refundSearchTerm, setRefundSearchTerm] = useState('');

  const filteredCustomers = mockAnalyticsData.customerPatterns.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  const filteredRefunds = mockAnalyticsData.refundData.filter(refund =>
    refund.product.toLowerCase().includes(refundSearchTerm.toLowerCase()) ||
    refund.orderId.toLowerCase().includes(refundSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            All Categories
          </Button>
          <Button variant="outline" size="sm">
            All Channels
          </Button>
          <Button size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAnalyticsData.metrics.map((metric, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center text-xs">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {metric.change} vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Top 5 Selling Products</CardTitle>
            <p className="text-sm text-gray-600">Products with the highest sales count</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalyticsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-600">{product.sales} sales</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(product.sales / 1580) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Top 5 Product Categories</CardTitle>
            <p className="text-sm text-gray-600">Categories generating the most revenue</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalyticsData.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-600">${category.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(category.revenue / 25000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Patterns Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Purchase Patterns</CardTitle>
              <p className="text-sm text-gray-600">Customer behavior and spending patterns</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Total Orders</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Order Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{customer.name}</td>
                    <td className="py-3 px-4 text-gray-600">{customer.orders}</td>
                    <td className="py-3 px-4 text-gray-600">${customer.spent.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-600">{customer.lastOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Refund & Conversion Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Refund & Conversion Tracking</CardTitle>
              <p className="text-sm text-gray-600">Track refunds and conversion events</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={refundSearchTerm}
                onChange={(e) => setRefundSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Refund Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion Event</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map((refund, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{refund.orderId}</td>
                    <td className="py-3 px-4 text-gray-600">{refund.product}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {refund.refund > 0 ? `$${refund.refund.toFixed(2)}` : '$0.00'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={refund.refund > 0 ? "destructive" : "default"}>
                        {refund.event}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{refund.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}