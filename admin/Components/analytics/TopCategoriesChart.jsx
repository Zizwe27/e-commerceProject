
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TopCategoriesChart({ data }) {
  const chartData = [...data].sort((a, b) => a.value - b.value);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader>
        <CardTitle>Top 5 Product Categories</CardTitle>
        <p className="text-sm text-gray-500">Categories generating the most revenue.</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" stroke="#888888" fontSize={12} tickFormatter={(value) => `ZMW ${value/1000}K`} />
              <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} />
              <Tooltip 
                cursor={{fill: 'rgba(236, 253, 245, 0.5)'}}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '0.5rem' }}
                formatter={(value) => `ZMW ${value.toLocaleString()}`}
              />
              <Bar dataKey="value" fill="#22c55e" name="Revenue" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
