import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Search, User, Star, Clock, Flame } from 'lucide-react';
const ShopByCategory = () => {
  const categories = [
    { name: 'Kitchen Fittings', image: '🍳', color: 'from-orange-100 to-orange-200' },
    { name: 'Womens Fashion', image: '👗', color: 'from-pink-100 to-pink-200' },
    { name: 'Oil', image: '🫗', color: 'from-yellow-100 to-yellow-200' },
    { name: 'Goat', image: '🐐', color: 'from-green-100 to-green-200' },
    { name: 'Watches and Accessories', image: '⌚', color: 'from-blue-100 to-blue-200' },
    { name: 'Watering Systems', image: '💧', color: 'from-cyan-100 to-cyan-200' },
    { name: 'Margarine & Spread', image: '🧈', color: 'from-yellow-100 to-yellow-200' },
    { name: 'Pools', image: '🏊', color: 'from-blue-100 to-blue-200' },
    { name: 'Bathroom Lighting', image: '💡', color: 'from-amber-100 to-amber-200' },
    { name: 'Beverages', image: '🥤', color: 'from-red-100 to-red-200' },
    { name: 'Exhaust Coatings', image: '🔧', color: 'from-gray-100 to-gray-200' },
    { name: 'Thrillers', image: '📚', color: 'from-purple-100 to-purple-200' },
    { name: 'Digital Downloads', image: '💿', color: 'from-indigo-100 to-indigo-200' },
    { name: 'Beans & Chickpeas', image: '🫘', color: 'from-green-100 to-green-200' },
    { name: 'Playboards', image: '🎨', color: 'from-pink-100 to-pink-200' },
    { name: 'Others', image: '📦', color: 'from-gray-100 to-gray-200' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Shop by Category</h2>
          <p className="text-gray-500 text-sm">Browse through our wide range of categories</p>
        </div>
        <button
          // onClick={onShowMore}
          className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center gap-2 group"
        >
          VIEW ALL
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className={`w-24 h-24 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-5xl shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}>
              {category.image}
            </div>
            <span className="text-xs text-center text-gray-700 font-medium leading-tight group-hover:text-green-600 transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;