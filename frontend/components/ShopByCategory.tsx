"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
  icon?: string;
  bgGradient?: string;
}

const ShopByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // TODO: Replace with your actual backend API endpoint
        // const response = await axios.get('YOUR_API_ENDPOINT/categories');
        // setCategories(response.data);
        
        // Mock data for demonstration - Remove this when connecting to backend
        const mockData: Category[] = [
          {
            id: 1,
            name: 'Electronics',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop',
            productCount: 234,
            bgGradient: 'from-blue-500 to-purple-600'
          },
          {
            id: 2,
            name: 'Fashion',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop',
            productCount: 567,
            bgGradient: 'from-pink-500 to-rose-600'
          },
          {
            id: 3,
            name: 'Home & Living',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
            productCount: 189,
            bgGradient: 'from-amber-500 to-orange-600'
          },
          {
            id: 4,
            name: 'Sports',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
            productCount: 432,
            bgGradient: 'from-green-500 to-emerald-600'
          },
          {
            id: 5,
            name: 'Beauty & Health',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
            productCount: 321,
            bgGradient: 'from-purple-500 to-pink-600'
          },
          {
            id: 6,
            name: 'Books & Media',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop',
            productCount: 156,
            bgGradient: 'from-indigo-500 to-blue-600'
          },
          {
            id: 7,
            name: 'Toys & Games',
            image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop',
            productCount: 278,
            bgGradient: 'from-red-500 to-pink-600'
          },
          {
            id: 8,
            name: 'Automotive',
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
            productCount: 198,
            bgGradient: 'from-gray-700 to-gray-900'
          }
        ];
        
        setTimeout(() => {
          setCategories(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    // router.push(`/shop/${categoryId}`);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider mb-2 block">
              Explore Collections
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Shop By Category
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            Discover amazing products across all categories. Find exactly what you're looking for.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-emerald-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/shop/${category.id}`}>
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {/* Background Image with Overlay */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-120"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} opacity-60 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-white/90 text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {category.productCount} Products
                        </span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>

            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <span>View All Categories</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ShopByCategory;