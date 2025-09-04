import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import { Order } from "@/entities/Order";
import { Activity } from "@/entities/Activity";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

import MetricCard from "../components/dashboard/MetricCard";
import InventoryAlert from "../components/dashboard/InventoryAlert";
import TopProducts from "../components/dashboard/TopProducts";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [productsData, ordersData, activitiesData] = await Promise.all([
        Product.list(),
        Order.list(),
        Activity.list("-created_date", 10)
      ]);
      
      setProducts(productsData);
      setOrders(ordersData);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestock = async (productId) => {
    // This would connect to your backend
    console.log("Restocking product:", productId);
    // Example: await Product.update(productId, { stock_quantity: 50 });
    // loadDashboardData(); // Refresh data
  };

  const handleAddProduct = () => {
    console.log("Add new product clicked");
    // Navigate to add product page or open modal
  };

  const handleViewOrders = () => {
    console.log("View all orders clicked");
    // Navigate to orders page
  };

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Revenue"
            value={`ZMW ${totalRevenue.toLocaleString()}`}
            trend="+15.2% from last month"
            trendValue="+15.2%"
            isPositive={true}
            delay={0.1}
          />
          <MetricCard
            title="Total Orders"
            value={totalOrders}
            trend="+8.1% from last month"
            trendValue="+8.1%"
            isPositive={true}
            delay={0.2}
          />
          <MetricCard
            title="Average Order Value"
            value={`ZMW ${averageOrderValue.toFixed(2)}`}
            trend="-2.5% from last month"
            trendValue="-2.5%"
            isPositive={false}
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:col-span-3 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InventoryAlert 
                products={products} 
                onRestock={handleRestock}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ActivityFeed activities={activities} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TopProducts products={products} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <QuickActions
                onAddProduct={handleAddProduct}
                onViewOrders={handleViewOrders}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
