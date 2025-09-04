"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from "@/entities/Transaction";
import { PayoutAccount } from "@/entities/PayoutAccount";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Search, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#ef4444', '#6b7280'];

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  refunded: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState([]);
  const [payoutAccounts, setPayoutAccounts] = useState([]);
  const [user, setUser] = useState({ wallet_balance: 2890.50 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Withdrawal form state
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [transData, accountsData, userData] = await Promise.all([
        Transaction.list('-transaction_date'),
        PayoutAccount.list(),
        User.me()
      ]);
      console.log('Loaded data:', { transData, accountsData, userData });
      setTransactions(transData || []);
      setPayoutAccounts(accountsData || []);
      if (userData) setUser(userData);
    } catch (error) {
      console.error("Error loading data:", error);
      // Use mock data if entities fail
      const mockTransactions = [
        { id: '1', transaction_date: '2024-07-28', type: 'sale', description: 'Order #001', amount: 855.99, status: 'completed' },
        { id: '2', transaction_date: '2024-07-27', type: 'withdrawal', description: 'Payout to Bank', amount: -500.00, status: 'completed' },
        { id: '3', transaction_date: '2024-07-26', type: 'fee', description: 'Platform Fee (July)', amount: -15.00, status: 'completed' },
        { id: '4', transaction_date: '2024-07-25', type: 'refund', description: 'Refund for Order #098', amount: -25.50, status: 'refunded' },
        { id: '5', transaction_date: '2024-07-24', type: 'sale', description: 'Order #000', amount: 120.00, status: 'completed' }
      ];
      const mockAccounts = [
        { id: '1', bank_name: 'ZANACO', account_number: '1234567890', account_holder_name: 'John Doe' },
        { id: '2', bank_name: 'FNB Zambia', account_number: '0987654321', account_holder_name: 'John Doe' }
      ];
      console.log('Setting mock data:', { mockTransactions, mockAccounts });
      setTransactions(mockTransactions);
      setPayoutAccounts(mockAccounts);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (!agreed || !selectedAccount || !amount) return;

    try {
      await Transaction.create({
        transaction_date: new Date().toISOString().split('T')[0],
        type: 'withdrawal',
        description: `Payout to bank account`,
        amount: -parseFloat(amount),
        status: 'pending'
      });
      
      // Reset form
      setAmount('');
      setSelectedAccount('');
      setNotes('');
      setAgreed(false);
      
      loadData();
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  // Calculate stats
  const grossEarnings = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);
  const netPayouts = Math.abs(transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0));

  // Earnings breakdown data
  const breakdownData = [
    { name: 'Net Payouts', value: 7500 },
    { name: 'Platform Fees', value: 280 },
    { name: 'Payment Processing Fees', value: 284 },
    { name: 'Refunds', value: 1416 }
  ];

  const filteredTransactions = transactions.filter(t => 
    (t.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Current state:', { transactions, filteredTransactions, searchTerm });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payments & Transactions</h1>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
            <p className="text-3xl font-bold mt-2">ZMW {user.wallet_balance?.toLocaleString() || '2,890.50'}</p>
            <div className="flex items-center text-xs mt-2 text-gray-500">
              <span>Available for withdrawal</span>
            </div>
            <div className="flex items-center text-xs mt-1 text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Gross Earnings</p>
            <p className="text-3xl font-bold mt-2">ZMW 9,780.00</p>
            <div className="flex items-center text-xs mt-2 text-gray-500">
              <span>Last 30 days</span>
            </div>
            <div className="flex items-center text-xs mt-1 text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% vs previous</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Net Payouts</p>
            <p className="text-3xl font-bold mt-2">ZMW 7,500.00</p>
            <div className="flex items-center text-xs mt-2 text-gray-500">
              <span>Last 30 days</span>
            </div>
            <div className="flex items-center text-xs mt-1 text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+9.8% vs previous</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardContent className="p-5 flex flex-col justify-center h-full">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Action</h3>
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Withdraw Funds Now</Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  // TODO: Implement payout schedule modal or navigation
                  console.log('View Payout Schedule clicked');
                }}
              >
                View Payout Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Transaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 h-full">
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <p className="text-sm text-gray-500">Distribution of your gross earnings over the last 30 days.</p>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={breakdownData} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                      {breakdownData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => `ZMW ${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <p className="text-sm text-gray-500">Overview of all your financial transactions.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search by description" 
                      className="pl-10 w-56 bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
                      <SelectItem value="fee">Fee</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Select Date Range
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
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
                          {t.amount > 0 ? '+' : ''}ZMW {Math.abs(t.amount).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className={`${statusStyles[t.status]} capitalize`}>{t.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-4 text-center border-t">
                <Button variant="outline" className="bg-white">View More Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Withdrawal Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
        <CardHeader>
          <CardTitle>Request Fund Withdrawal</CardTitle>
          <p className="text-sm text-gray-500">Transfer your available balance to your linked bank account.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWithdrawal} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="amount">Amount to Withdraw</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 500.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={user.wallet_balance || 2890.50}
                />
                <p className="text-xs text-gray-500 mt-1">Available: ZMW {(user.wallet_balance || 2890.50).toLocaleString()}</p>
              </div>
              <div>
                <Label htmlFor="bank-account">Select Bank Account</Label>
                <Select onValueChange={setSelectedAccount} value={selectedAccount}>
                  <SelectTrigger id="bank-account">
                    <SelectValue placeholder="Select a bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {payoutAccounts.map(acc => (
                      <SelectItem key={acc.id} value={acc.id}>
                        {acc.bank_name} - ****{(acc.account_number || '').slice(-4)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="e.g., Monthly payout"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
              <label htmlFor="terms" className="text-sm font-medium leading-none">
                I agree to the terms and conditions for withdrawals.
              </label>
            </div>
            <div className="text-right">
              <Button type="submit" disabled={!agreed} className="bg-blue-600 hover:bg-blue-700">
                Request Withdrawal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}