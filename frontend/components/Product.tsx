"use client"
import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, StarHalf, StarOff } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { calculateDiscountPrice } from '@/utils';

interface IImage {
  publicId: string;
  url: string;
}
interface Review {
  id: string;
  rating: number;
  comment: string;
  name: string;
  date: string;
}
interface Specification {
  key: string;
  value: string;
}
interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number
  originalPrice: number;
  discountPrice: number;
  lowStock: number;
  sold: number;
  image: IImage[];
  rating: number;
  totalSolds: number;
  totalReviews: number;
  topPerforming: boolean;
  reviews: Review[];
  specifications: Specification[];
  status: 'active' | 'draft' | 'out-of-stock';
}

interface ExtendedProduct extends Product {
  badge?: 'New' | 'Sale' | 'Hot';
  discount?: number;
}

interface ProductCardsProps {
  className?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({ className = '' }) => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);


  const toggleFavorite = (id: string) => {

  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/seller/get-all-products');
      console.log(response.data.data);
      setLatestProducts(response.data.data);
    } catch (error) {
      toast.error("something went wrong")
    }
  }
  const fetchBestSellingProducts = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/seller/get-best-selling-products');
      console.log(response.data.data);
      setBestSellingProducts(response.data.data);
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchBestSellingProducts();
  }, [])


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

  const ProductCard = ({ product }: { product: ExtendedProduct }) => (
    <Link href={`/product/${product.id}`}>

    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        /> */}
        
        {/* Badge */}
        {/* {product.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 ${getBadgeColor(product.badge)} text-white text-xs font-bold rounded-full shadow-lg`}>
            {product.badge}
          </div>
        )} */}

        {/* Discount Badge */}
        { 
        product.discount && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            -{calculateDiscountPrice(product.originalPrice, product.discountPrice)}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            <button 
              onClick={() => toggleFavorite(product.id)}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              {/* <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} /> */}
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
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {product && Array.from({ length: 5 }, (_, index) => {
              const starNumber = index + 1;

              if (product?.rating >= starNumber) {
                return <Star key={index} className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
              } else if (product?.rating >= starNumber - 0.5) {
                return <StarHalf key={index} className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
              } else {
                return <Star key={index} className="w-5 h-5 text-gray-300" />;
              }
            })}
          </div>
          <span className="text-sm text-gray-600">({product.totalReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-emerald-600">${product.discountPrice}</span>
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
                Showing <span className="font-semibold text-emerald-600">{10}</span> of all products
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