import products from '../../data/products.json';
import { getItemStatusConfig } from '../../configs/statusConfigs';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X, Package, Truck, Clock, AlertCircle, ShoppingBag, Star, ArrowLeft } from 'lucide-react';

const BASE_ANIMATION_DELAY = 0.3;
const MAX_THUMBNAIL_COUNT = 3;
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value);

const OrderDetailsUser = ({ order, onBack }) => {
  // Memoize order items to avoid recalculation on every render
  const orderItemsList = useMemo(() => {
    if (!order || !order.items) return [];
    
    return order.items.map((item, index) => {
      const product = products.find(p => p.productId === item.productId) || {};
      const variant = product.variants?.find(v => v.color === item.variant?.color) || {};
      return {
        id: `${order.orderId}-${item.productId}-${index}`,
        ...item,
        itemStatus: item.itemStatus || 'default',
        name: product.name,
        imageUrls: variant.imageUrls || [],
        productCategory: product.category,
        subCategory: product.subCategory,
        allowCustomName: product.allowCustomName,
        variants: item.variant || {},
        hasVariants: Boolean(item.variant),
        product: product // Include full product data for easier access
      };
    });
  }, [order]);

  const [orderItems, setOrderItems] = useState(orderItemsList);
  const [editingItem, setEditingItem] = useState(null);
  const [editValues, setEditValues] = useState({});


  const startEdit = (item) => {
    setEditingItem(item.id);
    setEditValues({
      size: item.variants?.size || '',
      color: item.variants?.color || '',
      customName: item.variants?.customName || ''
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValues({});
  };

  const saveEdit = (itemId) => {
    setOrderItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          variants: {
            ...item.variants,
            ...editValues
          }
        };
      }
      return item;
    }));
    setEditingItem(null);
    setEditValues({});
  };

  const handleBackClick = () => {
    if (typeof onBack === 'function') {
      onBack();
    }
  };

  // Show error state if no order is provided
  if (!order) {
    return (
      <div className="min-h-screen bg-white p-6">
        <motion.button
          onClick={handleBackClick}
          className="absolute top-6 left-6 z-50 group bg-white border-2 border-gray-200 hover:border-black text-black rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          title="Back to Orders"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
        </motion.button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-2">Order Details</h1>
          <p className="text-gray-800 mb-8">Order not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-black font-semibold hover:underline transition-all duration-300"
            title="Back to Orders"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-xl">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-black mb-3">
            Order Details
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Order #{order.orderId || order.id}
          </p>
          <div className="h-1 bg-gray-200 mx-auto mt-4 rounded-full" style={{ width: "100px" }} />
        </motion.div>

        {/* Items Grid */}
        <div className="space-y-8">
          {orderItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + BASE_ANIMATION_DELAY }}
            >
              <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                {/* Product Image */}
                <div className="flex-shrink-0 relative">
                  <img
                    src={item.imageUrls[0] || item.product.imageUrls?.[0]}
                    alt={item.name || item.product.name}
                    className="relative w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-2xl"
                    onError={e => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
                  />
                  {/* Star badge, keep as static */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-grow space-y-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-black">
                        {item.name || item.product.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold text-black">
                          {formatCurrency(item.price || item.product.price)}
                        </p>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge with animation only for icon if necessary */}
                    {(() => {
                      const statusConfig = getItemStatusConfig(item.itemStatus);
                      return (
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium ${statusConfig.color}`}
                        >
                          <motion.div
                            animate={item.itemStatus === 'Verification Pending' ? { rotate: 360 } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            {React.createElement(statusConfig.icon, { className: 'w-4 h-4' })}
                          </motion.div>
                          {statusConfig.label}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Variants Display */}
                  {item.hasVariants && item.variants && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Specifications</h4>
                      <div className="flex flex-wrap gap-3">
                        {item.variants.size && (
                          <span className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm">
                            <strong>Size:</strong> {item.variants.size}
                          </span>
                        )}
                        {item.variants.color && (
                          <span className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm">
                            <strong>Color:</strong> {item.variants.color}
                          </span>
                        )}
                        {item.variants.customName && (
                          <span className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm">
                            <strong>Custom:</strong> {item.variants.customName}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Edit Button: enabled only for Verification Pending or Confirmed */}
                  {(item.itemStatus === 'Verification Pending' || item.itemStatus === 'Confirmed') &&
                    item.hasVariants &&
                    editingItem !== item.id && (
                      <button
                        onClick={() => startEdit(item)}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl font-semibold shadow hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-200"
                      >
                        <Edit3 className="w-5 h-5" />
                        Customize Order
                      </button>
                    )}
                  {/* Disabled Edit Button for other statuses */}
                  {!(item.itemStatus === 'Verification Pending' || item.itemStatus === 'Confirmed') &&
                    item.hasVariants && (
                      <button
                        disabled
                        title="You can only customize while status is Verification Pending or Confirmed"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gray-200 text-gray-500 rounded-2xl font-semibold shadow cursor-not-allowed"
                      >
                        <Edit3 className="w-5 h-5" />
                        Customize Order
                      </button>
                    )}

                  {/* Edit Mode */}
                  <AnimatePresence>
                    {editingItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative"
                      >
                        <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
                          <h4 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-black" />
                            Customize Your Order
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Size Selection */}
                            {item.product.availableSizes && item.product.availableSizes.length > 0 && (
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Size</label>
                                <select
                                  value={editValues.size}
                                  onChange={(e) => setEditValues(prev => ({ ...prev, size: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black bg-white font-medium"
                                >
                                  <option value="" disabled>Select Size</option>
                                  {item.product.availableSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {/* Color Selection */}
                            {item.product.variants && item.product.variants.length > 0 && (
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Color</label>
                                <select
                                  value={editValues.color}
                                  onChange={(e) => setEditValues(prev => ({ ...prev, color: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black bg-white font-medium"
                                >
                                  <option value="" disabled>Select Color</option>
                                  {item.product.variants.map(v => (
                                    <option key={v.color} value={v.color}>{v.color}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {/* Custom Name Input */}
                            {item.product.allowCustomName && (
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Custom Name</label>
                                <input
                                  type="text"
                                  value={editValues.customName}
                                  onChange={(e) => setEditValues(prev => ({ ...prev, customName: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black bg-white font-medium"
                                  placeholder="Enter custom name"
                                />
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4">
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold shadow hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-200"
                            >
                              <Check className="w-5 h-5" />
                              Save Changes
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black border-2 border-gray-200 rounded-xl font-semibold hover:bg-black hover:text-white hover:border-black transition-colors duration-200"
                            >
                              <X className="w-5 h-5" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div 
          className="mt-12 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black">Order Summary</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-lg text-gray-700">Total Items:</span>
                  <span className="text-xl font-bold text-black">
                    {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-lg text-gray-700">Subtotal:</span>
                  <span className="text-xl font-bold text-black">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-lg text-gray-700">
                      Discount <span className="text-sm text-green-600 font-medium">({order.couponCode})</span>:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      - {formatCurrency(order.discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3">
                  <span className="text-xl font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-3xl font-bold text-black">
                    {formatCurrency(order.finalAmountPaid)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-xl">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailsUser;