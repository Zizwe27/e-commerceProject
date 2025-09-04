"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Upload, Image as ImageIcon, Eye, Edit, Trash2 } from "lucide-react";
import { MarketingBanner } from "../../Entities/MarketingBanner";

export default function BannerManager({ banners, onUpdate }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    banner_name: '',
    banner_type: 'promotion',
    title: '',
    description: '',
    cta_text: 'Shop Now',
    target_url: '',
    display_order: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MarketingBanner.create(formData);
      setFormData({
        banner_name: '', banner_type: 'promotion', title: '', 
        description: '', cta_text: 'Shop Now', target_url: '', display_order: 1
      });
      setShowCreateForm(false);
      onUpdate();
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  const toggleBanner = async (bannerId, currentStatus) => {
    try {
      await MarketingBanner.update(bannerId, { is_active: !currentStatus });
      onUpdate();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Marketing Banners</h2>
          <p className="text-sm text-gray-500">Create and manage promotional banners for your Zambian store</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Create Banner
        </Button>
      </div>

      {/* Create Banner Form */}
      {showCreateForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Create New Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="banner-name">Banner Name</Label>
                  <Input
                    id="banner-name"
                    value={formData.banner_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, banner_name: e.target.value }))}
                    placeholder="Summer Sale Banner"
                    required
                  />
                </div>
                <div>
                  <Label>Banner Type</Label>
                  <Select value={formData.banner_type} onValueChange={(value) => setFormData(prev => ({ ...prev, banner_type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="new_product">New Product</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Banner Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Special Offers for Zambian Customers!"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Get amazing deals on all products. Free delivery across Lusaka!"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta">Call to Action Text</Label>
                  <Input
                    id="cta"
                    value={formData.cta_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta_text: e.target.value }))}
                    placeholder="Shop Now"
                  />
                </div>
                <div>
                  <Label htmlFor="url">Target URL</Label>
                  <Input
                    id="url"
                    value={formData.target_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_url: e.target.value }))}
                    placeholder="/products/summer-sale"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Banner</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Banner List */}
      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{banner.banner_name}</h3>
                    <Badge variant="outline" className="capitalize">
                      {banner.banner_type.replace('_', ' ')}
                    </Badge>
                    <Badge variant={banner.is_active ? "default" : "secondary"}>
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1">{banner.title}</h4>
                  {banner.description && (
                    <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>CTA: {banner.cta_text}</span>
                    {banner.target_url && <span>→ {banner.target_url}</span>}
                    <span>Order: {banner.display_order}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={banner.is_active}
                    onCheckedChange={() => toggleBanner(banner.id, banner.is_active)}
                  />
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {banners.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No banners created</h3>
              <p className="text-gray-500">Create custom promotional banners to attract your Zambian customers.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}