export class MarketingBanner {
  static async list(sortBy = '-created_date') {
    // Mock implementation - in real app this would call an API
    return [
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
        description: 'Free shipping on orders over ZMW 500', 
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
    ];
  }

  static async create(bannerData) {
    // Mock implementation - in real app this would call an API
    console.log('Creating banner:', bannerData);
    return { success: true, id: Date.now().toString() };
  }

  static async update(bannerId, updateData) {
    // Mock implementation - in real app this would call an API
    console.log('Updating banner:', bannerId, updateData);
    return { success: true };
  }

  static async delete(bannerId) {
    // Mock implementation - in real app this would call an API
    console.log('Deleting banner:', bannerId);
    return { success: true };
  }
} 