"use client"

import React, { useState } from 'react';

import DashboardSection from './DashboardSection';
import { BarChart3, Box, CreditCard, FileText, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, ShoppingBag, Star, Store, Tag, Truck, Users, X } from 'lucide-react';
import ProductSection from './ProductSection';
import OrderSection from './OrderSection';
import ReviewSection from './ReviewSection';


export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

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
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null, href: '/seller/dashboard' },
    { id: 'products', icon: Box, label: 'Products', badge: stats.totalProducts },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', badge: stats.pendingOrders },
    { id: 'customers', icon: Users, label: 'Customers', badge: null },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
    { id: 'reviews', icon: Star, label: 'Reviews', badge: 12 },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 5 },
    { id: 'promotions', icon: Tag, label: 'Promotions', badge: null },
    { id: 'shipping', icon: Truck, label: 'Shipping', badge: null },
    { id: 'payments', icon: CreditCard, label: 'Payments', badge: null },
    { id: 'reports', icon: FileText, label: 'Reports', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/20 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-xl fixed h-full z-50`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">My Store</h2>
                  <p className="text-xs text-gray-500 font-medium">Seller Dashboard</p>
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <Store className="w-6 h-6 text-white" />
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
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
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
                          : 'bg-emerald-100 text-emerald-700'
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
        <div className="p-4 border-t border-gray-200">
          <button className={`w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold ${!sidebarOpen && 'justify-center'}`}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300`}>
        {activeSection === 'dashboard' && <DashboardSection />}
        {activeSection === 'products' && <ProductSection />}
        {activeSection === 'orders' && <OrderSection />}
        {activeSection === 'reviews' && <ReviewSection />}
      </main>
    </div>
  );
}