"use client"

import React, { useState } from 'react';
import { 
  Heart, Trash2, ShoppingCart, Share2, Filter, 
  Grid3x3, List, Star, X, Check, TrendingUp,
  Package, Clock, ChevronDown, Search, SortAsc,
  Sparkles, Zap, Bell
} from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  stock: string;
  addedDate: string;
  priceDropped: boolean;
}

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      rating: 4.5,
      reviews: 1243,
      image: '🎧',
      category: 'Electronics',
      stock: 'In Stock',
      addedDate: '2024-01-15',
      priceDropped: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Pro',
      price: 3299,
      originalPrice: 5499,
      discount: 40,
      rating: 4.8,
      reviews: 2156,
      image: '⌚',
      category: 'Electronics',
      stock: 'In Stock',
      addedDate: '2024-01-20',
      priceDropped: false
    },
    {
      id: 3,
      name: 'Professional DSLR Camera',
      price: 45999,
      originalPrice: 65999,
      discount: 30,
      rating: 4.9,
      reviews: 543,
      image: '📷',
      category: 'Electronics',
      stock: 'In Stock',
      addedDate: '2024-01-10',
      priceDropped: true
    },
    {
      id: 4,
      name: 'Gaming Mechanical Keyboard',
      price: 1899,
      originalPrice: 2999,
      discount: 37,
      rating: 4.6,
      reviews: 876,
      image: '⌨️',
      category: 'Electronics',
      stock: 'Low Stock',
      addedDate: '2024-01-25',
      priceDropped: false
    },
    {
      id: 5,
      name: 'Luxury Designer Handbag',
      price: 8999,
      originalPrice: 14999,
      discount: 40,
      rating: 4.7,
      reviews: 432,
      image: '👜',
      category: 'Fashion',
      stock: 'In Stock',
      addedDate: '2024-01-18',
      priceDropped: true
    },
    {
      id: 6,
      name: 'Cotton T-Shirt Premium',
      price: 599,
      originalPrice: 999,
      discount: 40,
      rating: 4.4,
      reviews: 1987,
      image: '👕',
      category: 'Fashion',
      stock: 'In Stock',
      addedDate: '2024-01-22',
      priceDropped: false
    },
    {
      id: 7,
      name: 'Smart Home Security Camera',
      price: 2799,
      originalPrice: 4299,
      discount: 35,
      rating: 4.5,
      reviews: 765,
      image: '📹',
      category: 'Electronics',
      stock: 'Out of Stock',
      addedDate: '2024-01-12',
      priceDropped: false
    },
    {
      id: 8,
      name: 'Yoga Mat Professional',
      price: 899,
      originalPrice: 1499,
      discount: 40,
      rating: 4.8,
      reviews: 2341,
      image: '🧘',
      category: 'Sports',
      stock: 'In Stock',
      addedDate: '2024-01-28',
      priceDropped: true
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const removeSelected = () => {
    setWishlistItems(wishlistItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const addToCart = (item: WishlistItem) => {
    console.log('Added to cart:', item);
  };

  const addAllToCart = () => {
    console.log('Added all to cart');
  };

  const shareWishlist = () => {
    console.log('Share wishlist');
  };

  const clearAllWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
      setSelectedItems([]);
    }
  };

  const filteredItems = wishlistItems
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0;
    });

  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 relative border border-gray-100"
        >
          {/* Selection Checkbox with animation */}
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSelectItem(item.id);
              }}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                selectedItems.includes(item.id)
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 scale-110 rotate-3'
                  : 'bg-white/90 border-gray-300 hover:border-green-500 hover:scale-105'
              }`}
            >
              {selectedItems.includes(item.id) && <Check className="w-4 h-4 text-white" />}
            </button>
          </div>

          {/* Remove Button with pulse effect */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromWishlist(item.id);
            }}
            className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl hover:bg-red-50 transition-all group/btn shadow-lg hover:shadow-xl"
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover/btn:scale-125 transition-transform duration-300" />
          </button>

          {/* Enhanced Badges */}
          <div className="absolute top-16 left-4 z-10 flex flex-col gap-2">
            {item.priceDropped && (
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl animate-pulse">
                <TrendingUp className="w-3.5 h-3.5" />
                Price Drop!
              </span>
            )}
            {item.stock === 'Low Stock' && (
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Low Stock
              </span>
            )}
            {item.stock === 'Out of Stock' && (
              <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                Out of Stock
              </span>
            )}
          </div>

          {/* Product Image with enhanced gradient */}
          <div className="relative overflow-hidden">
            <div className="w-full h-64 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center text-8xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {item.image}
            </div>
            {item.discount > 0 && (
              <div className="absolute top-4 right-16 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                -{item.discount}%
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info with enhanced styling */}
          <div className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3 line-clamp-2 h-10 group-hover:text-emerald-600 transition-colors leading-tight">
              {item.name}
            </h3>

            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">{item.rating}</span>
              <span className="text-xs text-gray-400">({item.reviews.toLocaleString()})</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">৳{item.price.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through font-medium">৳{item.originalPrice.toLocaleString()}</span>
            </div>

            {/* Enhanced Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              disabled={item.stock === 'Out of Stock'}
              className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2.5 text-sm ${
                item.stock === 'Out of Stock'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-lg hover:shadow-2xl transform hover:scale-105'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {item.stock === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-5">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-500 flex items-center gap-8 relative border border-gray-100 group"
        >
          {/* Selection Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSelectItem(item.id);
            }}
            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              selectedItems.includes(item.id)
                ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 scale-110'
                : 'bg-white border-gray-300 hover:border-green-500 hover:scale-105'
            }`}
          >
            {selectedItems.includes(item.id) && <Check className="w-4 h-4 text-white" />}
          </button>

          {/* Product Image */}
          <div className="w-36 h-36 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl flex items-center justify-center text-7xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
            {item.image}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-emerald-600 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item.rating}</span>
                    <span className="text-xs text-gray-400">({item.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                    Added {new Date(item.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Enhanced Badges */}
              <div className="flex gap-2 flex-shrink-0">
                {item.priceDropped && (
                  <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md">
                    <TrendingUp className="w-4 h-4" />
                    Price Drop
                  </span>
                )}
                <span className={`text-xs font-bold px-4 py-2 rounded-full shadow-md ${
                  item.stock === 'In Stock' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                  item.stock === 'Low Stock' ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700' :
                  'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                }`}>
                  {item.stock}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">৳{item.price.toLocaleString()}</span>
                <span className="text-base text-gray-400 line-through font-medium">৳{item.originalPrice.toLocaleString()}</span>
                {item.discount > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Save {item.discount}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  disabled={item.stock === 'Out of Stock'}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2.5 text-sm ${
                    item.stock === 'Out of Stock'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-lg hover:shadow-2xl transform hover:scale-105'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {item.stock === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="p-3 rounded-xl hover:bg-red-50 transition-all group/del border border-transparent hover:border-red-200"
                >
                  <Trash2 className="w-5 h-5 text-gray-400 group-hover/del:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-3 flex items-center gap-4">
                <div className="relative">
                  <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
                  <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 absolute -top-1 -right-1" />
                </div>
                My Wishlist
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'treasure' : 'treasures'} waiting for you ✨
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={shareWishlist}
                className="px-7 py-4 bg-white text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-xl border border-gray-200 flex items-center gap-2.5 transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={clearAllWishlist}
                className="px-7 py-4 bg-white text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-md hover:shadow-xl border border-red-200 flex items-center gap-2.5 transform hover:scale-105"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1.5 font-medium">Total Items</p>
                  <p className="text-4xl font-black">{wishlistItems.length}</p>
                </div>
                <Package className="w-12 h-12 text-white/60" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1.5 font-medium">Total Value</p>
                  <p className="text-4xl font-black">৳{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-white/60" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1.5 font-medium">Price Drops</p>
                  <p className="text-4xl font-black">{wishlistItems.filter(item => item.priceDropped).length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-white/60" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm mb-1.5 font-medium">You Save</p>
                  <p className="text-4xl font-black">৳{wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString()}</p>
                </div>
                <Star className="w-12 h-12 text-white/60 fill-white/60" />
              </div>
            </div>
          </div>

          {/* Enhanced Toolbar */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Select All */}
                <button
                  onClick={selectAll}
                  className="flex items-center gap-2.5 px-5 py-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition-all font-medium bg-white shadow-sm hover:shadow-md"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    selectedItems.length === wishlistItems.length && wishlistItems.length > 0
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedItems.length === wishlistItems.length && wishlistItems.length > 0 && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {selectedItems.length === wishlistItems.length && wishlistItems.length > 0 ? 'Deselect All' : 'Select All'}
                  </span>
                </button>

                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                  <>
                    <button
                      onClick={addAllToCart}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add {selectedItems.length} to Cart
                    </button>
                    <button
                      onClick={removeSelected}
                      className="px-6 py-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl font-bold hover:from-red-100 hover:to-rose-100 transition-all flex items-center gap-2 border-2 border-red-200 shadow-sm hover:shadow-md"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove {selectedItems.length}
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search wishlist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium shadow-sm w-64 bg-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none pr-12 bg-white cursor-pointer font-medium shadow-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none pr-12 bg-white cursor-pointer font-medium shadow-sm"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                  </select>
                  <SortAsc className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-1.5 shadow-inner">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-white text-emerald-600 shadow-lg scale-105'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-white text-emerald-600 shadow-lg scale-105'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredItems.length > 0 ? (
          viewMode === 'grid' ? <GridView /> : <ListView />
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-20 text-center shadow-xl border border-gray-200">
            <div className="relative inline-block mb-6">
              <Heart className="w-24 h-24 text-gray-300 mx-auto" />
              <Sparkles className="w-8 h-8 text-amber-400 fill-amber-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 text-lg">Start adding items you love and watch your dreams come true! ✨</p>
            <button className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-black hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}