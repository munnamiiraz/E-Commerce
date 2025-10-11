"use client"
import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, MapPin, Bell, Heart, ShoppingBag, 
  Package, Settings, LogOut, ChevronRight, Mail, Phone, Edit2,
  Lock, Eye, EyeOff, Globe, Smartphone, CheckCircle, X, Plus,
  Trash2, Star, Gift, Wallet, FileText, HelpCircle, MessageSquare
} from 'lucide-react';

export default function AccountManagementPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile Details', description: 'Manage your personal information' },
    { id: 'security', icon: Shield, label: 'Security', description: 'Password and authentication settings' },
    { id: 'addresses', icon: MapPin, label: 'Addresses', description: 'Manage shipping addresses' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods', description: 'Cards and payment options' },
    { id: 'orders', icon: ShoppingBag, label: 'Order History', description: 'View your past orders' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist', description: 'Your saved items' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Email and push notifications' },
    { id: 'wallet', icon: Wallet, label: 'GoCart Wallet', description: 'Balance and transactions' },
    { id: 'vouchers', icon: Gift, label: 'Vouchers & Coupons', description: 'Your available discounts' },
    { id: 'reviews', icon: Star, label: 'My Reviews', description: 'Products you\'ve reviewed' },
    { id: 'support', icon: HelpCircle, label: 'Help & Support', description: 'FAQs and contact support' },
    { id: 'settings', icon: Settings, label: 'Preferences', description: 'App settings and preferences' },
  ];

  const addresses = [
    { id: 1, type: 'Home', name: 'Md. Mahedi Hassan', phone: '+880 1234-567890', address: 'House 123, Road 12, Dhanmondi, Dhaka 1209', isDefault: true },
    { id: 2, type: 'Office', name: 'Md. Mahedi Hassan', phone: '+880 1234-567890', address: 'Suite 456, Gulshan Avenue, Gulshan 1, Dhaka 1212', isDefault: false },
  ];

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false },
  ];

  const orders = [
    { id: 'ORD-2024-001', date: '2024-01-15', total: 15999, status: 'Delivered', items: 3 },
    { id: 'ORD-2024-002', date: '2024-01-20', total: 8499, status: 'In Transit', items: 2 },
    { id: 'ORD-2024-003', date: '2024-01-25', total: 3299, status: 'Processing', items: 1 },
  ];

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl font-bold">
              MH
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Md. Mahedi Hassan</h3>
              <p className="text-green-100">munnamiraz@gmail.com</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Verified Account</span>
              </div>
            </div>
          </div>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Personal Information</h4>
            <button className="text-green-600 hover:text-green-700">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-medium text-gray-900">Md. Mahedi Hassan</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              <p className="font-medium text-gray-900">January 15, 1995</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <p className="font-medium text-gray-900">Male</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Contact Information</h4>
            <button className="text-green-600 hover:text-green-700">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium text-gray-900">munnamiraz@gmail.com</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Primary</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Phone</label>
                <p className="font-medium text-gray-900">+880 1234-567890</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4">Connected Accounts</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                f
              </div>
              <div>
                <p className="font-medium text-gray-900">Facebook</p>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">Disconnect</button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                G
              </div>
              <div>
                <p className="font-medium text-gray-900">Google</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">SMS Authentication</p>
              <p className="text-sm text-gray-500">Receive codes via SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">Email Authentication</p>
              <p className="text-sm text-gray-500">Receive codes via email</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4">Active Sessions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Chrome on Windows</p>
                <p className="text-sm text-gray-500">Dhaka, Bangladesh • Active now</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Current</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Mobile App on Android</p>
                <p className="text-sm text-gray-500">Dhaka, Bangladesh • 2 days ago</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">End Session</button>
          </div>
        </div>
      </div>
    </div>
  );

  const AddressesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Saved Addresses</h4>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-green-500 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">{addr.type}</span>
                {addr.isDefault && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-green-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{addr.name}</p>
              <p className="text-sm text-gray-600">{addr.phone}</p>
              <p className="text-sm text-gray-600">{addr.address}</p>
            </div>
            {!addr.isDefault && (
              <button className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium">
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const PaymentTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Payment Methods</h4>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {paymentMethods.map((card) => (
          <div key={card.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl text-white">
            <div className="flex items-start justify-between mb-8">
              <div className="text-2xl font-bold">{card.type}</div>
              {card.isDefault && (
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Default</span>
              )}
            </div>
            <div className="space-y-4">
              <div className="text-2xl tracking-wider">•••• •••• •••• {card.last4}</div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Expires</p>
                  <p className="font-medium">{card.expiry}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-white/70 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-white/70 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h4 className="font-semibold text-gray-900 mb-4">Other Payment Options</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">GoCart Wallet</p>
                <p className="text-sm text-gray-500">Balance: ৳2,500</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-500">Pay when you receive</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900">Order History</h4>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-900">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{order.items} items</p>
                <p className="text-lg font-bold text-gray-900">৳{order.total}</p>
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'security': return <SecurityTab />;
      case 'addresses': return <AddressesTab />;
      case 'payment': return <PaymentTab />;
      case 'orders': return <OrdersTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your account info and preferences</p>
          </div>
          <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-6">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{item.label}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}