import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Package, 
  User, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Truck, 
  Edit3, 
  Trash2, 
  Flag, 
  Shield, 
  AlertTriangle,
  Clock,
  Check,
  X,
  Eye
} from 'lucide-react';

const OrderDetails = ({ orderId, onBack }) => {
  // Mock order data - in real app, this would come from API
  const [orderData, setOrderData] = useState({
    id: 'ORD-002',
    user: {
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      phone: '+1 (555) 123-4567'
    },
    date: '2025-05-30',
    paymentMode: 'Credit Card (**** 4532)',
    total: 156.50,
    address: {
      street: '123 Campus Drive, Apt 4B',
      city: 'College Town',
      state: 'CA',
      zip: '90210',
      country: 'USA'
    },
    trackingNumber: 'TRK-2025-ABC123',
    orderStatus: 'Shipped',
    flags: {
      flagged: false,
      fraudulent: false,
      highPriority: true
    },
    items: [
      {
        id: 'item-1',
        image: 'https://via.placeholder.com/80x80?text=Book',
        name: 'Advanced React Development',
        variant: 'Paperback Edition',
        quantity: 1,
        price: 49.99,
        status: 'Shipped'
      },
      {
        id: 'item-2',
        image: 'https://via.placeholder.com/80x80?text=Mug',
        name: 'University Coffee Mug',
        variant: 'Blue - Large',
        quantity: 2,
        price: 15.99,
        status: 'Shipped'
      },
      {
        id: 'item-3',
        image: 'https://via.placeholder.com/80x80?text=Shirt',
        name: 'Campus T-Shirt',
        variant: 'Black - Medium',
        quantity: 1,
        price: 24.99,
        status: 'Pending'
      }
    ],
    activityLog: [
      { date: '2025-05-30 14:30', action: 'Order placed', user: 'System' },
      { date: '2025-05-30 15:15', action: 'Payment confirmed', user: 'Payment Gateway' },
      { date: '2025-05-31 09:00', action: 'Order marked as high priority', user: 'Admin John' },
      { date: '2025-05-31 10:30', action: '2 items shipped', user: 'Warehouse Team' },
      { date: '2025-06-01 08:00', action: 'Tracking number generated', user: 'System' }
    ]
  });

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelType, setCancelType] = useState(''); // 'item' or 'order'
  const [cancelItemId, setCancelItemId] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [editingStatus, setEditingStatus] = useState('');

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusUpdate = (itemId, newStatus) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    }));
    
    // Add to activity log
    const newActivity = {
      date: new Date().toLocaleString(),
      action: `Item status updated to ${newStatus}`,
      user: 'Current Admin'
    };
    
    setOrderData(prev => ({
      ...prev,
      activityLog: [newActivity, ...prev.activityLog]
    }));
  };

  const handleOrderStatusUpdate = (newStatus) => {
    setOrderData(prev => ({ ...prev, orderStatus: newStatus }));
    
    const newActivity = {
      date: new Date().toLocaleString(),
      action: `Order status updated to ${newStatus}`,
      user: 'Current Admin'
    };
    
    setOrderData(prev => ({
      ...prev,
      activityLog: [newActivity, ...prev.activityLog]
    }));
  };

  const handleFlagToggle = (flagType) => {
    setOrderData(prev => ({
      ...prev,
      flags: {
        ...prev.flags,
        [flagType]: !prev.flags[flagType]
      }
    }));
  };

  const handleCancelConfirm = () => {
    if (otpValue === '123456') { // Mock OTP validation
      if (cancelType === 'order') {
        setOrderData(prev => ({ ...prev, orderStatus: 'Cancelled' }));
      } else if (cancelType === 'item') {
        setOrderData(prev => ({
          ...prev,
          items: prev.items.map(item => 
            item.id === cancelItemId ? { ...item, status: 'Cancelled' } : item
          )
        }));
      }
      setShowCancelModal(false);
      setOtpValue('');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const cardVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-black">Order {orderData.id}</h1>
              <p className="text-gray-600">Manage order details and status</p>
            </div>
          </div>
          
          {/* Order Status Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(orderData.orderStatus)}`}
          >
            {orderData.orderStatus}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Order Summary - Left Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Customer Info */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-black" />
                <h3 className="text-lg font-semibold text-black">Customer Information</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-black">{orderData.user.name}</p>
                <p className="text-gray-600">{orderData.user.email}</p>
                <p className="text-gray-600">{orderData.user.phone}</p>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Package className="w-5 h-5 text-black" />
                <h3 className="text-lg font-semibold text-black">Order Details</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(orderData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">{orderData.paymentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-black text-lg">${orderData.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking:</span>
                  <span className="font-medium text-blue-600">{orderData.trackingNumber}</span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-black" />
                <h3 className="text-lg font-semibold text-black">Delivery Address</h3>
              </div>
              <div className="text-gray-700">
                <p>{orderData.address.street}</p>
                <p>{orderData.address.city}, {orderData.address.state} {orderData.address.zip}</p>
                <p>{orderData.address.country}</p>
              </div>
            </motion.div>

            {/* Order Flags */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-black mb-4">Order Flags</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFlagToggle('flagged')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                    orderData.flags.flagged 
                      ? 'bg-red-50 border-red-200 text-red-800' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Flag className="w-4 h-4" />
                    <span>Flagged</span>
                  </div>
                  {orderData.flags.flagged && <Check className="w-4 h-4" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFlagToggle('fraudulent')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                    orderData.flags.fraudulent 
                      ? 'bg-red-50 border-red-200 text-red-800' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Fraudulent</span>
                  </div>
                  {orderData.flags.fraudulent && <Check className="w-4 h-4" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFlagToggle('highPriority')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                    orderData.flags.highPriority 
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-800' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>High Priority</span>
                  </div>
                  {orderData.flags.highPriority && <Check className="w-4 h-4" />}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Items and Actions - Right Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Order Actions */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.select
                  whileHover={{ scale: 1.02 }}
                  value={orderData.orderStatus}
                  onChange={(e) => handleOrderStatusUpdate(e.target.value)}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </motion.select>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Order</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#fef2f2' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCancelType('order');
                    setShowCancelModal(true);
                  }}
                  className="flex items-center justify-center space-x-2 p-3 border border-red-200 text-red-600 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel Order</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Items List */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-black">Order Items</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orderData.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      {/* Item Image */}
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg border border-gray-200 object-cover"
                      />
                      
                      {/* Item Details */}
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-black">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.variant}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="text-gray-600">${item.price} each</span>
                          <span className="font-semibold text-black">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Item Status and Actions */}
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <motion.select
                          whileHover={{ scale: 1.02 }}
                          value={item.status}
                          onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium ${getStatusColor(item.status)}`}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </motion.select>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setCancelType('item');
                            setCancelItemId(item.id);
                            setShowCancelModal(true);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Activity Log */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-semibold text-black">Activity Log</h3>
                </div>
              </div>
              
              <div className="p-6 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {orderData.activityLog.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-gray-700">{activity.action}</p>
                        <p className="text-gray-500 text-xs">{activity.date} • {activity.user}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-black mb-4">
                Confirm {cancelType === 'order' ? 'Order' : 'Item'} Cancellation
              </h3>
              
              <p className="text-gray-600 mb-4">
                Enter OTP to confirm cancellation. This action cannot be undone.
              </p>
              
              <input
                type="text"
                placeholder="Enter OTP (123456)"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelConfirm}
                  className="flex-1 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderDetails;