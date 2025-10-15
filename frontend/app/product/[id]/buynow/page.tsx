"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const CheckoutPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        // TODO: Replace with your actual backend API endpoints
        // const productResponse = await axios.get(`YOUR_API_ENDPOINT/cart`);
        // const addressResponse = await axios.get(`YOUR_API_ENDPOINT/addresses`);
        // setProducts(productResponse.data);
        // setAddresses(addressResponse.data);
        
        // Mock data for demonstration
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Apple Wireless Earbuds Pro',
            image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop',
            price: 89,
            quantity: 1,
            color: 'White',
            size: 'Standard'
          },
          {
            id: 2,
            name: 'Smart Watch Series 7',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop',
            price: 199,
            quantity: 1,
            color: 'Black',
            size: '42mm'
          }
        ];

        const mockAddresses: Address[] = [
          {
            id: 1,
            name: 'John Doe',
            phone: '+1 234 567 8900',
            address: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            isDefault: true
          },
          {
            id: 2,
            name: 'John Doe',
            phone: '+1 234 567 8900',
            address: '456 Office Building, Floor 5',
            city: 'Brooklyn',
            state: 'NY',
            zip: '11201',
            isDefault: false
          }
        ];
        
        setTimeout(() => {
          setProducts(mockProducts);
          setAddresses(mockAddresses);
          setSelectedAddress(mockAddresses.find(a => a.isDefault)?.id || null);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching checkout data:', error);
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [id]);

  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    // TODO: Validate coupon with backend
    // const response = await axios.post('YOUR_API_ENDPOINT/validate-coupon', { code: couponCode });
    
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon(couponCode);
      setDiscount(subtotal * 0.1);
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setAppliedCoupon(couponCode);
      setDiscount(subtotal * 0.2);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    // TODO: Proceed to payment gateway
    router.push(`/product/${id}/payment`);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity: newQuantity } : p
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-emerald-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray- transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button> */}
              <h1 className="text-2xl font-bold">
                <span className="text-gray-">CheckList</span>
                <span className="text-emerald-500">.</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-gray-800 font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold">Cart</span>
                </div>
                <div className="w-16 h-0.5 bg-emerald-500"></div>
                <div className="flex items-center gap-2 text-emerald-500">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-gray-800 font-semibold">2</div>
                  <span className="font-semibold">Checkout</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 font-semibold">3</div>
                  <span className="font-semibold">Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-">Checkout</h2>
          <p className="text-gray-600 mt-2">Complete your order by filling the details below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray- flex items-center gap-2">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </h3>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-gray- hover:text-emerald-600 font-semibold text-sm flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedAddress === address.id
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                        : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-gray-">{address.name}</p>
                          {address.isDefault && (
                            <span className="bg-emerald-500 text-gray-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{address.phone}</p>
                        <p className="text-gray-700 text-sm">{address.address}</p>
                        <p className="text-gray-700 text-sm">{address.city}, {address.state} {address.zip}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAddress === address.id
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAddress === address.id && (
                          <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray- mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Items ({products.length})
              </h3>

              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray- mb-1">{product.name}</h4>
                      <div className="flex gap-3 text-sm text-gray-600 mb-2">
                        {product.color && <span>Color: <span className="font-medium">{product.color}</span></span>}
                        {product.size && <span>Size: <span className="font-medium">{product.size}</span></span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 hover:border-emerald-500 hover:text-emerald-500 flex items-center justify-center transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="font-semibold text-gray- w-8 text-center">{product.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 hover:border-emerald-500 hover:text-emerald-500 flex items-center justify-center transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xl font-bold text-emerald-600">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-white rounded-2xl shadow-2xl p-6 text-gray- sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              {/* Coupon Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <label className="block text-sm font-semibold mb-2">Have a Coupon?</label>
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-150 backdrop-blur-sm border-2 border-emerald-500/30 placeholder-gray-600 focus:outline-none focus:border-white transition"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 py-2 text-white bg-emerald-500 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      <span className="font-semibold">{appliedCoupon}</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-gray-800/80 hover:text-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-800">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gray-800">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                      </svg>
                      Discount
                    </span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-white/30 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className='text-emerald-500'>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-center text-gray-800/70 text-sm mt-4">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;