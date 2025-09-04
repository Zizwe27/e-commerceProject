
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  refunded: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

export default function TransactionHistory({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = transactions.filter(t => 
    ((t.description || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <p className="text-sm text-gray-500">Overview of all your financial transactions.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by description" 
              className="pl-10 w-full md:w-56 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto max-h-80">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.slice(0, 5).map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.transaction_date}</TableCell>
                  <TableCell className="capitalize">{t.type}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className={`text-right font-medium ${t.amount > 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                    {t.amount > 0 ? '+' : ''}ZMW {t.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${statusStyles[t.status]} capitalize`}>{t.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 text-center">
            <Button variant="outline" className="bg-white">View More Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
}
