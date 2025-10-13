import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, XCircle, Truck, DollarSign, Calendar, User, MapPin, Phone, Mail } from 'lucide-react';

interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  orderDate: string;
  deliveryDate?: string;
}

const OrderSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sample orders data - replace with your backend data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2025-0001',
      customerName: 'Rakib Hasan',
      customerEmail: 'rakib@example.com',
      customerPhone: '+880 1712-345678',
      shippingAddress: 'House 45, Road 12, Zindabazar, Sylhet-3100, Bangladesh',
      items: [
        {
          productId: '1',
          productName: 'Premium Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          quantity: 1,
          price: 199
        }
      ],
      totalAmount: 199,
      status: 'pending',
      paymentStatus: 'paid',
      orderDate: '2025-10-14T10:30:00'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-0002',
      customerName: 'Fatima Ahmed',
      customerEmail: 'fatima@example.com',
      customerPhone: '+880 1823-456789',
      shippingAddress: 'Flat 3B, Green Valley Apartment, Dhanmondi, Dhaka-1205',
      items: [
        {
          productId: '2',
          productName: 'Smart Watch Pro Series',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
          quantity: 2,
          price: 349
        },
        {
          productId: '4',
          productName: 'Gaming Mouse RGB',
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
          quantity: 1,
          price: 59
        }
      ],
      totalAmount: 757,
      status: 'processing',
      paymentStatus: 'paid',
      orderDate: '2025-10-13T14:20:00'
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-0003',
      customerName: 'Imran Khan',
      customerEmail: 'imran@example.com',
      customerPhone: '+880 1934-567890',
      shippingAddress: 'Shop 23, Banani Commercial Area, Dhaka-1213',
      items: [
        {
          productId: '5',
          productName: 'Mechanical Keyboard',
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
          quantity: 1,
          price: 129
        }
      ],
      totalAmount: 129,
      status: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2025-10-12T09:15:00',
      deliveryDate: '2025-10-16T00:00:00'
    },
    {
      id: '4',
      orderNumber: 'ORD-2025-0004',
      customerName: 'Sadia Rahman',
      customerEmail: 'sadia@example.com',
      customerPhone: '+880 1645-678901',
      shippingAddress: 'House 78, Sector 7, Uttara, Dhaka-1230',
      items: [
        {
          productId: '6',
          productName: 'Cotton T-Shirt Pack',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
          quantity: 3,
          price: 45
        }
      ],
      totalAmount: 135,
      status: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2025-10-10T16:45:00',
      deliveryDate: '2025-10-13T11:30:00'
    },
    {
      id: '5',
      orderNumber: 'ORD-2025-0005',
      customerName: 'Mahbub Alam',
      customerEmail: 'mahbub@example.com',
      customerPhone: '+880 1756-789012',
      shippingAddress: 'Village: Gopalganj, Post: Madhabpur, Sylhet-3160',
      items: [
        {
          productId: '4',
          productName: 'Gaming Mouse RGB',
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
          quantity: 1,
          price: 59
        }
      ],
      totalAmount: 59,
      status: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2025-10-11T12:00:00'
    }
  ]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Package size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'unpaid':
        return 'text-red-600';
      case 'refunded':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;
  const shippedOrders = orders.filter(o => o.status === 'shipped').length;
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
          <p className="text-gray-600">Track and manage your customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Orders</span>
              <Package className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Pending</span>
              <Clock className="text-yellow-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{pendingOrders}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Processing</span>
              <Package className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{processingOrders}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Shipped</span>
              <Truck className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{shippedOrders}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Revenue</span>
              <DollarSign className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by order number or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(order.orderDate)}
                      </span>
                      <span className={`font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">৳{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <User size={14} />
                        {order.customerName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail size={14} />
                        {order.customerEmail}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} />
                        {order.customerPhone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Shipping Address</h4>
                    <p className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="mt-1 flex-shrink-0" />
                      <span>{order.shippingAddress}</span>
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => console.log('Process order:', order.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                      Process Order
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => console.log('Mark as shipped:', order.id)}
                      className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                      Mark as Shipped
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => console.log('Mark as delivered:', order.id)}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSection;