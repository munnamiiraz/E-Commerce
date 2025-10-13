"use client"

import React, { useState } from 'react';
import { 
  Shield, Store, Package, ShoppingCart, DollarSign, TrendingUp, 
  Users, Star, Eye, Settings, Bell, Search,
  Plus, BarChart3, ArrowUpRight, ArrowDownRight, Clock,
  CheckCircle, XCircle, AlertCircle, Sparkles, Zap,
  Filter, Calendar, Download, Share2,
  MessageSquare, Tag, Truck, CreditCard, Box,
  ShoppingBag, FileText, LayoutDashboard, UserCircle,
  LogOut, ChevronRight, Menu, X, AlertTriangle,
  Percent, Flag, TrendingDown, Activity, Globe,
  ShieldCheck, ShieldAlert, UserCheck, UserX, Mail,
  PhoneCall, MapPin, Award, Target, Layers
} from 'lucide-react';

interface Store {
  id: number;
  name: string;
  owner: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  products: number;
  revenue: number;
  orders: number;
  rating: number;
  joinDate: string;
  image: string;
}

interface Seller {
  id: number;
  name: string;
  email: string;
  store: string;
  revenue: number;
  products: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
}

interface Complaint {
  id: string;
  type: 'product' | 'seller' | 'delivery' | 'payment';
  from: string;
  against: string;
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  date: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats = {
    totalRevenue: 8567500,
    revenueGrowth: 18.5,
    totalOrders: 15847,
    ordersGrowth: 12.3,
    totalProducts: 2847,
    productsGrowth: 8.7,
    totalStores: 156,
    storesGrowth: 15.2,
    pendingStores: 12,
    activeStores: 132,
    suspendedStores: 8,
    totalSellers: 156,
    activeSellers: 142,
    totalCustomers: 45632,
    customersGrowth: 22.4,
    pendingComplaints: 18,
    activeCoupons: 24,
    platformFee: 428375,
    conversionRate: 4.2
  };

  const pendingStores: Store[] = [
    { id: 1, name: 'Tech Haven Store', owner: 'Ahmed Rahman', status: 'pending', products: 0, revenue: 0, orders: 0, rating: 0, joinDate: '2024-01-28', image: '🏪' },
    { id: 2, name: 'Fashion Hub', owner: 'Fatima Khan', status: 'pending', products: 0, revenue: 0, orders: 0, rating: 0, joinDate: '2024-01-27', image: '👗' },
    { id: 3, name: 'Home Decor Paradise', owner: 'Imran Ali', status: 'pending', products: 0, revenue: 0, orders: 0, rating: 0, joinDate: '2024-01-26', image: '🛋️' },
  ];

  const topStores: Store[] = [
    { id: 1, name: 'Electronics Pro', owner: 'Hassan Mahmud', status: 'approved', products: 234, revenue: 1245000, orders: 1847, rating: 4.8, joinDate: '2023-06-15', image: '⚡' },
    { id: 2, name: 'Style Center', owner: 'Ayesha Begum', status: 'approved', products: 456, revenue: 987500, orders: 2341, rating: 4.9, joinDate: '2023-08-20', image: '👔' },
    { id: 3, name: 'Sports Arena', owner: 'Karim Sheikh', status: 'approved', products: 189, revenue: 654300, orders: 1234, rating: 4.7, joinDate: '2023-10-10', image: '⚽' },
    { id: 4, name: 'Book World', owner: 'Nadia Islam', status: 'approved', products: 892, revenue: 543200, orders: 987, rating: 4.6, joinDate: '2023-07-05', image: '📚' },
  ];

  const recentComplaints: Complaint[] = [
    { id: '#CMP-847', type: 'product', from: 'Customer #2341', against: 'Electronics Pro', status: 'pending', date: '2024-01-28', priority: 'high' },
    { id: '#CMP-846', type: 'delivery', from: 'Customer #5623', against: 'Style Center', status: 'investigating', date: '2024-01-28', priority: 'medium' },
    { id: '#CMP-845', type: 'seller', from: 'Customer #8934', against: 'Sports Arena', status: 'resolved', date: '2024-01-27', priority: 'low' },
    { id: '#CMP-844', type: 'payment', from: 'Customer #1256', against: 'Book World', status: 'pending', date: '2024-01-27', priority: 'critical' },
  ];

