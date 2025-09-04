export class Transaction {
  static async list(sortBy = '-transaction_date') {
    // Mock implementation - in real app this would call an API
    return [
      { id: '1', transaction_date: '2024-07-28', type: 'sale', description: 'Order #001', amount: 855.99, status: 'completed' },
      { id: '2', transaction_date: '2024-07-27', type: 'withdrawal', description: 'Payout to Bank', amount: -500.00, status: 'completed' },
      { id: '3', transaction_date: '2024-07-26', type: 'fee', description: 'Platform Fee (July)', amount: -15.00, status: 'completed' },
      { id: '4', transaction_date: '2024-07-25', type: 'refund', description: 'Refund for Order #098', amount: -25.50, status: 'refunded' },
      { id: '5', transaction_date: '2024-07-24', type: 'sale', description: 'Order #000', amount: 120.00, status: 'completed' }
    ]
  }

  static async create(data) {
    // Mock implementation - in real app this would call an API
    console.log('Creating transaction:', data)
    return { id: Date.now().toString(), ...data }
  }
} 