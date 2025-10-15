"use client"
import React, { use, useState } from 'react';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Check, 
  Truck, 
  Shield, 
  Award,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Store,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'specifications'>('description');
  const {id} = useParams();

  const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop'
  ];

  const reviews = [
    { id: 1, name: 'Sarah Johnson', rating: 5, date: '2 days ago', comment: 'Absolutely love this product! The quality exceeded my expectations.' },
    { id: 2, name: 'Mike Chen', rating: 4, date: '1 week ago', comment: 'Great product, fast shipping. Highly recommend!' },
    { id: 3, name: 'Emma Davis', rating: 5, date: '2 weeks ago', comment: 'Best purchase I\'ve made this year. Worth every penny!' }
  ];

  const specifications = [
    { label: 'Brand', value: 'Premium Tech' },
    { label: 'Model', value: 'PT-2025-PRO' },
    { label: 'Warranty', value: '2 Years International' },
    { label: 'Weight', value: '1.2 kg' },
    { label: 'Dimensions', value: '30 x 20 x 15 cm' }
  ];

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-emerald-600 transition-colors">Products</a>
          <span>/</span>
          <a href="/electronics" className="hover:text-emerald-600 transition-colors">Electronics</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Premium Wireless Headphones</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-[500px] flex items-center justify-center bg-white rounded-3xl overflow-hidden shadow-xl aspect-square group">
              <img 
                src={images[selectedImage]} 
                alt="Product" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Favorite Button */}
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>

              {/* Share Button */}
              <button className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>

              {/* Discount Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                Save 30% Today!
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button 
                onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all ${
                    selectedImage === idx 
                      ? 'ring-4 ring-emerald-500 shadow-lg scale-105' 
                      : 'ring-2 ring-gray-200 hover:ring-emerald-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6 w-[500px]">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Premium Wireless Headphones Pro
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9</span>
                <span className="text-gray-400">|</span>
                <a href="#reviews" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  127 Reviews
                </a>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-emerald-600">$199</span>
                <span className="text-2xl text-gray-400 line-through">$299</span>
                <span className="px-4 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                  -33%
                </span>
              </div>
              <p className="text-sm text-emerald-700 mt-2 flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Limited time offer - Hurry up!
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: Truck, text: 'Free worldwide shipping', color: 'text-blue-600' },
                { icon: Shield, text: '100% Secured Payment', color: 'text-green-600' },
                { icon: Award, text: 'Trusted by premium brands', color: 'text-purple-600' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 ${feature.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  <span className="font-semibold text-emerald-600">23 items</span> left in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group">
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
              <Link href={`/product/${id}/buynow`}>
                <button className="w-full py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300">
                  Buy Now
                </button>
              </Link>
            </div>

            {/* Seller Info */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Premium Tech Store</h4>
                    <p className="text-sm text-gray-300">Official Brand Store</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center space-x-2">
                  <span>Visit Store</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {(['description', 'reviews', 'specifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-5 px-6 text-base font-semibold transition-all ${
                  activeTab === tab
                    ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Experience premium audio quality with our state-of-the-art wireless headphones. 
                  Featuring advanced noise cancellation technology, these headphones deliver crystal-clear 
                  sound and deep bass that will immerse you in your favorite music, podcasts, and calls.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mt-4">
                  Built with premium materials and designed for all-day comfort, these headphones are 
                  perfect for any environment. Whether you're commuting, working from home, or hitting 
                  the gym, enjoy up to 30 hours of playtime on a single charge.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-700">{spec.label}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;