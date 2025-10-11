"use client"
import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Search, User, Star, Clock, Flame } from 'lucide-react';
import FlashSale from '@/components/FlashSale';
import ShopByCategory from '@/components/ShopByCategory';
import JustForYou from '@/components/JustForYou';
import AllProducts from '@/components/AllProducts';



// ==================== MAIN APP ====================
export default function GoCartAllProducts() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FlashSale  />
        <ShopByCategory />
        <JustForYou />
        <AllProducts />
      </main>

    </div>
  );
}