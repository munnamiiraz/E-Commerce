"use client"
import React, { use, useState, useEffect } from 'react';
import { 
  User, 
  ShoppingBag, 
  Package, 
  Heart, 
  MapPin, 
  Mail, 
  Phone,
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Star,
  Edit,
  Camera,
  Crown,
  Zap
} from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast"
import {images} from '../asset/asset.js'
import { useRouter } from 'next/navigation';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  avatarUrl: string | null;
  coverUrl: string | null
  cover: string | null;
  points: number
  totalOrders: number
  totalReviews: number
  designation: string
  createdAt: Date
}


const MyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist'>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()

  const getUserData = async () => {
    try {
      if(!token) {
        toast.error("Please login")
        router.push("/login")
        return
      }
      const data: UserData = await axios.get(process.env.PORT + "api/user/get-profile")
      console.log(data)
      if(!data) {
        toast.error("Something went wrong")
        router.push("/")
        return
      }
      setUserData(data)
    } catch (error) {
      toast.error("Something went wrong")
      router.push("/")
      return
    }
  }

  const getToken = async () => {
    try {
      const data: string | null = localStorage.getItem("token")
    } catch{
      toast.error("Something went wrong")
      router.push("/")
      return
    }
  }

  useEffect(() => {
    getToken()

    getUserData()
  }, [])



  // Stats
  const stats = [
    { 
      icon: ShoppingBag, 
      label: 'Total Orders', 
      value: '47', 
      change: '+12%',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      icon: Package, 
      label: 'Delivered', 
      value: '42', 
      change: '+8%',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Clock, 
      label: 'Pending', 
      value: '3', 
      change: '-5%',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      icon: Heart, 
      label: 'Wishlist Items', 
      value: '18', 
      change: '+3',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    }
  ];

  // Monthly spending data
  const spendingData = [
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 680 },
    { month: 'Mar', amount: 520 },
    { month: 'Apr', amount: 890 },
    { month: 'May', amount: 750 },
    { month: 'Jun', amount: 1200 }
  ];

  // Order status data
  const orderStatusData = [
    { name: 'Delivered', value: 42, color: '#10b981' },
    { name: 'Pending', value: 3, color: '#f59e0b' },
    { name: 'Cancelled', value: 2, color: '#ef4444' }
  ];

  // Category spending
  const categoryData = [
    { category: 'Electronics', amount: 2400 },
    { category: 'Fashion', amount: 1800 },
    { category: 'Home', amount: 1200 },
    { category: 'Sports', amount: 800 }
  ];

  // Recent orders
  const recentOrders = [
    { 
      id: '#ORD-2024-001', 
      product: 'Premium Wireless Headphones', 
      date: '2 days ago', 
      status: 'Delivered', 
      amount: 199,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-2024-002', 
      product: 'Smart Home Cleaner', 
      date: '1 week ago', 
      status: 'In Transit', 
      amount: 229,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-2024-003', 
      product: 'Apple Smart Watch', 
      date: '2 weeks ago', 
      status: 'Delivered', 
      amount: 199,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop'
    }
  ];

  // Wishlist items
  const wishlistItems = [
    { 
      id: 1, 
      name: 'Gaming Laptop Pro', 
      price: 1499, 
      inStock: true,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100&h=100&fit=crop'
    },
    { 
      id: 2, 
      name: 'Mechanical Keyboard', 
      price: 149, 
      inStock: true,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop'
    },
    { 
      id: 3, 
      name: 'Drone 4K Camera', 
      price: 899, 
      inStock: false,
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=100&h=100&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 right-4">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-20 relative z-10">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-3xl overflow-hidden ring-8 ring-white shadow-2xl">
                  <img src={userData?.avatarUrl ?? "/images/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* User Details */}
              <div className="flex-1 mt-6 md:mt-0">
                <div className="flex mt-[100px] items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center space-x-1 shadow-lg">
                    <Crown className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">{userData?.designation}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium">{userData?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{userData?.phone || 'Set Phone Number'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{userData?.address || 'Set Location'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Points Card */}
              <div className="mt-6 md:mt-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl min-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <p className="text-sm opacity-90">Reward Points</p>
                </div>
                <p className="text-4xl font-bold">{userData?.points}</p>
                <p className="text-xs opacity-75 mt-1">Member since {userData?.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {(['overview', 'orders', 'wishlist'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Spending Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600 mr-2" />
                  Monthly Spending
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Order Status Pie */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Package className="w-6 h-6 text-blue-600 mr-2" />
                  Order Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Spending Bar Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 text-purple-600 mr-2" />
                Spending by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <ShoppingBag className="w-6 h-6 text-emerald-600 mr-2" />
                Recent Orders
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img src={order.image} alt={order.product} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{order.product}</h4>
                      <p className="text-sm text-gray-600 mt-1">Order ID: {order.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${order.amount}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-2xl font-bold text-emerald-600 mb-3">${item.price}</p>
                  {item.inStock ? (
                    <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Add to Cart
                    </button>
                  ) : (
                    <button className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed">
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;