import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const changeTypeStyles = {
  added: "bg-blue-100 text-blue-700",
  sold: "bg-red-100 text-red-700",
  returned: "bg-green-100 text-green-700",
  adjusted: "bg-gray-100 text-gray-700",
};

export default function InventoryMovements({ movements }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader>
        <CardTitle>Recent Inventory Movements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.map((movement) => (
            <div key={movement.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div>
                <p className="font-medium">{movement.product_name}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(movement.timestamp), 'yyyy-MM-dd hh:mm a')} by {movement.reason}
                </p>
              </div>
              <Badge className={`${changeTypeStyles[movement.change_type]} px-3 py-1`}>
                {movement.change_type.charAt(0).toUpperCase() + movement.change_type.slice(1)}{' '}
                {movement.quantity_change > 0 ? `+${movement.quantity_change}` : movement.quantity_change}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}