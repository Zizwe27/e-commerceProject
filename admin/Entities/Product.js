export class Product {
  static async list() {
    // Mock implementation - in real app this would call an API
    return [
      { 
        id: '1', 
        name: 'Wireless Headphones', 
        sku: 'WH-001', 
        category: 'Electronics', 
        status: 'active', 
        sales_count: 234, 
        revenue: 23400 
      },
      { 
        id: '2', 
        name: 'Smart Watch', 
        sku: 'SW-001', 
        category: 'Electronics', 
        status: 'active', 
        sales_count: 189, 
        revenue: 18900 
      },
      { 
        id: '3', 
        name: 'Laptop Stand', 
        sku: 'LS-001', 
        category: 'Accessories', 
        status: 'low_stock', 
        sales_count: 156, 
        revenue: 7800 
      },
      { 
        id: '4', 
        name: 'Phone Case', 
        sku: 'PC-001', 
        category: 'Accessories', 
        status: 'active', 
        sales_count: 89, 
        revenue: 4450 
      },
      { 
        id: '5', 
        name: 'Bluetooth Speaker', 
        sku: 'BS-001', 
        category: 'Electronics', 
        status: 'out_of_stock', 
        sales_count: 67, 
        revenue: 6700 
      }
    ];
  }

  static async delete(productId) {
    // Mock implementation - in real app this would call an API
    console.log('Deleting product:', productId);
    return { success: true };
  }
} 