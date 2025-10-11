import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Search, User, Star, Clock, Flame } from 'lucide-react';
const JustForYou = () => {
  const products = [
    { id: 1, name: 'Wireless Earbuds 9D Stereo LED Display', price: 1335, originalPrice: 3899, discount: 66, rating: 4.6, sold: 3124, image: '🎧' },
    { id: 2, name: 'Handmade Organic Saffron Soap Set', price: 448, originalPrice: 899, discount: 50, rating: 4.8, sold: 2234, image: '🧼' },
    { id: 3, name: '3 Piece Mini Gardening Tools Set Premium', price: 1217, originalPrice: 2349, discount: 48, rating: 4.5, sold: 1456, image: '🌱' },
    { id: 4, name: 'Authentic Perfume Collection Gift Set', price: 2292, originalPrice: 4999, discount: 54, rating: 4.7, sold: 1678, image: '💐' },
    { id: 5, name: 'X5 Mobile Cooler Gaming Phone Cooler', price: 1275, originalPrice: 2459, discount: 48, rating: 4.4, sold: 2345, image: '📱' },
    { id: 6, name: 'Bamboo Skateboard Professional 31 inch', price: 1694, originalPrice: 2999, discount: 44, rating: 4.9, sold: 987, image: '🛹' },
    { id: 7, name: 'Smart LED Strip Lights WiFi 16M Colors', price: 899, originalPrice: 1799, discount: 50, rating: 4.6, sold: 4234, image: '💡' },
    { id: 8, name: 'Fitness Resistance Bands Set of 5', price: 599, originalPrice: 1299, discount: 54, rating: 4.5, sold: 3567, image: '💪' },
    { id: 9, name: 'Portable Mini Projector 1080P HD', price: 5999, originalPrice: 9999, discount: 40, rating: 4.7, sold: 876, image: '📽️' },
    { id: 10, name: 'Electric Coffee Grinder Stainless Steel', price: 1499, originalPrice: 2499, discount: 40, rating: 4.8, sold: 1987, image: '☕' },
    { id: 11, name: 'Memory Foam Pillow Orthopedic', price: 799, originalPrice: 1599, discount: 50, rating: 4.6, sold: 2456, image: '🛏️' },
    { id: 12, name: 'Digital Kitchen Scale Food Scale 10kg', price: 699, originalPrice: 1299, discount: 46, rating: 4.5, sold: 3123, image: '⚖️' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Just For You</h2>
          <p className="text-gray-500 text-sm">Personalized recommendations based on your interests</p>
        </div>
        <button
          // onClick={onShowMore}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          VIEW ALL
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center text-7xl transform group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
              <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                -{product.discount}%
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-purple-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.sold})</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl font-bold text-purple-600">৳{product.price}</span>
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

export default JustForYou