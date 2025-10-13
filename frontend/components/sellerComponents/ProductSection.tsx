"use client"
import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Eye, Package, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  sold: number;
  image: string;
  status: 'active' | 'draft' | 'out-of-stock';
}

const ProductSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Sample products data - replace with your backend data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 199,
      originalPrice: 299,
      stock: 23,
      sold: 145,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      status: 'active'
    },
    {
      id: '2',
      title: 'Smart Watch Pro Series',
      category: 'Electronics',
      price: 349,
      originalPrice: 499,
      stock: 12,
      sold: 89,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      status: 'active'
    },
    {
      id: '3',
      title: 'Leather Laptop Bag',
      category: 'Fashion',
      price: 89,
      originalPrice: 129,
      stock: 0,
      sold: 234,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      status: 'out-of-stock'
    },
    {
      id: '4',
      title: 'Gaming Mouse RGB',
      category: 'Electronics',
      price: 59,
      originalPrice: 89,
      stock: 45,
      sold: 312,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      status: 'active'
    },
    {
      id: '5',
      title: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 129,
      originalPrice: 179,
      stock: 8,
      sold: 156,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      status: 'active'
    },
    {
      id: '6',
      title: 'Cotton T-Shirt Pack',
      category: 'Fashion',
      price: 45,
      originalPrice: 65,
      stock: 67,
      sold: 421,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      status: 'active'
    }
  ]);

  const calculateDiscount = (original: number, price: number): number => {
    return Math.floor(((original - price) / original) * 100);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'out-of-stock':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0);
  const activeProducts = products.filter(p => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">Manage and track your product inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Products</span>
              <Package className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
            <p className="text-green-600 text-sm mt-1">{activeProducts} Active</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Sold</span>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalSold}</p>
            <p className="text-gray-500 text-sm mt-1">All time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Revenue</span>
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-1">All time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Low Stock</span>
              <ShoppingBag className="text-orange-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </p>
            <p className="text-orange-600 text-sm mt-1">Need restock</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home & Garden</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => console.log('Navigate to product:', product.id)}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(product.status)}`}>
                    {product.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                {calculateDiscount(product.originalPrice, product.price) > 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-3">
                  <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
                    {product.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-green-600">৳{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">৳{product.originalPrice}</span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className={`text-sm font-semibold ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                      {product.stock} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sold</p>
                    <p className="text-sm font-semibold text-gray-900">{product.sold} units</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View product:', product.id);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit product:', product.id);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Delete product:', product.id);
                    }}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;