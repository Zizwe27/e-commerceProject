export class InventoryMovement {
  static async list(sortBy = '-timestamp') {
    // Mock implementation - in real app this would call an API
    return [
      { 
        id: '1', 
        product_name: 'Wireless Headphones', 
        type: 'in', 
        quantity: 50, 
        timestamp: '2024-07-28T10:00:00Z' 
      },
      { 
        id: '2', 
        product_name: 'Smart Watch', 
        type: 'out', 
        quantity: 25, 
        timestamp: '2024-07-27T15:30:00Z' 
      },
      { 
        id: '3', 
        product_name: 'Laptop Stand', 
        type: 'in', 
        quantity: 100, 
        timestamp: '2024-07-26T09:15:00Z' 
      },
      { 
        id: '4', 
        product_name: 'Phone Case', 
        type: 'out', 
        quantity: 15, 
        timestamp: '2024-07-25T14:20:00Z' 
      },
      { 
        id: '5', 
        product_name: 'Bluetooth Speaker', 
        type: 'adjustment', 
        quantity: -5, 
        timestamp: '2024-07-24T11:45:00Z' 
      }
    ];
  }
} 