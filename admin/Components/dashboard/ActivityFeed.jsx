"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  MessageSquare, 
  Truck, 
  Package,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const getActivityIcon = (type) => {
  switch (type) {
    case 'order': return ShoppingCart;
    case 'message': return MessageSquare;
    case 'shipment': return Truck;
    case 'stock_update': return Package;
    default: return Clock;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'order': return 'text-blue-500';
    case 'message': return 'text-purple-500';
    case 'shipment': return 'text-green-500';
    case 'stock_update': return 'text-orange-500';
    default: return 'text-gray-500';
  }
};

export default function ActivityFeed({ activities }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Clock className="w-5 h-5 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="popLayout">
          {activities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No recent activity</p>
            </motion.div>
          ) : (
            activities.slice(0, 4).map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-3 hover:bg-gray-50/60 rounded-xl transition-colors duration-200 group"
                >
                  <div className={`p-2 rounded-full bg-gray-50 group-hover:scale-110 transition-transform ${getActivityColor(activity.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 leading-tight">
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {activity.timestamp ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) : 'Just now'}
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}