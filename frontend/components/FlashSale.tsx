import React, { useState, useEffect } from 'react';
import { Clock, Flame, TrendingUp, ShoppingBag, Eye } from 'lucide-react';

interface FlashSaleProduct {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  stock: number;
  totalStock: number;
  image: string;
  sold: number;
}

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 24,
    seconds: 45
  });

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products: FlashSaleProduct[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      originalPrice: 15000,
      salePrice: 8999,
      discount: 40,
      stock: 12,
      totalStock: 50,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      sold: 38
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      category: 'Wearables',
      originalPrice: 25000,
      salePrice: 14999,
      discount: 40,
      stock: 8,
      totalStock: 40,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      sold: 32
    },
    {
      id: '3',
      name: 'Designer Sunglasses',
      category: 'Fashion',
      originalPrice: 8000,
      salePrice: 4799,
      discount: 40,
      stock: 25,
      totalStock: 60,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      sold: 35
    },
    {
      id: '4',
      name: 'Leather Backpack',
      category: 'Accessories',
      originalPrice: 12000,
      salePrice: 7199,
      discount: 40,
      stock: 5,
      totalStock: 35,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      sold: 30
    }
  ];

  const formatTime = (num: number) => String(num).padStart(2, '0');
  const stockPercentage = (stock: number, total: number) => ((total - stock) / total) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-2xl">
              <Flame className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-3xl font-bold text-white">Flash Sale</h2>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-white text-opacity-90 text-sm">Hot deals ending soon!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-white" />
            <div className="flex gap-2">
              {[
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((item, idx) => (
                <React.Fragment key={item.label}>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 min-w-[70px] text-center">
                    <div className="text-2xl font-bold text-white">{formatTime(item.value)}</div>
                    <div className="text-xs text-white text-opacity-80">{item.label}</div>
                  </div>
                  {idx < 2 && <div className="text-2xl font-bold text-white self-center">:</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{product.discount}%
            </div>
            
            {/* Stock Badge */}
            {product.stock < 10 && (
              <div className="absolute top-3 right-3 z-20 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                Only {product.stock} left!
              </div>
            )}

            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-3 rounded-full hover:from-teal-500 hover:to-teal-600 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-500 transition-colors">
                {product.name}
              </h3>
              
              {/* Price Section */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-teal-500">
                  ${product.salePrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Stock Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Sold: {product.sold}</span>
                  <span>Available: {product.stock}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${stockPercentage(product.stock, product.totalStock)}%` }}
                  ></div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-gradient-to-r from-teal-400 to-teal-500 text-white py-2.5 rounded-xl font-semibold hover:from-teal-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
          View All Flash Deals
          <TrendingUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashSale;