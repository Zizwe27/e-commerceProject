
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { List, Hourglass, Truck, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex items-center space-x-4">
    <div className="p-3 bg-gray-100 rounded-lg">
      <Icon className="h-6 w-6 text-gray-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default function OrderOverview({ stats }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={stats.totalOrders} icon={List} />
          <StatCard title="Pending Orders" value={stats.pendingOrders} icon={Hourglass} />
          <StatCard title="Shipped Orders" value={stats.shippedOrders} icon={Truck} />
          <StatCard title="Total Revenue" value={`ZMW ${stats.totalRevenue.toFixed(2)}`} icon={DollarSign} />
        </div>
      </CardContent>
    </Card>
  );
}
