"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Label } from '../Components/ui/label';
import { Textarea } from '../Components/ui/textarea';
import { Badge } from '../Components/ui/badge';
import { Switch } from '../Components/ui/switch';
import { 
  Plus, 
  Calendar, 
  Percent, 
  DollarSign, 
  Users, 
  Clock, 
  Gift,
  Upload,
  Image as ImageIcon,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

// Mock data for marketing
const mockMarketingData = {
  campaigns: [
    {
      id: '1',
      campaign_name: 'Summer Sale 2024',
      campaign_code: 'SUMMER2024',
      discount_type: 'percentage',
      discount_value: 20,
      is_active: true,
      created_date: '2024-07-01',
      start_date: '2024-07-01',
      end_date: '2024-08-31',
      customer_eligibility: 'all_customers',
      minimum_purchase: 100,
      usage_limit: 1000,
      applicable_categories: ['Electronics', 'Clothing']
    },
    {
      id: '2',
      campaign_name: 'New Customer Welcome',
      campaign_code: 'WELCOME20',
      discount_type: 'fixed',
      discount_value: 50,
      is_active: true,
      created_date: '2024-06-15',
      start_date: '2024-06-15',
      end_date: '2024-12-31',
      customer_eligibility: 'new_customers',
      minimum_purchase: 0,
      usage_limit: 500,
      applicable_categories: []
    },
    {
      id: '3',
      campaign_name: 'Black Friday Deal',
      campaign_code: 'BLACKFRI30',
      discount_type: 'percentage',
      discount_value: 30,
      is_active: false,
      created_date: '2024-05-20',
      start_date: '2024-11-24',
      end_date: '2024-11-30',
      customer_eligibility: 'all_customers',
      minimum_purchase: 200,
      usage_limit: 2000,
      applicable_categories: ['Electronics', 'Home Goods', 'Clothing']
    }
  ],
  banners: [
    {
      id: '1',
      title: 'Summer Collection',
      description: 'Discover our latest summer styles',
      is_active: true,
      created_date: '2024-07-01',
      image_url: '/images/summer-collection.jpg',
      link_url: '/collections/summer',
      start_date: '2024-07-01',
      end_date: '2024-08-31'
    },
    {
      id: '2',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
      is_active: true,
      created_date: '2024-06-20',
      image_url: '/images/free-shipping.jpg',
      link_url: '/shipping-info',
      start_date: '2024-06-20',
      end_date: '2024-12-31'
    },
    {
      id: '3',
      title: 'Limited Time Offer',
      description: 'Up to 50% off selected items',
      is_active: false,
      created_date: '2024-06-01',
      image_url: '/images/limited-offer.jpg',
      link_url: '/deals',
      start_date: '2024-06-01',
      end_date: '2024-06-30'
    }
  ]
};

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState(mockMarketingData.campaigns);
  const [banners, setBanners] = useState(mockMarketingData.banners);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBannerForm, setShowBannerForm] = useState(false);
  
  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    campaign_name: '',
    campaign_code: '',
    discount_type: 'percentage',
    discount_value: '',
    minimum_purchase: '',
    usage_limit: '',
    start_date: '',
    end_date: '',
    customer_eligibility: 'all_customers',
    applicable_categories: []
  });

  // Banner form state
  const [bannerForm, setBannerForm] = useState({
    title: '',
    description: '',
    link_url: '',
    start_date: '',
    end_date: ''
  });

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...campaignForm,
      id: Date.now().toString(),
      is_active: true,
      created_date: new Date().toISOString().split('T')[0]
    };
    setCampaigns([...campaigns, newCampaign]);
    setCampaignForm({
      campaign_name: '',
      campaign_code: '',
      discount_type: 'percentage',
      discount_value: '',
      minimum_purchase: '',
      usage_limit: '',
      start_date: '',
      end_date: '',
      customer_eligibility: 'all_customers',
      applicable_categories: []
    });
    setShowCreateForm(false);
  };

  const handleBannerSubmit = (e) => {
    e.preventDefault();
    const newBanner = {
      ...bannerForm,
      id: Date.now().toString(),
      is_active: true,
      created_date: new Date().toISOString().split('T')[0],
      image_url: '/images/placeholder-banner.jpg'
    };
    setBanners([...banners, newBanner]);
    setBannerForm({
      title: '',
      description: '',
      link_url: '',
      start_date: '',
      end_date: ''
    });
    setShowBannerForm(false);
  };

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, is_active: !campaign.is_active }
        : campaign
    ));
  };

  const toggleBannerStatus = (bannerId) => {
    setBanners(banners.map(banner => 
      banner.id === bannerId 
        ? { ...banner, is_active: !banner.is_active }
        : banner
    ));
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
  };

  const deleteBanner = (bannerId) => {
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  const generateCampaignCode = () => {
    const code = 'CAMP' + Date.now().toString().slice(-6);
    setCampaignForm({ ...campaignForm, campaign_code: code });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Tools</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Discount Campaigns
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'banners'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Marketing Banners
          </button>
        </nav>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Create Campaign Button */}
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Campaign
            </Button>
          </div>

          {/* Create Campaign Form */}
          {showCreateForm && (
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
              <CardHeader>
                <CardTitle>Create Discount Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCampaignSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaign_name">Campaign Name</Label>
                      <Input
                        id="campaign_name"
                        value={campaignForm.campaign_name}
                        onChange={(e) => setCampaignForm({ ...campaignForm, campaign_name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign_code">Campaign Code</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="campaign_code"
                          value={campaignForm.campaign_code}
                          onChange={(e) => setCampaignForm({ ...campaignForm, campaign_code: e.target.value })}
                          required
                        />
                        <Button type="button" variant="outline" onClick={generateCampaignCode}>
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="discount_type">Discount Type</Label>
                      <select
                        id="discount_type"
                        value={campaignForm.discount_type}
                        onChange={(e) => setCampaignForm({ ...campaignForm, discount_type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="discount_value">Discount Value</Label>
                      <Input
                        id="discount_value"
                        type="number"
                        value={campaignForm.discount_value}
                        onChange={(e) => setCampaignForm({ ...campaignForm, discount_value: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="minimum_purchase">Minimum Purchase</Label>
                      <Input
                        id="minimum_purchase"
                        type="number"
                        value={campaignForm.minimum_purchase}
                        onChange={(e) => setCampaignForm({ ...campaignForm, minimum_purchase: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="usage_limit">Usage Limit</Label>
                      <Input
                        id="usage_limit"
                        type="number"
                        value={campaignForm.usage_limit}
                        onChange={(e) => setCampaignForm({ ...campaignForm, usage_limit: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={campaignForm.start_date}
                        onChange={(e) => setCampaignForm({ ...campaignForm, start_date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={campaignForm.end_date}
                        onChange={(e) => setCampaignForm({ ...campaignForm, end_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Campaigns List */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader>
              <CardTitle>Discount Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{campaign.campaign_name}</h3>
                          <Badge className={campaign.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                            {campaign.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">{campaign.campaign_code}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Percent className="h-4 w-4 mr-1" />
                            {campaign.discount_type === 'percentage' ? `${campaign.discount_value}%` : `$${campaign.discount_value}`} off
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Min: ${campaign.minimum_purchase}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Limit: {campaign.usage_limit}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {campaign.start_date} - {campaign.end_date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={campaign.is_active}
                          onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                        />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteCampaign(campaign.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          {/* Create Banner Button */}
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowBannerForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Banner
            </Button>
          </div>

          {/* Create Banner Form */}
          {showBannerForm && (
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
              <CardHeader>
                <CardTitle>Create Marketing Banner</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBannerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="banner_title">Banner Title</Label>
                      <Input
                        id="banner_title"
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="banner_link">Link URL</Label>
                      <Input
                        id="banner_link"
                        value={bannerForm.link_url}
                        onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="banner_description">Description</Label>
                    <Textarea
                      id="banner_description"
                      value={bannerForm.description}
                      onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="banner_start_date">Start Date</Label>
                      <Input
                        id="banner_start_date"
                        type="date"
                        value={bannerForm.start_date}
                        onChange={(e) => setBannerForm({ ...bannerForm, start_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="banner_end_date">End Date</Label>
                      <Input
                        id="banner_end_date"
                        type="date"
                        value={bannerForm.end_date}
                        onChange={(e) => setBannerForm({ ...bannerForm, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowBannerForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Create Banner
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Banners List */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardHeader>
              <CardTitle>Marketing Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {banners.map((banner, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{banner.title}</h3>
                            <Badge className={banner.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                              {banner.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Created: {banner.created_date}</span>
                            {banner.start_date && <span>Active: {banner.start_date} - {banner.end_date}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={banner.is_active}
                          onCheckedChange={() => toggleBannerStatus(banner.id)}
                        />
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteBanner(banner.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}