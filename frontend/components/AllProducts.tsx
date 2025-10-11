import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Search, User, Star, Clock, Flame } from 'lucide-react';
const AllProducts = () => {
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 2499, originalPrice: 3999, discount: 38, rating: 4.5, sold: 1243, image: '🎧' },
    { id: 2, name: 'Smart Fitness Watch Pro', price: 3299, originalPrice: 5499, discount: 40, rating: 4.8, sold: 2156, image: '⌚' },
    { id: 3, name: 'Professional DSLR Camera', price: 45999, originalPrice: 65999, discount: 30, rating: 4.9, sold: 543, image: '📷' },
    { id: 4, name: 'Gaming Mechanical Keyboard', price: 1899, originalPrice: 2999, discount: 37, rating: 4.6, sold: 876, image: '⌨️' },
    { id: 5, name: 'Wireless Mouse RGB', price: 899, originalPrice: 1499, discount: 40, rating: 4.4, sold: 1987, image: '🖱️' },
    { id: 6, name: 'Portable Bluetooth Speaker', price: 1599, originalPrice: 2499, discount: 36, rating: 4.7, sold: 1432, image: '🔊' },
    { id: 7, name: 'Smart Home Security Camera', price: 2799, originalPrice: 4299, discount: 35, rating: 4.5, sold: 765, image: '📹' },
    { id: 8, name: 'Laptop Cooling Pad Pro', price: 1299, originalPrice: 1999, discount: 35, rating: 4.3, sold: 2341, image: '💻' },
    { id: 9, name: 'USB-C Hub 7-in-1', price: 1499, originalPrice: 2299, discount: 35, rating: 4.6, sold: 1654, image: '🔌' },
    { id: 10, name: 'LED Ring Light Studio', price: 1899, originalPrice: 3199, discount: 41, rating: 4.8, sold: 987, image: '💡' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">All Products</h2>
          <p className="text-gray-500 text-sm">Discover amazing deals on trending products</p>
        </div>
        <button
          // onClick={}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          VIEW ALL
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <div className="w-full h-56 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center text-8xl transform group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                -{product.discount}%
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.sold})</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl font-bold text-green-600">৳{product.price}</span>
                <span className="text-sm text-gray-400 line-through">৳{product.originalPrice}</span>
              </div>
              
              <div className="text-xs text-gray-500">
                {product.sold} sold
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;