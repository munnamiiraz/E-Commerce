import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'New' | 'Hot' | 'Sale';
  discount?: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Replace with your actual backend API endpoint
        // const response = await axios.get('YOUR_API_ENDPOINT/products');
        // setProducts(response.data);
        
        // Mock data for demonstration - Remove this when connecting to backend
        const mockData: Product[] = [
          {
            id: 1,
            name: 'Smart Home Cleaner',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
            price: 229,
            originalPrice: 299,
            rating: 4,
            reviewCount: 128,
            badge: 'New',
            discount: '-23%'
          },
          {
            id: 2,
            name: 'Ergonomic Mouse',
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
            price: 99,
            rating: 5,
            reviewCount: 256,
            badge: 'Hot'
          },
          {
            id: 3,
            name: 'Apple Smart Watch',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
            price: 199,
            originalPrice: 249,
            rating: 4,
            reviewCount: 543,
            badge: 'Sale',
            discount: '-20%'
          },
          {
            id: 4,
            name: 'Apple Wireless Earbuds',
            image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop',
            price: 89,
            rating: 4,
            reviewCount: 432
          }
        ];
        
        setTimeout(() => {
          setProducts(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Latest Products</h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-600">Showing {products.length} of 72 products</p>
            <a href="#" className="text-emerald-500 font-medium hover:text-emerald-600 transition">
              View more →
            </a>
          </div>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-2"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                        product.badge === 'New'
                          ? 'bg-blue-500'
                          : product.badge === 'Hot'
                          ? 'bg-orange-500'
                          : 'bg-pink-500'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  
                  {product.discount && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {product.discount}
                    </span>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-emerald-500">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;