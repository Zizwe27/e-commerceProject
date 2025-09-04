export class ConversionEvent {
  static async list(sortBy = '-event_date') {
    // Mock implementation - in real app this would call an API
    return [
      { 
        id: '1', 
        event_type: 'purchase_completed', 
        event_date: '2024-07-28', 
        order_id: 'ORD-001',
        product_name: 'Wireless Headphones',
        refund_amount: 0
      },
      { 
        id: '2', 
        event_type: 'refund_requested', 
        event_date: '2024-07-27', 
        order_id: 'ORD-002',
        product_name: 'Smart Watch',
        refund_amount: 199.99
      },
      { 
        id: '3', 
        event_type: 'purchase_completed', 
        event_date: '2024-07-26', 
        order_id: 'ORD-003',
        product_name: 'Laptop Stand',
        refund_amount: 0
      },
      { 
        id: '4', 
        event_type: 'refund_processed', 
        event_date: '2024-07-25', 
        order_id: 'ORD-004',
        product_name: 'Phone Case',
        refund_amount: 150.00
      },
      { 
        id: '5', 
        event_type: 'purchase_completed', 
        event_date: '2024-07-24', 
        order_id: 'ORD-005',
        product_name: 'Bluetooth Speaker',
        refund_amount: 0
      }
    ];
  }
} 