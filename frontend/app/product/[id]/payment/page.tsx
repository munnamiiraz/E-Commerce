"use client"
import React, { useEffect, useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Package, CheckCircle, Lock } from 'lucide-react';
import axios from "axios"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface OrderData {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
  };
}

const PaymentPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()

  // Mock order data - in real app, this would come from props or context
  const orderData: OrderData = {
    subtotal: 288.00,
    shipping: 0,
    tax: 23.04,
    total: 311.04,
    items: [
      {
        id: '1',
        name: 'Apple Wireless Earbuds Pro',
        price: 99.00,
        quantity: 2
      }
    ],
    deliveryAddress: {
      name: 'John Doe',
      phone: '+1 234 567 8900',
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY',
      zip: '10001'
    }
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
    },
    {
      id: 'bkash',
      name: 'bKash',
      icon: Smartphone,
      description: 'Pay with bKash mobile wallet',
      color: 'bg-pink-50 border-pink-200 hover:border-pink-400'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: Smartphone,
      description: 'Pay with Nagad mobile wallet',
      color: 'bg-orange-50 border-orange-200 hover:border-orange-400'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: DollarSign,
      description: 'Pay when you receive',
      color: 'bg-green-50 border-green-200 hover:border-green-400'
    }
  ];

  const handleConfirmOrder = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    setIsProcessing(true);

    try {
      // Prepare order data for backend
      const orderPayload = {
        paymentMethod: selectedPayment,
        orderDetails: {
          items: orderData.items,
          subtotal: orderData.subtotal,
          shipping: orderData.shipping,
          tax: orderData.tax,
          total: orderData.total
        },
        deliveryAddress: orderData.deliveryAddress,
        timestamp: new Date().toISOString()
      };
      console.log(orderPayload);
      

      // Send to backend using fetch API
      // Replace '/api/orders/confirm' with your actual backend endpoint

      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/place-order', orderPayload, {headers: {token}})
      console.log(response);
      

      
      // Show success state
      setOrderConfirmed(true);
      
      // In real app, redirect to success page after delay
      setTimeout(() => {
        // window.location.href = `/order-success/${orderData.orderId}`;
        console.log('Redirect to success page');
      }, 2000);

    } catch (error) {
      console.error('Order confirmation failed:', error);
      alert('Failed to confirm order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getToken = async () => {
    try {
      const token: string | null = await localStorage.getItem("token")
      setToken(token)
      // console.log(token);
      
    } catch{
      toast.error("login to continue")
      router.push("/")
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          {/* <p className="text-gray-600 mb-4">Your order #{orderData.orderId} has been placed successfully.</p> */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-semibold text-gray-800">{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment</h2>
              <p className="text-gray-600 mb-6">Select your preferred payment method</p>

              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`${method.color} border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'ring-2 ring-green-500 border-green-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedPayment === method.id ? 'bg-green-500' : 'bg-white'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              selectedPayment === method.id ? 'text-white' : 'text-gray-700'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Address Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-800">Delivery Address</h3>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-gray-800">{orderData.deliveryAddress.name}</p>
                <p className="text-sm text-gray-600">{orderData.deliveryAddress.phone}</p>
                <p className="text-sm text-gray-600">{orderData.deliveryAddress.address}</p>
                <p className="text-sm text-gray-600">{orderData.deliveryAddress.city} {orderData.deliveryAddress.zip}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">
                    {orderData.shipping === 0 ? 'FREE' : `$${orderData.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-600">${orderData.total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleConfirmOrder}
                disabled={!selectedPayment || isProcessing}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                  !selectedPayment || isProcessing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Order'
                )}
              </button>

              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-1" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;