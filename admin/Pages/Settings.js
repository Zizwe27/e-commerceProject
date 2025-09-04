"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { Label } from '../Components/ui/label';
import { Switch } from '../Components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Components/ui/tabs';
import { Alert, AlertDescription } from '../Components/ui/alert';
import { ThemeSelect } from '../Components/ui/theme-toggle';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  // Local state instead of context to avoid re-render issues
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+260 123 456 789',
    role: 'admin'
  });

  const [settings, setSettings] = useState({
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 10
  });



  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    inventoryAlerts: true,
    marketingUpdates: false,
    systemAlerts: true
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAlerts: true
  });

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role
  });

  const [generalForm, setGeneralForm] = useState({
    language: settings.language,
    currency: settings.currency,
    timezone: settings.timezone,
    dateFormat: settings.dateFormat,
    itemsPerPage: settings.itemsPerPage.toString()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(profileForm);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...generalForm,
        itemsPerPage: parseInt(generalForm.itemsPerPage)
      };
      setSettings(updatedSettings);
      alert('Settings saved successfully');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key, value) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={profileForm.role}
                      onValueChange={(value) => setProfileForm(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={generalForm.language}
                      onValueChange={(value) => setGeneralForm(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalForm.currency}
                      onValueChange={(value) => setGeneralForm(prev => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="ZMW">ZMW (K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalForm.timezone}
                      onValueChange={(value) => setGeneralForm(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={generalForm.dateFormat}
                      onValueChange={(value) => setGeneralForm(prev => ({ ...prev, dateFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="itemsPerPage">Items Per Page</Label>
                  <Input
                    id="itemsPerPage"
                    type="number"
                    min="5"
                    max="100"
                    value={generalForm.itemsPerPage}
                    onChange={(e) => setGeneralForm(prev => ({ ...prev, itemsPerPage: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="mt-2">
                    <ThemeSelect />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Order Updates</Label>
                    <p className="text-sm text-gray-600">Get notified about order status changes</p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Inventory Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when inventory is low</p>
                  </div>
                  <Switch
                    checked={notifications.inventoryAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('inventoryAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Updates</Label>
                    <p className="text-sm text-gray-600">Receive marketing campaign updates</p>
                  </div>
                  <Switch
                    checked={notifications.marketingUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('marketingUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Alerts</Label>
                    <p className="text-sm text-gray-600">Receive system maintenance and security alerts</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('systemAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    These settings help protect your account and data. We recommend enabling two-factor authentication for enhanced security.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => handleSecurityChange('loginAlerts', checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    min="30"
                    max="365"
                    value={security.passwordExpiry}
                    onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button>
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}