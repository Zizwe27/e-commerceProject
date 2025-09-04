export class DiscountCampaign {
  static async list(sortBy = '-created_date') {
    // Mock implementation - in real app this would call an API
    return [
      { 
        id: '1', 
        campaign_name: 'Summer Sale 2024', 
        campaign_code: 'SALES2024SUMMER001',
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
        campaign_code: 'SALES2024WELCOME002',
        discount_type: 'fixed', 
        discount_value: 50, 
        is_active: true, 
        created_date: '2024-06-15',
        start_date: '2024-06-15',
        end_date: '2024-12-31',
        customer_eligibility: 'new_customers',
        minimum_purchase: 0,
        usage_limit: 500,
        applicable_categories: ['All']
      },
      { 
        id: '3', 
        campaign_name: 'Holiday Special', 
        campaign_code: 'SALES2024HOLIDAY003',
        discount_type: 'percentage', 
        discount_value: 15, 
        is_active: false, 
        created_date: '2024-05-01',
        start_date: '2024-05-01',
        end_date: '2024-06-30',
        customer_eligibility: 'all_customers',
        minimum_purchase: 200,
        usage_limit: 2000,
        applicable_categories: ['Home & Garden', 'Beauty']
      }
    ];
  }

  static async create(campaignData) {
    // Mock implementation - in real app this would call an API
    console.log('Creating campaign:', campaignData);
    return { success: true, id: Date.now().toString() };
  }

  static async update(campaignId, updateData) {
    // Mock implementation - in real app this would call an API
    console.log('Updating campaign:', campaignId, updateData);
    return { success: true };
  }
} 