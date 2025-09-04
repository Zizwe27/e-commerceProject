"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TopProductsChart({ data }) {
  const chartData = data.map(p => ({ name: p.name, value: p.sales_count })).sort((a,b) => a.value - b.value);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader>
        <CardTitle>Top 5 Selling Products</CardTitle>
        <p className="text-sm text-gray-500">Products with the highest sales count.</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
              <XAxis type="number" stroke="#888888" fontSize={12} />
              <YAxis type="category" dataKey="name" width={100} stroke="#888888" fontSize={12} tick={{ width: 100, textOverflow: 'ellipsis', overflow: 'hidden' }} />
              <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '0.5rem' }} />
              <Bar dataKey="value" fill="#3b82f6" name="Sales Count" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}