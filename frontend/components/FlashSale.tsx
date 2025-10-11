"use client"
import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Search, User, Star, Clock, Flame } from 'lucide-react';


const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 56 });

  const products = [
    { id: 1, name: 'Gaming Laptop RTX 4060', price: 89999, originalPrice: 129999, discount: 31, rating: 4.9, sold: 245, image: '💻', label: 'LOWEST PRICE' },
    { id: 2, name: 'Luxury Watch Collection', price: 4599, originalPrice: 7999, discount: 43, rating: 4.8, sold: 567, image: '⌚', label: 'HOT DEAL' },
    { id: 3, name: 'iPhone 15 Pro Max', price: 119999, originalPrice: 159999, discount: 25, rating: 5.0, sold: 892, image: '📱', label: 'BESTSELLER' },
    { id: 4, name: 'Sony Headphones WH-1000XM5', price: 29999, originalPrice: 39999, discount: 25, rating: 4.9, sold: 423, image: '🎧', label: 'LOWEST PRICE' },
    { id: 5, name: 'Smart TV 55" 4K OLED', price: 54999, originalPrice: 89999, discount: 39, rating: 4.7, sold: 334, image: '📺', label: 'HOT DEAL' },
    { id: 6, name: 'Professional Camera Kit', price: 79999, originalPrice: 129999, discount: 38, rating: 4.8, sold: 178, image: '📷', label: 'BESTSELLER' },
  ];

  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                Flash Sale
                <span className="text-lg font-normal bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  Ends Soon
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/90" />
                <div className="flex items-center gap-2 text-white font-bold">
                  <div className="bg-white/30 backdrop-blur-md px-3 py-2 rounded-lg min-w-[50px] text-center">
                    <span className="text-2xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <div className="text-[10px] font-normal">Hours</div>
                  </div>
                  <span className="text-2xl">:</span>
                  <div className="bg-white/30 backdrop-blur-md px-3 py-2 rounded-lg min-w-[50px] text-center">
                    <span className="text-2xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <div className="text-[10px] font-normal">Minutes</div>
                  </div>
                  <span className="text-2xl">:</span>
                  <div className="bg-white/30 backdrop-blur-md px-3 py-2 rounded-lg min-w-[50px] text-center">
                    <span className="text-2xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <div className="text-[10px] font-normal">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            // onClick={onShowMore}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            SHOP ALL
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                {product.label && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold py-1.5 px-2 text-center z-10 shadow-lg">
                    🔥 {product.label}
                  </div>
                )}
                <div className="w-full h-48 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center text-7xl pt-6 transform group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="absolute top-8 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  -{product.discount}%
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.sold})</span>
                </div>
                
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-red-600">৳{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">৳{product.originalPrice}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    style={{ width: `${Math.min((product.sold / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {product.sold} sold
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;