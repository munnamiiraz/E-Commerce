import { 
  Store, Package, ShoppingCart, DollarSign, TrendingUp, 
  Users, Star, Eye, Heart, Settings, Bell, Search,
  Plus, BarChart3, ArrowUpRight, ArrowDownRight, Clock,
  CheckCircle, XCircle, AlertCircle, Sparkles, Zap,
  Grid3x3, List, Filter, Calendar, Download, Share2,
  MessageSquare, Tag, Truck, CreditCard, Home, Box,
  ShoppingBag, FileText, LayoutDashboard, UserCircle,
  LogOut, ChevronRight, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  status: 'active' | 'inactive';
  views: number;
}



const DashboardSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = {
      totalRevenue: 156750,
      revenueGrowth: 12.5,
      totalOrders: 342,
      ordersGrowth: 8.3,
      totalProducts: 48,
      productsGrowth: 5.2,
      totalCustomers: 1847,
      customersGrowth: 15.7,
      pendingOrders: 23,
      lowStock: 8,
      totalViews: 45632,
      conversionRate: 3.8
    };
  
    const recentProducts: Product[] = [
      { id: 1, name: 'Premium Wireless Headphones', price: 2499, stock: 45, sold: 234, image: '🎧', status: 'active', views: 1234 },
      { id: 2, name: 'Smart Fitness Watch Pro', price: 3299, stock: 12, sold: 189, image: '⌚', status: 'active', views: 2156 },
      { id: 3, name: 'Professional DSLR Camera', price: 45999, stock: 3, sold: 67, image: '📷', status: 'active', views: 543 },
      { id: 4, name: 'Gaming Mechanical Keyboard', price: 1899, stock: 0, sold: 156, image: '⌨️', status: 'inactive', views: 876 },
    ];
  
    const recentOrders: Order[] = [
      { id: '#ORD-2847', customer: 'Ahmed Rahman', amount: 5299, status: 'pending', date: '2024-01-28', items: 2 },
      { id: '#ORD-2846', customer: 'Fatima Khan', amount: 2499, status: 'processing', date: '2024-01-28', items: 1 },
      { id: '#ORD-2845', customer: 'Imran Ali', amount: 8799, status: 'shipped', date: '2024-01-27', items: 3 },
      { id: '#ORD-2844', customer: 'Ayesha Begum', amount: 1899, status: 'delivered', date: '2024-01-27', items: 1 },
      { id: '#ORD-2843', customer: 'Hassan Mahmud', amount: 45999, status: 'cancelled', date: '2024-01-26', items: 1 },
    ];
  
    
  
    const getStatusColor = (status: string) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        processing: 'bg-blue-100 text-blue-700 border-blue-200',
        shipped: 'bg-purple-100 text-purple-700 border-purple-200',
        delivered: 'bg-green-100 text-green-700 border-green-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200',
        active: 'bg-green-100 text-green-700 border-green-200',
        inactive: 'bg-gray-100 text-gray-700 border-gray-200'
      };
      return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
    };


  return (
    <main>
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-600 font-medium">Welcome back! Here's what's happening with your store today.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="pl-12 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium shadow-sm w-80 bg-white"
                  />
                </div>
                <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">John Seller</p>
                    <p className="text-xs text-gray-500">Premium Seller</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    JS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 md:p-8">
          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/seller/add-product" >
                <button className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add New Product</span>
                  <span className="sm:hidden">Add Product</span>
                  
                </button>
              </Link>

              <button className="flex items-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <Tag className="w-5 h-5" />
                <span className="hidden sm:inline">Create Promotion</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stats.revenueGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stats.revenueGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(stats.revenueGrowth)}%
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">+৳{(stats.totalRevenue * stats.revenueGrowth / 100).toFixed(0)} this month</p>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stats.ordersGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stats.ordersGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(stats.ordersGrowth)}%
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Orders</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalOrders}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">{stats.pendingOrders} pending orders</p>
            </div>

            {/* Total Products */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stats.productsGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stats.productsGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(stats.productsGrowth)}%
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Products</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalProducts}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">{stats.lowStock} low stock alerts</p>
            </div>

            {/* Total Customers */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stats.customersGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stats.customersGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(stats.customersGrowth)}%
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Customers</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalCustomers.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">+{(stats.totalCustomers * stats.customersGrowth / 100).toFixed(0)} new this month</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Recent Orders</h3>
                  <p className="text-sm text-gray-600 font-medium">Latest customer orders</p>
                </div>
                <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl font-bold transition-all flex items-center gap-2">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600 font-medium">{order.customer} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-black text-gray-900">৳{order.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 font-medium">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {/* Store Performance */}
              <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black">Store Performance</h3>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-100">Total Views</span>
                      <span className="text-sm font-black">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-100">Conversion Rate</span>
                      <span className="text-sm font-black">{stats.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: `${stats.conversionRate * 10}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-black text-gray-900 mb-4">Alerts & Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-yellow-900">Low Stock Alert</p>
                      <p className="text-xs text-yellow-700 font-medium">{stats.lowStock} products need restocking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-900">Pending Orders</p>
                      <p className="text-xs text-blue-700 font-medium">{stats.pendingOrders} orders waiting for action</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-green-900">New Reviews</p>
                      <p className="text-xs text-green-700 font-medium">12 reviews pending your response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Top Performing Products</h3>
                <p className="text-sm text-gray-600 font-medium">Your best sellers this month</p>
              </div>
              <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl font-bold transition-all flex items-center gap-2">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((product) => (
                <div key={product.id} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105">
                  <div className="w-full h-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">{product.name}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-black text-emerald-600">৳{product.price.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Sold:</span>
                      <span className="font-bold text-gray-900">{product.sold}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Stock:</span>
                      <span className={`font-bold ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Views:</span>
                      <span className="font-bold text-gray-900">{product.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  )
}

export default DashboardSection
