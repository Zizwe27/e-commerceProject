
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from '@/entities/Transaction';
import { User } from '@/entities/User';

export default function WithdrawalRequestForm({ payoutAccounts, onWithdrawal, walletBalance }) {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || !selectedAccount || !amount || parseFloat(amount) <= 0) {
        setError('Please fill all required fields and agree to the terms.');
        return;
    }
    if (parseFloat(amount) > walletBalance) {
        setError('Withdrawal amount cannot exceed your wallet balance.');
        return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
        const currentUser = await User.me();
        if (!currentUser) {
          setError("Could not verify your identity. Please refresh and try again.");
          setIsSubmitting(false);
          return;
        }

        const withdrawalAmount = parseFloat(amount);
        // Create withdrawal transaction
        await Transaction.create({
            transaction_date: new Date().toISOString().split('T')[0],
            type: 'withdrawal',
            description: `Payout to bank account ending in ${selectedAccount.slice(-4)}`,
            amount: -withdrawalAmount,
            status: 'pending'
        });

        // Update user's wallet balance
        await User.updateMyUserData({ wallet_balance: (currentUser.wallet_balance || 0) - withdrawalAmount });

        setAmount('');
        setSelectedAccount('');
        setNotes('');
        setAgreed(false);
        onWithdrawal(); // Refresh parent component data
    } catch (err) {
        console.error("Withdrawal failed:", err);
        setError("An error occurred. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
      <CardHeader>
        <CardTitle>Request Fund Withdrawal</CardTitle>
        <p className="text-sm text-gray-500">Transfer your available balance to your linked bank account.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="amount">Amount to Withdraw (ZMW)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`e.g., 500.00`}
                max={walletBalance}
              />
              <p className="text-xs text-gray-500 mt-1">Available: ZMW {walletBalance.toFixed(2)}</p>
            </div>
            <div>
              <Label htmlFor="bank-account">Select Bank Account</Label>
              <Select onValueChange={setSelectedAccount} value={selectedAccount}>
                <SelectTrigger id="bank-account">
                  <SelectValue placeholder="Select a bank account" />
                </SelectTrigger>
                <SelectContent>
                  {(payoutAccounts || []).map(acc => (
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Monthly payout"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the <a href="#" className="text-blue-600 underline">terms and conditions</a> for withdrawals.
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="text-right">
            <Button type="submit" disabled={!agreed || isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
