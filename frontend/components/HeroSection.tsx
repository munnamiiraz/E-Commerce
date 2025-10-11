"use client"
import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShoppingBag, Percent } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section className={`relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Main Hero - 2/3 width */}
          <div className="lg:col-span-2 bg-gradient-to-br from-green-200 to-green-200 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-emerald-500/20 transition-all duration-500 relative">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-between h-full min-h-[500px]">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-slate-800 text-sm font-medium w-fit shadow-lg ring-1 ring-white/30">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>New Collection 2025</span>
              </div>

              {/* Main Content */}
              <div className="space-y-6 mt-8">
                <h1 className="text-3xl sm:text-5xl leading-[1.2] my-3 font-semibold bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs  sm:max-w-md">
                  Discover The Latest Trends
                  <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-gradient">
                    
                  </span>
                </h1>
                

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <button className="group/btn px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-gray-700 rounded-xl font-semibold text-base border-2 border-emerald-600/80 hover:border-emerald-600/50 transition-all duration-300">
                    View Collections
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-5 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700">50K+</div>
                  <div className="text-sm text-gray-700 mt-1">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700">100K+</div>
                  <div className="text-sm text-gray-700 mt-1">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700">4.9★</div>
                  <div className="text-sm text-gray-700 mt-1">Rating</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
          </div>

          {/* Right Column - 1/3 width, split into 2 cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Top Card - Flash Sale */}
            <div className="flex-1 bg-gradient-to-br bg-orange-200 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-pink-500/20 transition-all duration-500 relative min-h-[240px]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-slate-800 text-xs font-semibold mb-4 shadow-lg">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>FLASH SALE</span>
                  </div>
                  
                  <h3 className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40">
                    Up to 70% OFF
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Limited time offer on selected items
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* <Percent className="w-8 h-8 text-slate-800" /> */}
                    <div className="text-slate-800">
                      <div className="text-sm opacity-80">Ends in</div>
                      <div className="text-lg font-bold">12 October</div>
                    </div>
                  </div>
                  
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 hover:bg-white/30 transition-all hover:scale-110 shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Bottom Card - Trending */}
            <div className="flex-1 bg-gradient-to-br bg-blue-200 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-purple-500/20 transition-all duration-500 relative min-h-[240px]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjIiLz48Y2lyY2xlIGN4PSI1NSIgY3k9IjU1IiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-slate-800 text-xs font-semibold mb-4 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    <span>TRENDING</span>
                  </div>
                  
                  <h3 className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40">
                    Best Sellers
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 mt-1">
                    Most loved products by our customers
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 ring-2 ring-white shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-white shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 ring-2 ring-white shadow-lg"></div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md ring-2 ring-white shadow-lg flex items-center justify-center text-slate-800 text-xs font-bold">
                      +99
                    </div>
                  </div>
                  
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 hover:bg-white/30 transition-all hover:scale-110 shadow-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;