import React, { useState, useEffect } from 'react';
import { useGetAllProductsQuery } from '@/lib/features/products/productsApi';

import type { Product as ProductType } from '@/types/types';

interface Product extends ProductType {
  badge?: 'New' | 'Hot' | 'Sale';
  discount?: string;
}

const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading: loading } = useGetAllProductsQuery();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Latest Products</h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-600">Showing {products.length} of 72 products</p>
            <a href="#" className="text-emerald-500 font-medium hover:text-emerald-600 transition">
              View more →
            </a>
          </div>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden group">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Product Image</span>
                  </div>
                  
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                        product.badge === 'New'
                          ? 'bg-blue-500'
                          : product.badge === 'Hot'
                          ? 'bg-orange-500'
                          : 'bg-pink-500'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  
                  {product.discount && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {product.discount}
                    </span>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-500">({product.totalReviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-emerald-500">${product.discountPrice}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;