
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search } from "lucide-react";

const statusStyles = {
  delivered: "bg-gray-100 text-gray-700 border-gray-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  shipped: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const paymentStyles = {
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  refunded: "bg-red-100 text-red-700 border-red-200",
};

export default function OrderTable({ orders, onSearchChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search Orders..." 
            className="pl-10 w-full md:w-64 bg-white" 
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <TableCell className="font-medium">{order.order_id}</TableCell>
                  <TableCell>{order.order_date}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>ZMW {order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusStyles[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${paymentStyles[order.payment_status]}`}>
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-4 pt-4">
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
