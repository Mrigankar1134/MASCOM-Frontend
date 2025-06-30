import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Package, CreditCard, Truck, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import OrderDetails from './OrderDetails';

const OrderList = () => {
  // Mock data for orders
  const [orders] = useState([
    {
      id: 'ORD-001',
      user: { name: 'Alice Johnson', email: 'alice.j@student.edu' },
      date: '2025-05-28',
      total: 89.99,
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      orderStatus: 'Delivered'
    },
    {
      id: 'ORD-002',
      user: { name: 'Bob Smith', email: 'bob.smith@student.edu' },
      date: '2025-05-30',
      total: 156.50,
      paymentStatus: 'Paid',
      deliveryStatus: 'Shipped',
      orderStatus: 'Shipped'
    },
    {
      id: 'ORD-003',
      user: { name: 'Carol Davis', email: 'c.davis@student.edu' },
      date: '2025-06-01',
      total: 45.25,
      paymentStatus: 'Unpaid',
      deliveryStatus: 'Pending',
      orderStatus: 'Pending'
    },
    {
      id: 'ORD-004',
      user: { name: 'David Wilson', email: 'david.w@student.edu' },
      date: '2025-05-29',
      total: 234.75,
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      orderStatus: 'Delivered'
    },
    {
      id: 'ORD-005',
      user: { name: 'Emma Brown', email: 'emma.brown@student.edu' },
      date: '2025-05-31',
      total: 67.80,
      paymentStatus: 'Paid',
      deliveryStatus: 'Shipped',
      orderStatus: 'Shipped'
    }
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    dateRange: '',
    orderStatus: '',
    paymentStatus: '',
    deliveryStatus: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders based on current filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOrderStatus = filters.orderStatus === '' || order.orderStatus === filters.orderStatus;
      const matchesPaymentStatus = filters.paymentStatus === '' || order.paymentStatus === filters.paymentStatus;
      const matchesDeliveryStatus = filters.deliveryStatus === '' || order.deliveryStatus === filters.deliveryStatus;

      const matchesDate = filters.dateRange === '' || (() => {
        const orderDate = new Date(order.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        switch (filters.dateRange) {
          case 'today':
            return orderDate.toDateString() === today.toDateString();
          case 'yesterday':
            return orderDate.toDateString() === yesterday.toDateString();
          case 'week':
            return orderDate >= weekAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesOrderStatus && matchesPaymentStatus && matchesDeliveryStatus && matchesDate;
    });
  }, [orders, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleOrderClick = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  const getStatusColor = (status, type) => {
    const colors = {
      payment: {
        'Paid': 'bg-green-100 text-green-800',
        'Unpaid': 'bg-red-100 text-red-800'
      },
      delivery: {
        'Delivered': 'bg-green-100 text-green-800',
        'Shipped': 'bg-blue-100 text-blue-800',
        'Pending': 'bg-yellow-100 text-yellow-800'
      },
      order: {
        'Delivered': 'bg-green-100 text-green-800',
        'Shipped': 'bg-blue-100 text-blue-800',
        'Pending': 'bg-yellow-100 text-yellow-800'
      }
    };
    return colors[type][status] || 'bg-gray-100 text-gray-800';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-black mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track all student orders</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-50 rounded-lg p-6 mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders by ID, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last Week</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-1" />
                Order Status
              </label>
              <select
                value={filters.orderStatus}
                onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">All Orders</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline w-4 h-4 mr-1" />
                Payment Status
              </label>
              <select
                value={filters.paymentStatus}
                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Truck className="inline w-4 h-4 mr-1" />
                Delivery Status
              </label>
              <select
                value={filters.deliveryStatus}
                onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">All Deliveries</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-black">{filteredOrders.length}</span> of{' '}
            <span className="font-semibold text-black">{orders.length}</span> orders
          </p>
        </motion.div>

        {selectedOrder ? (
          <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        ) : (
          <AnimatePresence mode="wait">
            {filteredOrders.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </motion.div>
            ) : (
              <motion.div
                key="orders"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Desktop Table Header */}
                <div className="hidden lg:grid lg:grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm">
                  <div>Order ID</div>
                  <div>Customer</div>
                  <div>Date</div>
                  <div>Total</div>
                  <div>Payment</div>
                  <div>Delivery</div>
                  <div></div>
                </div>

                {/* Orders */}
                {filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOrderClick(order.id)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                  >
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-black">{order.id}</h3>
                          <p className="text-gray-600 text-sm">{order.user.name}</p>
                          <p className="text-gray-500 text-xs">{order.user.email}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total</p>
                          <p className="font-bold text-black">${order.total}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus, 'payment')}`}>
                          {order.paymentStatus}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.deliveryStatus, 'delivery')}`}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-7 gap-4 items-center">
                      <div className="font-semibold text-black">{order.id}</div>
                      <div>
                        <p className="font-medium text-black">{order.user.name}</p>
                        <p className="text-gray-500 text-sm">{order.user.email}</p>
                      </div>
                      <div className="text-gray-700">{new Date(order.date).toLocaleDateString()}</div>
                      <div className="font-bold text-black">${order.total}</div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.paymentStatus, 'payment')}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.deliveryStatus, 'delivery')}`}>
                          {order.deliveryStatus}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default OrderList;