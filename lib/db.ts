import data from './data.json';

export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  category_id: string;
  status: string;
  images: string[];
  price: number;
  compare_at_price?: number;
  rating: number;
  review_count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: string;
}

export interface InventoryItem {
  product_id: string;
  sku: string;
  attributes: Record<string, any>;
  inventory_count: number;
  price: number;
}

// Database functions
export const getProducts = (): Product[] => {
  return data.products;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return data.products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return data.products.find(product => product.id === id);
};

export const getCategories = (): Category[] => {
  return data.categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return data.categories.find(category => category.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  return data.products.filter(product => {
    if (product.category_id === category.id) return true;
    // Also check if it's a subcategory
    const parentCategory = data.categories.find(cat => cat.id === category.parent_id);
    return parentCategory && product.category_id === parentCategory.id;
  });
};

export const getInventoryByProductId = (productId: string): InventoryItem[] => {
  return data.inventory.filter(item => item.product_id === productId);
};

// Cart functions (using localStorage for persistence)
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem('gula-cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const addToCart = (product: Product, quantity: number = 1, variant?: string): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => 
    item.product.id === product.id && item.variant === variant
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      product,
      quantity,
      variant: variant || 'default'
    });
  }

  localStorage.setItem('gula-cart', JSON.stringify(cart));
  
  // Dispatch custom event to notify components that cart has been updated
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
};

export const updateCartItemQuantity = (productId: string, quantity: number, variant?: string): CartItem[] => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => 
    item.product.id === productId && item.variant === variant
  );

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem('gula-cart', JSON.stringify(cart));
    
    // Dispatch custom event to notify components that cart has been updated
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  }

  return cart;
};

export const removeFromCart = (productId: string, variant?: string): CartItem[] => {
  const cart = getCart();
  const filteredCart = cart.filter(item => 
    !(item.product.id === productId && item.variant === variant)
  );
  
  localStorage.setItem('gula-cart', JSON.stringify(filteredCart));
  
  // Dispatch custom event to notify components that cart has been updated
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
  
  return filteredCart;
};

export const clearCart = (): void => {
  localStorage.removeItem('gula-cart');
  
  // Dispatch custom event to notify components that cart has been updated
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
