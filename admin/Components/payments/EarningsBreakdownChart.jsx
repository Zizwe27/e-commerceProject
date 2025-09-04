import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#ef4444', '#6b7280'];

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="grid grid-cols-2 gap-2 mt-4 text-sm">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default function EarningsBreakdownChart({ transactions }) {
  const breakdown = transactions.reduce((acc, t) => {
    if (t.type === 'sale') acc.netPayouts += t.amount;
    if (t.type === 'fee') acc.platformFees += Math.abs(t.amount);
    if (t.type === 'refund') acc.refunds += Math.abs(t.amount);
    return acc;
  }, { netPayouts: 0, platformFees: 0, refunds: 0, other: 0 });

  // Example processing fees
  breakdown.paymentProcessingFees = breakdown.netPayouts * 0.029;
  breakdown.netPayouts -= (breakdown.platformFees + breakdown.refunds + breakdown.paymentProcessingFees);

  const data = [
    { name: 'Net Payouts', value: breakdown.netPayouts },
    { name: 'Platform Fees', value: breakdown.platformFees },
    { name: 'Payment Processing Fees', value: breakdown.paymentProcessingFees },
    { name: 'Refunds', value: breakdown.refunds },
  ].filter(d => d.value > 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 h-full">
      <CardHeader>
        <CardTitle>Earnings Breakdown</CardTitle>
        <p className="text-sm text-gray-500">Distribution of your gross earnings over the last 30 days.</p>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `ZMW ${value.toLocaleString(undefined, {minimumFractionDigits: 2})}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Legend content={<CustomLegend />} />
      </CardContent>
    </Card>
  );
}