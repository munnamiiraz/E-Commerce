"use client"
import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag,
  Truck,
  Shield,
  CreditCard,
  Wallet,
  MapPin,
  Check,
  X
} from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface CartPageProps {
  className?: string;
}

const CartPage: React.FC<CartPageProps> = ({ className = '' }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Ergonomic Mouse',
      category: 'Electronics',
      price: 99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Home Theater',
      category: 'Electronics',
      price: 149,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      category: 'Audio',
      price: 199,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      inStock: true
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const shippingCost = 5;
  const discount = appliedCoupon ? 20 : 0;

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'save20') {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost - discount;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Cart</h1>
          <div className="flex items-center space-x-2">
            <p className="text-gray-600">
              {cartItems.length} items in your cart
            </p>
            <span className="text-gray-400">•</span>
            <a href="/shop" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
              Add more <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Start adding some products to your cart!</p>
                <a href="/shop" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            ) : (
              <>
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-2xl shadow-sm text-sm font-semibold text-gray-600">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-1 text-center">Remove</div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Product Info */}
                        <div className="md:col-span-5 flex items-center space-x-4">
                          <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:ring-2 group-hover:ring-emerald-500 transition-all">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                            {item.inStock ? (
                              <div className="flex items-center space-x-1 mt-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-xs text-green-600 font-medium">In Stock</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 mt-2">
                                <X className="w-4 h-4 text-red-600" />
                                <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex justify-center">
                          <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="md:col-span-2 text-center">
                          <p className="text-lg font-bold text-gray-900">${item.price}</p>
                        </div>

                        {/* Total Price */}
                        <div className="md:col-span-2 text-center">
                          <p className="text-xl font-bold text-emerald-600">
                            ${item.price * item.quantity}
                          </p>
                        </div>

                        {/* Remove */}
                        <div className="md:col-span-1 flex justify-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all hover:scale-110"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 text-emerald-600 mr-2" />
                Payment Summary
              </h2>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'bg-emerald-500' : 'bg-gray-100'
                      }`}>
                        <Wallet className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className="font-semibold text-gray-900">Cash on Delivery</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'stripe'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        paymentMethod === 'stripe' ? 'bg-emerald-500' : 'bg-gray-100'
                      }`}>
                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'stripe' ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className="font-semibold text-gray-900">Stripe Payment</span>
                    </div>
                    {paymentMethod === 'stripe' && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Address</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    Change
                  </button>
                </div>
                <p className="text-sm text-gray-600 ml-7">
                  794 Francisco, 94102<br />
                  San Francisco, CA
                </p>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-500">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">{appliedCoupon}</span>
                    </div>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">Try: SAVE20</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Shipping:
                  </span>
                  <span className="font-semibold text-gray-900">${shippingCost}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Discount:</span>
                    <span className="font-semibold text-green-600">-${discount}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-emerald-600">${total}</span>
              </div>

              {/* Place Order Button */}
              <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mb-4">
                <span>Place Order</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Secured Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free shipping worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;