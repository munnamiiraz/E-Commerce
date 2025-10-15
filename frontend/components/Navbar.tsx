"use client"
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Bell, 
  MessageSquare,
  UserCircle,
  Settings,
  Package,
  HelpCircle,
  MessageCircle,
  LogOut,
  UserPlus,
  Store,
  ChevronDown
} from 'lucide-react';
import axios from "axios"

import { useRouter } from "next/navigation";
import Link from 'next/link';
import toast from 'react-hot-toast';




interface NavLinkProps {
  name: string;
  href: string;
}

interface IUser {
  name: string,
  email: string,
  avatarUrl: string | null
  address: string | null,
  cover: string | null
  createdAt: Date
  designation: string | null
  phone: string | null,
  id: string
  points: number,
  totalOrders: number | null,
  totalReviews: number
}


const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('Shop');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [cartCount] = useState<number>(3);
  const [notificationCount] = useState<number>(5);
  const [messageCount] = useState<number>(2);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const navLinks: NavLinkProps[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Seller', href: '/seller' },
    { name: 'Admin', href: '/admin' },
  ];



  const profileMenuItems = [
    { icon: UserCircle, label: 'My Profile', href: '/my-profile'},
    { icon: Settings, label: 'Manage Account', href: "/manage-account" },
    { icon: Package, label: 'My Orders', href: "/my-orders" },
    { icon: HelpCircle, label: 'Help & Support', href: "/help&support"},
    { icon: MessageCircle, label: 'Give Feedback', href: "/give-feedback"},
    { divider: true },
    { icon: UserPlus, label: 'Add Another Account', href: "/sign-in"},
    { icon: Store, label: 'Add Seller Account', href: "/seller/sign-in"},
    { divider: true },
    { icon: LogOut, label: 'Sign Out', action: () => signOutHandeler(), danger: true },
  ];

  const notifications = [
    { id: 1, title: 'Order Shipped', message: 'Your order #12345 has been shipped', time: '2m ago', unread: true },
    { id: 2, title: 'New Message', message: 'You have a new message from seller', time: '1h ago', unread: true },
    { id: 3, title: 'Price Drop', message: 'Item in your wishlist is now 20% off', time: '3h ago', unread: false },
  ];

  const signOutHandeler = () => {
    localStorage.removeItem('token')
  }

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);
    console.log(`Clicked on ${link}`);
    router.push(link);
  };

  const handleCartHandeler = () => {
    router.push('/cart');
  }

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    console.log(token);

    const getUserData = async () => {
      if (token) {
        setIsLoggedIn(true);
        
        try {
          const data = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/get-profile", {headers: {token}})
          setUser(data.data.data)
        } catch (error) {
          toast.error("something went wrong")
          console.log(error);
          
        }
      } else {
        setIsLoggedIn(false);
      }
    }
    getUserData();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log(user);
  

  return (
    <nav className={`bg-white shadow-md sticky h-[80px] top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="text-2xl font-bold transition-transform group-hover:scale-105">
                <span className="text-emerald-500 text-3xl">go</span>
                <span className="text-gray-800 text-3xl ">cart</span>
                <span className="text-emerald-500">.</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeLink === link.href
                    ? 'text-emerald-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.name}
                {activeLink === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-[300px] pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>

            {/* Messages */}
            <button className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 group">
              <MessageSquare className="w-5 h-5" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs flex items-center justify-center rounded-full font-semibold shadow-lg ring-2 ring-white">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs flex items-center justify-center rounded-full font-semibold shadow-lg ring-2 ring-white animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                    <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                    <p className="text-xs text-gray-600 mt-0.5">You have {notificationCount} unread notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-b-0 ${
                          notif.unread ? 'bg-emerald-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              {notif.title}
                              {notif.unread && (
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button className="relative flex gap-2 p-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 group"
              onClick={handleCartHandeler}
            >
              
              <ShoppingCart className="w-5 h-5" />
              <div className='font-semibold'>Cart</div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs flex items-center justify-center rounded-full font-semibold shadow-lg ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Sign In */}
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
                    {user?.name}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="px-5 py-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white/30">
                          {user?.avatarUrl}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base truncate">{user?.name}</h3>
                          <p className="text-sm text-emerald-50 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {profileMenuItems.map((item, index) => (
                        item.divider ? (
                          <div key={`divider-${index}`} className="my-2 border-t border-gray-100"></div>
                        ) : (
                          <button
                            key={item.label}
                            onClick={() => item.href ? router.push(item.href) : item.action?.()}
                            className={`w-full flex items-center space-x-3 px-5 py-3 transition-all duration-150 ${
                              item.danger 
                                ? 'hover:bg-red-50 text-red-600' 
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {/* <item.icon className="w-5 h-5" /> */}
                            <span className="font-medium text-sm">{item.label}</span>
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile User Info */}
            {isLoggedIn && (
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{user?.name}</h3>
                  <p className="text-xs text-emerald-50 truncate">{user?.email}</p>
                </div>
              </div>
            )}

            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeLink === link.href
                    ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Actions */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
              <button className="flex flex-col items-center space-y-1 py-3 text-gray-600 hover:text-emerald-600 transition-colors">
                <div className="relative">
                  <MessageSquare className="w-5 h-5" />
                  {messageCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                      {messageCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Messages</span>
              </button>
              <button className="flex flex-col items-center space-y-1 py-3 text-gray-600 hover:text-emerald-600 transition-colors">
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                      {notificationCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Notifications</span>
              </button>
              <button className="flex flex-col items-center space-y-1 py-3 text-gray-600 hover:text-emerald-600 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;