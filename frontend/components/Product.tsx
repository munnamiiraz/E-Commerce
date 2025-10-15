"use client"
import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: 'New' | 'Sale' | 'Hot';
  discount?: number;
}

interface ProductCardsProps {
  className?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({ className = '' }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const latestProducts: Product[] = [
    {
      id: 1,
      name: 'Smart Home Cleaner',
      price: 229,
      originalPrice: 299,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      badge: 'New',
      discount: 23
    },
    {
      id: 2,
      name: 'Ergonomic Mouse',
      price: 99,
      rating: 5,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      badge: 'Hot'
    },
    {
      id: 3,
      name: 'Apple Smart Watch',
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 543,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
      badge: 'Sale',
      discount: 20
    },
    {
      id: 4,
      name: 'Apple Wireless Earbuds',
      price: 89,
      rating: 4.7,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop'
    }
  ];

  const bestSellingProducts: Product[] = [
    {
      id: 5,
      name: 'Smart Home Cleaner',
      price: 229,
      rating: 4.5,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      badge: 'Hot'
    },
    {
      id: 6,
      name: 'Ergonomic Mouse',
      price: 99,
      rating: 5,
      reviews: 1200,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Home Theater',
      price: 149,
      originalPrice: 199,
      rating: 4.9,
      reviews: 765,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
      badge: 'Sale',
      discount: 25
    },
    {
      id: 8,
      name: 'Apple Smart Watch',
      price: 199,
      rating: 4.8,
      reviews: 980,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'Wireless Headphones',
      price: 57,
      originalPrice: 79,
      rating: 4.6,
      reviews: 654,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      discount: 28
    },
    {
      id: 10,
      name: 'Smart Pen for iPad',
      price: 66,
      rating: 4.4,
      reviews: 432,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop'
    },
    {
      id: 11,
      name: 'Security Camera',
      price: 44,
      rating: 4.7,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=400&fit=crop',
      badge: 'New'
    },
    {
      id: 12,
      name: 'Smart watch white',
      price: 47,
      rating: 4.5,
      reviews: 321,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const getBadgeColor = (badge?: 'New' | 'Sale' | 'Hot') => {
    switch (badge) {
      case 'New':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Sale':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'Hot':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      default:
        return '';
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Link href={`/product/${product.id}`}>

    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 ${getBadgeColor(product.badge)} text-white text-xs font-bold rounded-full shadow-lg`}>
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            -{product.discount}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            <button 
              onClick={() => toggleFavorite(product.id)}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            
            <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
            
            <button className="w-11 h-11 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <ShoppingCart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>

      {/* Quick Add Button (appears on hover) */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
    </Link>
  );

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Latest Products Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Latest Products
            </h2>
            <div className="flex items-center justify-center space-x-3">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-emerald-600">4</span> of 72 products
              </p>
              <a href="/products" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
                View more →
              </a>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              
            ))}
          </div>
        </div>

        {/* Best Selling Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Best Selling
            </h2>
            <div className="flex items-center justify-center space-x-3">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-emerald-600">8</span> of 72 products
              </p>
              <a href="/products" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
                View more →
              </a>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;