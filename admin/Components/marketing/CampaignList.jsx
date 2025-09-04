"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { MoreVertical, Calendar, Users, TrendingUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DiscountCampaign } from "../../Entities/DiscountCampaign";

export default function CampaignList({ campaigns, onUpdate }) {
  const toggleCampaign = async (campaignId, currentStatus) => {
    try {
      await DiscountCampaign.update(campaignId, { is_active: !currentStatus });
      onUpdate();
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Campaigns</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {campaigns.filter(c => c.is_active).length} Active
        </Badge>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold">{campaign.campaign_name}</h3>
                    <Badge className="bg-blue-100 text-blue-700 font-mono">
                      {campaign.campaign_code}
                    </Badge>
                    <Badge variant={campaign.is_active ? "default" : "secondary"}>
                      {campaign.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">
                          {campaign.discount_type === 'percentage' 
                            ? `${campaign.discount_value}% off` 
                            : `ZMW ${campaign.discount_value} off`}
                        </p>
                        <p className="text-xs text-gray-500">Discount</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {campaign.customer_eligibility.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-500">Eligibility</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">
                          {campaign.start_date} - {campaign.end_date || 'No end'}
                        </p>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {campaign.usage_limit ? `${campaign.usage_limit} max` : 'Unlimited'}
                      </p>
                      <p className="text-xs text-gray-500">Usage Limit</p>
                    </div>
                  </div>

                  {campaign.minimum_purchase > 0 && (
                    <p className="text-sm text-gray-600">
                      Minimum purchase: ZMW {campaign.minimum_purchase}
                    </p>
                  )}

                  {campaign.applicable_categories?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">Categories:</p>
                      <div className="flex flex-wrap gap-1">
                        {campaign.applicable_categories.slice(0, 5).map(cat => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {campaign.applicable_categories.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{campaign.applicable_categories.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={campaign.is_active}
                    onCheckedChange={() => toggleCampaign(campaign.id, campaign.is_active)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {campaigns.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500">Create your first discount campaign to start engaging with customers in Zambia.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}