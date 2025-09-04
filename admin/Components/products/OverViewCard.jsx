import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function OverviewCard({ title, value, description, isWarning, isDanger }) {
  let Icon = Package;
  let iconColor = 'text-blue-500';
  if (isWarning) {
    Icon = AlertTriangle;
    iconColor = 'text-amber-500';
  } else if (isDanger) {
    Icon = XCircle;
    iconColor = 'text-red-500';
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className={`p-2 bg-gray-100 rounded-lg ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}