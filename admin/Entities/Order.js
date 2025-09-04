export class Order {
  static async list(sortBy = '-order_date') {
    // Mock implementation - in real app this would call an API
    return [
      { 
        id: '1', 
        order_id: 'ORD-001', 
        customer_name: 'John Doe', 
        order_date: '2024-07-28', 
        status: 'delivered', 
        payment_status: 'paid', 
        total_amount: 299.99 
      },
      { 
        id: '2', 
        order_id: 'ORD-002', 
        customer_name: 'Jane Smith', 
        order_date: '2024-07-27', 
        status: 'processing', 
        payment_status: 'paid', 
        total_amount: 199.99 
      },
      { 
        id: '3', 
        order_id: 'ORD-003', 
        customer_name: 'Bob Johnson', 
        order_date: '2024-07-26', 
        status: 'shipped', 
        payment_status: 'paid', 
        total_amount: 399.99 
      },
      { 
        id: '4', 
        order_id: 'ORD-004', 
        customer_name: 'Alice Brown', 
        order_date: '2024-07-25', 
        status: 'pending', 
        payment_status: 'pending', 
        total_amount: 150.00 
      },
      { 
        id: '5', 
        order_id: 'ORD-005', 
        customer_name: 'Charlie Wilson', 
        order_date: '2024-07-24', 
        status: 'delivered', 
        payment_status: 'paid', 
        total_amount: 89.99 
      }
    ];
  }
} 