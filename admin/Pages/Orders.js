"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Badge } from '../Components/ui/badge';
import { 
  List, 
  Clock, 
  Truck, 
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock data for orders
const mockOrdersData = {
  overview: {
    totalOrders: 6,
    pendingOrders: 1,
    shippedOrders: 1,
    totalRevenue: 265.49
  },
  orders: [
    {
      id: "ORD001",
      date: "2024-07-20",
      customer: "Alice Johnson",
      amount: 120.50,
      status: "delivered",
      payment: "paid"
    },
    {
      id: "ORD002", 
      date: "2024-07-19",
      customer: "Bob Smith",
      amount: 55.00,
      status: "processing",
      payment: "paid"
    },
    {
      id: "ORD003",
      date: "2024-07-18", 
      customer: "Charlie Brown",
      amount: 250.75,
      status: "pending",
      payment: "pending"
    },
    {
      id: "ORD004",
      date: "2024-07-17",
      customer: "Diana Prince", 
      amount: 89.99,
      status: "shipped",
      payment: "paid"
    },
    {
      id: "ORD005",
      date: "2024-07-16",
      customer: "Eve Adams",
      amount: 35.00,
      status: "cancelled",
      payment: "refunded"
    },
    {
      id: "ORD006",
      date: "2024-07-15",
      customer: "Frank Green",
      amount: 199.00,
      status: "processing",
      payment: "pending"
    }
  ]
};

const statusConfig = {
  delivered: { label: "Delivered", variant: "default", color: "bg-green-100 text-green-800" },
  processing: { label: "Processing", variant: "secondary", color: "bg-blue-100 text-blue-800" },
  pending: { label: "Pending", variant: "outline", color: "bg-yellow-100 text-yellow-800" },
  shipped: { label: "Shipped", variant: "default", color: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelled", variant: "destructive", color: "bg-red-100 text-red-800" }
};

const paymentConfig = {
  paid: { label: "Paid", variant: "default", color: "bg-green-100 text-green-800" },
  pending: { label: "Pending", variant: "outline", color: "bg-yellow-100 text-yellow-800" },
  refunded: { label: "Refunded", variant: "destructive", color: "bg-red-100 text-red-800" }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('');

  const filteredOrders = mockOrdersData.orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.payment === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleApplyFilters = () => {
    // Filter logic is already applied in the filteredOrders calculation
    console.log('Filters applied:', { statusFilter, paymentFilter, dateRange });
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateRange('');
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
      </div>

      {/* Order Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <List className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockOrdersData.overview.totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockOrdersData.overview.pendingOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Shipped Orders</CardTitle>
            <Truck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockOrdersData.overview.shippedOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${mockOrdersData.overview.totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Orders */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select 
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <Input
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Pick a date range"
              />
            </div>
            
            <div className="flex items-end space-x-2">
              <Button onClick={handleApplyFilters} className="bg-blue-600 hover:bg-blue-700">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Orders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusConfig[order.status].color}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={paymentConfig[order.payment].color}>
                        {paymentConfig[order.payment].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {mockOrdersData.orders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <span>Previous</span>
              </Button>
              <Button variant="outline" size="sm">
                <span>Next</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}