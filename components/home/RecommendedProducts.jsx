import React from "react";

export default function RecommendedProducts() {
  // Mock data for now
  const products = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
    { id: 2, name: "Smart Watch", price: "$199.99", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" },
    { id: 3, name: "Running Shoes", price: "$79.99", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" },
    { id: 4, name: "Backpack", price: "$49.99", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" }
  ];

  return (
    <div className="px-4">
      <h3 className="text-lg font-semibold text-black mb-4">Recommended for You</h3>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div 
              className="w-full h-32 rounded-xl mb-3 bg-cover bg-center"
              style={{ backgroundImage: `url('${product.image}')` }}
            />
            <h4 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h4>
            <p className="text-lg font-semibold text-black">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}