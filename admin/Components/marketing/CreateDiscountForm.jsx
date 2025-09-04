"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { DiscountCampaign } from "../../Entities/DiscountCampaign";
import { Calendar, Percent, DollarSign, Users, Clock, Gift } from "lucide-react";

const CATEGORIES = [
  'Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports', 'Beauty', 
  'Automotive', 'Food & Beverages', 'Health', 'Toys'
];

export default function CreateDiscountForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    campaign_name: '',
    campaign_code: '',
    discount_type: 'percentage',
    discount_value: '',
    minimum_purchase: '',
    customer_eligibility: 'all_customers',
    usage_limit: '',
    usage_per_customer: 1,
    start_date: '',
    end_date: '',
    applicable_categories: [],
    combinable_with: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateCode = () => {
    const prefix = 'SALES';
    const suffix = new Date().getFullYear().toString() + 'SUMMER';
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setFormData(prev => ({ ...prev, campaign_code: `${prefix}${randomNum}${suffix}` }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      applicable_categories: prev.applicable_categories.includes(category)
        ? prev.applicable_categories.filter(c => c !== category)
        : [...prev.applicable_categories, category]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await DiscountCampaign.create({
        ...formData,
        discount_value: parseFloat(formData.discount_value),
        minimum_purchase: parseFloat(formData.minimum_purchase) || 0,
        usage_limit: parseInt(formData.usage_limit) || null,
        usage_per_customer: parseInt(formData.usage_per_customer) || 1
      });
      onSuccess();
      // Reset form
      setFormData({
        campaign_name: '', campaign_code: '', discount_type: 'percentage',
        discount_value: '', minimum_purchase: '', customer_eligibility: 'all_customers',
        usage_limit: '', usage_per_customer: 1, start_date: '', end_date: '',
        applicable_categories: [], combinable_with: []
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-600" />
              Create New Discount Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campaign Basics */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 1</Badge>
                  Campaign Details
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={formData.campaign_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                      placeholder="e.g., Summer Sale 2024"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="code">Discount Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="code"
                        value={formData.campaign_code}
                        onChange={(e) => setFormData(prev => ({ ...prev, campaign_code: e.target.value.toUpperCase() }))}
                        placeholder="SALES2024SUMMER"
                        required
                      />
                      <Button type="button" variant="outline" onClick={generateCode}>
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 2</Badge>
                  Discount Value
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Discount Method</Label>
                    <Select value={formData.discount_type} onValueChange={(value) => setFormData(prev => ({ ...prev, discount_type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4" />
                            Percentage
                          </div>
                        </SelectItem>
                        <SelectItem value="fixed_amount">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Fixed Amount (ZMW)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.discount_value}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_value: e.target.value }))}
                      placeholder={formData.discount_type === 'percentage' ? '10' : '50'}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimum">Minimum Purchase (ZMW)</Label>
                    <Input
                      id="minimum"
                      type="number"
                      value={formData.minimum_purchase}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimum_purchase: e.target.value }))}
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Eligibility */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 3</Badge>
                  Customer Eligibility
                </div>

                <Select value={formData.customer_eligibility} onValueChange={(value) => setFormData(prev => ({ ...prev, customer_eligibility: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_customers">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        All customers
                      </div>
                    </SelectItem>
                    <SelectItem value="specific_segments">Specific customer segments</SelectItem>
                    <SelectItem value="specific_customers">Specific customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Usage Limits */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 4</Badge>
                  Usage Limits
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-limit">Total Usage Limit</Label>
                    <Input
                      id="total-limit"
                      type="number"
                      value={formData.usage_limit}
                      onChange={(e) => setFormData(prev => ({ ...prev, usage_limit: e.target.value }))}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-limit">Limit per Customer</Label>
                    <Input
                      id="customer-limit"
                      type="number"
                      value={formData.usage_per_customer}
                      onChange={(e) => setFormData(prev => ({ ...prev, usage_per_customer: e.target.value }))}
                      placeholder="1"
                    />
                  </div>
                </div>
              </div>

              {/* Active Dates */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 5</Badge>
                  <Clock className="w-4 h-4" />
                  Active Dates
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start">Start Date</Label>
                    <Input
                      id="start"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end">End Date</Label>
                    <Input
                      id="end"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Product Categories */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Badge variant="outline">Step 6</Badge>
                  Applicable Categories
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.applicable_categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={category} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline">Save Draft</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? 'Creating...' : 'Create Campaign'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Sidebar */}
      <div>
        <Card className="bg-blue-50/50 border-blue-200/60 sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg">Campaign Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-lg">{formData.campaign_code || 'SALES2024SUMMER'}</h3>
              <p className="text-sm text-gray-600 mt-1">Code</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{formData.discount_type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Details:</span>
                <div className="text-right">
                  {formData.discount_value && (
                    <div>Discount: {formData.discount_type === 'percentage' ? `${formData.discount_value}%` : `ZMW ${formData.discount_value}`} off</div>
                  )}
                  {formData.minimum_purchase && (
                    <div className="text-xs text-gray-500">Min: ZMW {formData.minimum_purchase}</div>
                  )}
                </div>
              </div>

              {formData.applicable_categories.length > 0 && (
                <div>
                  <span className="text-gray-600">Categories:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.applicable_categories.slice(0, 3).map(cat => (
                      <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                    ))}
                    {formData.applicable_categories.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{formData.applicable_categories.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}