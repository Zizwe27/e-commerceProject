
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesTrendChart({ data }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader>
        <CardTitle>Sales Trends</CardTitle>
        <p className="text-sm text-gray-500">Revenue and order volume over the past 12 months.</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickFormatter={(value) => `ZMW ${value/1000}K`} />
              <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} hide />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '0.5rem' }}
                formatter={(value, name) => name === 'Revenue' ? `ZMW ${value.toLocaleString()}` : value.toLocaleString()}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="Orders" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}