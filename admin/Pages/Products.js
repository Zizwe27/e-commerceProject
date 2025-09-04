"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Badge } from '../Components/ui/badge';
import { 
  Package, 
  Plus, 
  Upload, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  AlertTriangle
} from 'lucide-react';

// Mock data for products
const mockProductsData = {
  overview: {
    totalProducts: 12,
    activeListings: 7,
    lowStockItems: 4,
    outOfStock: 1
  },
  products: [
    {
      id: 1,
      name: "Classic Leather Handbag",
      sku: "CLH-001-BLK",
      stock: 150,
      price: 120.00,
      category: "Bags",
      status: "active",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Smart Water Bottle",
      sku: "SWB-002-STL",
      stock: 25,
      price: 45.00,
      category: "Gadgets",
      status: "low_stock"
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      sku: "EOC-003-GRY",
      stock: 5,
      price: 299.00,
      category: "Furniture",
      status: "out_of_stock"
    },
    {
      id: 4,
      name: "Handcrafted Ceramic Mug Set",
      sku: "HCM-004-SET",
      stock: 80,
      price: 30.00,
      category: "Home Goods",
      status: "active"
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      sku: "PBS-005-BLU",
      stock: 0,
      price: 75.00,
      category: "Electronics",
      status: "out_of_stock"
    },
    {
      id: 6,
      name: "Soft Knitted Throw Blanket",
      sku: "SKT-006-GRY",
      stock: 45,
      price: 65.00,
      category: "Home Goods",
      status: "active"
    },
    {
      id: 7,
      name: "Durable Hiking Backpack",
      sku: "DHB-007-GRN",
      stock: 12,
      price: 89.99,
      category: "Outdoor",
      status: "low_stock"
    },
    {
      id: 8,
      name: "Minimalist Desk Lamp",
      sku: "MDL-008-WHT",
      stock: 8,
      price: 55.00,
      category: "Furniture",
      status: "low_stock"
    },
    {
      id: 9,
      name: "Professional Watercolor Set",
      sku: "PWS-009-24",
      stock: 30,
      price: 42.50,
      category: "Arts & Crafts",
      status: "active"
    },
    {
      id: 10,
      name: "Smart Fitness Tracker",
      sku: "SFT-010-BLK",
      stock: 15,
      price: 129.99,
      category: "Electronics",
      status: "low_stock"
    },
    {
      id: 11,
      name: "Non-Stick Frying Pan",
      sku: "NSF-011-10",
      stock: 60,
      price: 35.00,
      category: "Kitchen",
      status: "active"
    },
    {
      id: 12,
      name: "Educational Building Blocks",
      sku: "EBB-012-100",
      stock: 25,
      price: 28.99,
      category: "Toys",
      status: "active"
    }
  ],
  inventoryMovements: [
    {
      product: "Classic Leather Handbag",
      date: "2024-07-28 10:30 AM",
      user: "Admin",
      action: "Added",
      quantity: 50
    },
    {
      product: "Smart Water Bottle",
      date: "2024-07-27 02:15 PM",
      user: "Customer Order",
      action: "Sold",
      quantity: -10
    },
    {
      product: "Ergonomic Office Chair",
      date: "2024-07-27 11:00 AM",
      user: "Warehouse Staff",
      action: "Adjusted",
      quantity: 3
    },
    {
      product: "Handcrafted Ceramic Mug Set",
      date: "2024-07-26 04:00 PM",
      user: "Customer Service",
      action: "Returned",
      quantity: 2
    },
    {
      product: "Portable Bluetooth Speaker",
      date: "2024-07-26 09:00 AM",
      user: "Customer Order",
      action: "Sold",
      quantity: -5
    }
  ]
};

const statusConfig = {
  active: { label: "Active", variant: "default", color: "bg-green-100 text-green-800" },
  low_stock: { label: "Low Stock", variant: "secondary", color: "bg-yellow-100 text-yellow-800" },
  out_of_stock: { label: "Out of Stock", variant: "destructive", color: "bg-red-100 text-red-800" },
  inactive: { label: "Inactive", variant: "outline", color: "bg-gray-100 text-gray-600" }
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = mockProductsData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockDisplay = (product) => {
    if (product.stock === 0) return "Out of Stock";
    if (product.stock <= 10) return `${product.stock} Low`;
    return product.stock;
  };

  const getStockColor = (product) => {
    if (product.stock === 0) return "text-red-600";
    if (product.stock <= 10) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Product & Inventory Management</h1>
      </div>

      {/* Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Overview Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockProductsData.overview.totalProducts}</div>
              <p className="text-xs text-gray-600">Overall products in catalog</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockProductsData.overview.activeListings}</div>
              <p className="text-xs text-gray-600">Currently visible to customers</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockProductsData.overview.lowStockItems}</div>
              <p className="text-xs text-gray-600">Products needing restocking soon</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockProductsData.overview.outOfStock}</div>
              <p className="text-xs text-gray-600">Products unavailable for sale</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Package className="w-5 h-5 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload CSV/Excel
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Bags">Bags</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Furniture">Furniture</option>
                <option value="Home Goods">Home Goods</option>
                <option value="Electronics">Electronics</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Arts & Crafts">Arts & Crafts</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Toys">Toys</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Listings */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <CardTitle>Product Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product Image</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-gray-600">{product.sku}</td>
                    <td className="py-3 px-4">
                      <span className={getStockColor(product)}>
                        {getStockDisplay(product)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-600">{product.category}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusConfig[product.status].color}>
                        {statusConfig[product.status].label}
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
              Showing 1-{filteredProducts.length} of {mockProductsData.products.length} products
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

      {/* Recent Inventory Movements */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <CardTitle>Recent Inventory Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProductsData.inventoryMovements.map((movement, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{movement.product}</div>
                  <div className="text-sm text-gray-600">{movement.date} by {movement.user}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Action: {movement.action}</span>
                  <Badge variant={movement.quantity > 0 ? "default" : "destructive"}>
                    {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}