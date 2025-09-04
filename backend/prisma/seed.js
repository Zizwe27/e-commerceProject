const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: {
          name: 'Electronics',
          slug: 'electronics',
          description: 'Electronic devices and accessories',
          image: '/images/categories/electronics.jpg',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'clothing' },
        update: {},
        create: {
          name: 'Clothing',
          slug: 'clothing',
          description: 'Fashion and apparel',
          image: '/images/categories/clothing.jpg',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'home-garden' },
        update: {},
        create: {
          name: 'Home & Garden',
          slug: 'home-garden',
          description: 'Home improvement and garden supplies',
          image: '/images/categories/home-garden.jpg',
        },
      }),
    ]);

    console.log('✅ Categories created');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
        isActive: true,
        emailVerified: new Date(),
      },
    });

    console.log('✅ Admin user created');

    // Create sample products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { sku: 'LAPTOP-001' },
        update: {},
        create: {
          name: 'MacBook Pro 16"',
          slug: 'macbook-pro-16',
          description: 'Powerful laptop for professionals with M2 Pro chip',
          shortDescription: 'Professional laptop with M2 Pro chip',
          sku: 'LAPTOP-001',
          price: 2499.99,
          comparePrice: 2799.99,
          costPrice: 1800.00,
          stock: 50,
          lowStockThreshold: 5,
          weight: 2.15,
          dimensions: { length: 35.57, width: 24.81, height: 1.68 },
          images: [
            '/images/products/macbook-pro-1.jpg',
            '/images/products/macbook-pro-2.jpg',
          ],
          tags: ['laptop', 'apple', 'professional', 'm2'],
          isActive: true,
          isFeatured: true,
          categoryId: categories[0].id,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'TSHIRT-001' },
        update: {},
        create: {
          name: 'Premium Cotton T-Shirt',
          slug: 'premium-cotton-tshirt',
          description: 'Soft and comfortable cotton t-shirt',
          shortDescription: 'Comfortable cotton t-shirt',
          sku: 'TSHIRT-001',
          price: 29.99,
          comparePrice: 39.99,
          costPrice: 15.00,
          stock: 100,
          lowStockThreshold: 10,
          weight: 0.2,
          dimensions: { length: 30, width: 20, height: 1 },
          images: [
            '/images/products/tshirt-1.jpg',
            '/images/products/tshirt-2.jpg',
          ],
          tags: ['clothing', 'tshirt', 'cotton', 'casual'],
          isActive: true,
          isFeatured: false,
          categoryId: categories[1].id,
        },
      }),
      prisma.product.upsert({
        where: { sku: 'GARDEN-001' },
        update: {},
        create: {
          name: 'Garden Tool Set',
          slug: 'garden-tool-set',
          description: 'Complete set of gardening tools',
          shortDescription: 'Professional gardening tool set',
          sku: 'GARDEN-001',
          price: 89.99,
          comparePrice: 120.00,
          costPrice: 45.00,
          stock: 25,
          lowStockThreshold: 3,
          weight: 2.5,
          dimensions: { length: 40, width: 30, height: 15 },
          images: [
            '/images/products/garden-tools-1.jpg',
            '/images/products/garden-tools-2.jpg',
          ],
          tags: ['garden', 'tools', 'outdoor', 'gardening'],
          isActive: true,
          isFeatured: true,
          categoryId: categories[2].id,
        },
      }),
    ]);

    console.log('✅ Products created');

    // Create sample orders
    const orders = await Promise.all([
      prisma.order.create({
        data: {
          orderNumber: 'ORD-001',
          status: 'DELIVERED',
          paymentStatus: 'PAID',
          fulfillmentStatus: 'FULFILLED',
          customerEmail: 'customer1@example.com',
          customerName: 'John Doe',
          customerPhone: '+1234567890',
          subtotal: 2499.99,
          taxAmount: 199.99,
          shippingAmount: 0.00,
          total: 2699.98,
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
          billingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
          paymentMethod: 'credit_card',
          paidAt: new Date(),
          shippedAt: new Date(Date.now() - 86400000), // 1 day ago
          deliveredAt: new Date(Date.now() - 172800000), // 2 days ago
          items: {
            create: {
              quantity: 1,
              price: 2499.99,
              total: 2499.99,
              productId: products[0].id,
            },
          },
        },
      }),
      prisma.order.create({
        data: {
          orderNumber: 'ORD-002',
          status: 'SHIPPED',
          paymentStatus: 'PAID',
          fulfillmentStatus: 'FULFILLED',
          customerEmail: 'customer2@example.com',
          customerName: 'Jane Smith',
          customerPhone: '+1234567891',
          subtotal: 29.99,
          taxAmount: 2.40,
          shippingAmount: 5.99,
          total: 38.38,
          shippingAddress: {
            firstName: 'Jane',
            lastName: 'Smith',
            address1: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            country: 'USA',
          },
          billingAddress: {
            firstName: 'Jane',
            lastName: 'Smith',
            address1: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            country: 'USA',
          },
          paymentMethod: 'paypal',
          paidAt: new Date(Date.now() - 172800000), // 2 days ago
          shippedAt: new Date(Date.now() - 86400000), // 1 day ago
          items: {
            create: {
              quantity: 1,
              price: 29.99,
              total: 29.99,
              productId: products[1].id,
            },
          },
        },
      }),
    ]);

    console.log('✅ Orders created');

    // Create sample transactions
    await Promise.all([
      prisma.transaction.create({
        data: {
          type: 'SALE',
          status: 'COMPLETED',
          amount: 2699.98,
          description: 'Order #ORD-001 payment',
          reference: 'TXN-001',
          orderId: orders[0].id,
          processedAt: new Date(),
        },
      }),
      prisma.transaction.create({
        data: {
          type: 'SALE',
          status: 'COMPLETED',
          amount: 38.38,
          description: 'Order #ORD-002 payment',
          reference: 'TXN-002',
          orderId: orders[1].id,
          processedAt: new Date(Date.now() - 172800000),
        },
      }),
    ]);

    console.log('✅ Transactions created');

    // Create discount campaigns
    await Promise.all([
      prisma.discountCampaign.create({
        data: {
          name: 'Welcome Discount',
          code: 'WELCOME10',
          type: 'PERCENTAGE',
          value: 10.00,
          minAmount: 50.00,
          usageLimit: 1000,
          isActive: true,
          startsAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      }),
      prisma.discountCampaign.create({
        data: {
          name: 'Free Shipping',
          code: 'FREESHIP',
          type: 'FREE_SHIPPING',
          value: 0.00,
          minAmount: 100.00,
          usageLimit: 500,
          isActive: true,
          startsAt: new Date(),
          expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        },
      }),
    ]);

    console.log('✅ Discount campaigns created');

    // Create marketing banners
    await Promise.all([
      prisma.marketingBanner.create({
        data: {
          title: 'Summer Sale',
          description: 'Up to 50% off on all items',
          image: '/images/banners/summer-sale.jpg',
          link: '/sale',
          position: 'hero',
          isActive: true,
          startsAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.marketingBanner.create({
        data: {
          title: 'New Arrivals',
          description: 'Check out our latest products',
          image: '/images/banners/new-arrivals.jpg',
          link: '/new-arrivals',
          position: 'sidebar',
          isActive: true,
        },
      }),
    ]);

    console.log('✅ Marketing banners created');

    // Create inventory movements
    await Promise.all([
      prisma.inventoryMovement.create({
        data: {
          type: 'IN',
          quantity: 50,
          reason: 'Initial stock',
          productId: products[0].id,
        },
      }),
      prisma.inventoryMovement.create({
        data: {
          type: 'OUT',
          quantity: 1,
          reason: 'Order fulfillment',
          reference: 'ORD-001',
          productId: products[0].id,
        },
      }),
    ]);

    console.log('✅ Inventory movements created');

    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });