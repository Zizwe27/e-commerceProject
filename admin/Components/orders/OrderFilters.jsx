"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function OrderFilters({ onFilterChange }) {
  const [status, setStatus] = React.useState('all');
  const [paymentStatus, setPaymentStatus] = React.useState('all');
  const [date, setDate] = React.useState(null);

  const handleApply = () => {
    onFilterChange(prev => ({
      ...prev,
      status,
      paymentStatus,
      dateRange: date
    }));
  };

  const handleReset = () => {
    setStatus('all');
    setPaymentStatus('all');
    setDate(null);
    onFilterChange({
      status: 'all',
      paymentStatus: 'all',
      dateRange: null,
      searchTerm: ''
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Filter Orders</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentStatus} onValueChange={setPaymentStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Payment Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[240px] justify-start text-left font-normal bg-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
          <Button variant="ghost" onClick={handleReset}>Reset Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}