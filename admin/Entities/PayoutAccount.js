export class PayoutAccount {
  static async list() {
    // Mock implementation - in real app this would call an API
    return [
      { id: '1', bank_name: 'ZANACO', account_number: '1234567890', account_holder_name: 'John Doe' },
      { id: '2', bank_name: 'FNB Zambia', account_number: '0987654321', account_holder_name: 'John Doe' }
    ]
  }
} 