  const topSellers: Seller[] = [
    { id: 1, name: 'Hassan Mahmud', email: 'hassan@mail.com', store: 'Electronics Pro', revenue: 1245000, products: 234, status: 'active', lastActive: '2 mins ago' },
    { id: 2, name: 'Ayesha Begum', email: 'ayesha@mail.com', store: 'Style Center', revenue: 987500, products: 456, status: 'active', lastActive: '5 mins ago' },
    { id: 3, name: 'Karim Sheikh', email: 'karim@mail.com', store: 'Sports Arena', revenue: 654300, products: 189, status: 'active', lastActive: '1 hour ago' },
  ];

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { id: 'stores', icon: Store, label: 'All Stores', badge: stats.totalStores },
    { id: 'pending-stores', icon: ShieldAlert, label: 'Pending Approvals', badge: stats.pendingStores },
    { id: 'sellers', icon: Users, label: 'Sellers', badge: stats.totalSellers },
    { id: 'customers', icon: UserCircle, label: 'Customers', badge: null },
    { id: 'products', icon: Box, label: 'All Products', badge: stats.totalProducts },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', badge: null },
    { id: 'complaints', icon: Flag, label: 'Complaints', badge: stats.pendingComplaints },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 8 },
    { id: 'coupons', icon: Percent, label: 'Coupons', badge: stats.activeCoupons },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
    { id: 'reports', icon: FileText, label: 'Reports', badge: null },
    { id: 'payments', icon: CreditCard, label: 'Payments', badge: null },
    { id: 'shipping', icon: Truck, label: 'Shipping', badge: null },
    { id: 'platform', icon: Globe, label: 'Platform Settings', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      suspended: 'bg-orange-100 text-orange-700 border-orange-200',
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-gray-100 text-gray-700 border-gray-200',
      investigating: 'bg-blue-100 text-blue-700 border-blue-200',
      resolved: 'bg-green-100 text-green-700 border-green-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      critical: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getComplaintTypeIcon = (type: string) => {
    const icons = {
      product: Package,
      seller: Users,
      delivery: Truck,
      payment: CreditCard
    };
    return icons[type as keyof typeof icons] || AlertCircle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-xl fixed h-full z-50 overflow-y-auto`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-500 font-medium">Super Administrator</p>
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full mt-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 mx-auto" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${sidebarOpen ? '' : 'mx-auto'} ${activeSection === item.id ? '' : 'group-hover:scale-110 transition-transform'}`} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-bold text-sm">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeSection === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button className={`w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold ${!sidebarOpen && 'justify-center'}`}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1">Admin Dashboard</h1>
                <p className="text-gray-600 font-medium">Platform overview and management center</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stores, sellers, orders..."
                    className="pl-12 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium shadow-sm w-96 bg-white"
                  />
                </div>
                <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-all">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    AD
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
              <button className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <ShieldCheck className="w-5 h-5" />
                <span className="hidden sm:inline">Approve Stores ({stats.pendingStores})</span>
                <span className="sm:hidden">Approvals</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">View Messages</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <Percent className="w-5 h-5" />
                <span className="hidden sm:inline">Create Coupon</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl font-bold shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export Report</span>
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
              <p className="text-gray-600 text-sm font-medium mb-1">Platform Revenue</p>
              <p className="text-3xl font-black text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Platform Fee: ৳{stats.platformFee.toLocaleString()}</p>
            </div>

            {/* Total Stores */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stats.storesGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stats.storesGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(stats.storesGrowth)}%
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Stores</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalStores}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">{stats.pendingStores} pending approval</p>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
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
              <p className="text-3xl font-black text-gray-900">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">All time platform orders</p>
            </div>

            {/* Total Products */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
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
              <p className="text-3xl font-black text-gray-900">{stats.totalProducts.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Across all stores</p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active Stores */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-5 shadow-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="w-8 h-8 text-white/80" />
                <span className="text-2xl font-black">{stats.activeStores}</span>
              </div>
              <p className="text-sm font-bold text-green-100">Active Stores</p>
            </div>

            {/* Suspended Stores */}
            <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl p-5 shadow-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-2">
                <ShieldAlert className="w-8 h-8 text-white/80" />
                <span className="text-2xl font-black">{stats.suspendedStores}</span>
              </div>
              <p className="text-sm font-bold text-red-100">Suspended Stores</p>
            </div>

            {/* Total Customers */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 shadow-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-white/80" />
                <span className="text-2xl font-black">{stats.totalCustomers.toLocaleString()}</span>
              </div>
              <p className="text-sm font-bold text-blue-100">Total Customers</p>
            </div>

            {/* Pending Complaints */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 shadow-xl text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Flag className="w-8 h-8 text-white/80" />
                <span className="text-2xl font-black">{stats.pendingComplaints}</span>
              </div>
              <p className="text-sm font-bold text-orange-100">Pending Complaints</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Pending Store Approvals */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Pending Store Approvals</h3>
                  <p className="text-sm text-gray-600 font-medium">Review and approve new stores</p>
                </div>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all flex items-center gap-2">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {pendingStores.map((store) => (
                  <div key={store.id} className="p-5 hover:bg-gray-50 rounded-2xl transition-all border border-gray-200">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                          {store.image}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 mb-1">{store.name}</h4>
                          <p className="text-sm text-gray-600 font-medium mb-2">Owner: {store.owner}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {new Date(store.joinDate).toLocaleDateString()}
                            </span>
                            <span className={`px-3 py-1 rounded-full font-bold border ${getStatusColor(store.status)}`}>
                              Pending Review
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-200 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                        <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Activity */}
            <div className="space-y-6">
              {/* Platform Health */}
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black">Platform Health</h3>
                  <Activity className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-100">System Uptime</span>
                      <span className="text-sm font-black">99.9%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '99.9%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-100">Active Users</span>
                      <span className="text-sm font-black">8,547</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-100">Server Load</span>
                      <span className="text-sm font-black">42%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-black text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all border border-blue-200 group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-900 text-sm">Chat with Sellers</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all border border-orange-200 group">
                    <div className="flex items-center gap-3">
                      <Flag className="w-5 h-5 text-orange-600" />
                      <span className="font-bold text-gray-900 text-sm">Review Complaints</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all border border-green-200 group">
                    <div className="flex items-center gap-3">
                      <Percent className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-gray-900 text-sm">Manage Coupons</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Recent Complaints</h3>
                <p className="text-sm text-gray-600 font-medium">Customer complaints requiring attention</p>
              </div>
              <button className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-xl font-bold transition-all flex items-center gap-2">
                View All Complaints
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentComplaints.map((complaint) => {
                const IconComponent = getComplaintTypeIcon(complaint.type);
                return (
                  <div key={complaint.id} className="p-5 hover:bg-gray-50 rounded-2xl transition-all border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        complaint.priority === 'critical' ? 'bg-red-100' :
                        complaint.priority === 'high' ? 'bg-orange-100' :
                        complaint.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          complaint.priority === 'critical' ? 'text-red-600' :
                          complaint.priority === 'high' ? 'text-orange-600' :
                          complaint.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-black text-gray-900">{complaint.id}</p>
                            <p className="text-sm text-gray-600 font-medium">{complaint.from} → {complaint.against}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(complaint.status)}`}>
                            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">{new Date(complaint.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-all text-xs">
                            Investigate
                          </button>
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-bold hover:bg-green-100 transition-all text-xs">
                            Resolve
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Stores */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Top Performing Stores</h3>
                <p className="text-sm text-gray-600 font-medium">Best sellers on the platform</p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all flex items-center gap-2">
                View All Stores
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topStores.map((store, index) => (
                <div key={store.id} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden">
                  {/* Rank Badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                      'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>

                  <div className="w-full h-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {store.image}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{store.name}</h4>
                  <p className="text-xs text-gray-600 font-medium mb-3">by {store.owner}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Revenue:</span>
                      <span className="font-black text-emerald-600">৳{store.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Orders:</span>
                      <span className="font-bold text-gray-900">{store.orders.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Products:</span>
                      <span className="font-bold text-gray-900">{store.products}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-900">{store.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-all text-xs">
                      View Store
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sellers Table */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Top Sellers</h3>
                <p className="text-sm text-gray-600 font-medium">Most successful sellers on the platform</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border-2 border-gray-200 rounded-xl font-bold hover:border-purple-500 transition-all flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-xl font-bold transition-all flex items-center gap-2">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Seller</th>
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Store</th>
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Revenue</th>
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Products</th>
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-black text-gray-600">Last Active</th>
                    <th className="text-right py-4 px-4 text-sm font-black text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellers.map((seller) => (
                    <tr key={seller.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {seller.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{seller.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{seller.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-900 text-sm">{seller.store}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-black text-emerald-600 text-sm">৳{seller.revenue.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-900 text-sm">{seller.products}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(seller.status)}`}>
                          {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600 font-medium">{seller.lastActive}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all group">
                            <MessageSquare className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
                            <Eye className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all group">
                            <Settings className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {topSellers.map((seller) => (
                <div key={seller.id} className="p-4 border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{seller.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{seller.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(seller.status)}`}>
                      {seller.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Store:</span>
                      <span className="font-bold text-gray-900">{seller.store}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Revenue:</span>
                      <span className="font-black text-emerald-600">৳{seller.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Products:</span>
                      <span className="font-bold text-gray-900">{seller.products}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-all text-sm flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}