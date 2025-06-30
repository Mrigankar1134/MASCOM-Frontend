import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Clock, Truck, AlertCircle, CreditCard, Package, Calendar } from 'lucide-react';
import orders from '../../data/orders.json';
import products from '../../data/products.json';
import { formatCurrency } from '../../utils/formatCurrency';
import { getOrderStatusConfig, getPaymentStatusConfig } from '../../configs/statusConfigs';

const OrderListUser = ({ onSelectOrder }) => {
  // Track which item is being edited: { [orderId_itemIdx]: true }
  const [editingItems, setEditingItems] = useState({});
  // Track edit form values: { [orderId_itemIdx]: { size, color, customName } }
  const [editValues, setEditValues] = useState({});
  const MAX_THUMBNAIL_COUNT = 3;

  const enrichedOrders = orders.map(order => {
    
    const items = (order.items || []).map((item, index) => {
      
      const product = products.find(p => p.productId === item.productId);
      
      if (!product) {
        return {
          ...item,
          name: `Product ${item.productId}`,
          imageUrls: ["https://via.placeholder.com/100?text=No+Product"],
          productCategory: 'unknown',
          subCategory: 'unknown',
          allowCustomName: false
        };
      }

      // Find matching variant based on color
      let variant = null;
      if (item.variant?.color && product.variants) {
        variant = product.variants.find(
          v => v.color?.toLowerCase() === item.variant.color.toLowerCase()
        );
      }

      // Determine which images to use
      let imageUrls = [];
      if (variant?.imageUrls?.length > 0) {
        imageUrls = variant.imageUrls;
      } else if (product.imageUrls?.length > 0) {
        imageUrls = product.imageUrls;
      } else {
        imageUrls = ["https://via.placeholder.com/100?text=No+Image"];
      }

      const enrichedItem = {
        ...item,
        name: product.name,
        imageUrls: imageUrls,
        productCategory: product.category,
        subCategory: product.subCategory,
        allowCustomName: product.allowCustomName || false
      };
      
      return enrichedItem;
    });

    const enrichedOrder = {
      ...order,
      id: order.orderId || order.id, // Ensure we have an id field
      date: order.orderDate,
      items
    };
    
    return enrichedOrder;
  });

  const ordersToDisplay = enrichedOrders;
  const sortedOrders = [...ordersToDisplay].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getItemsSummary = (items) => {
    if (!items || items.length === 0) return "0 items";
    
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const itemNames = items.slice(0, 2).map(item => item.name || `Product ${item.productId}`).join(', ');
    return `${totalItems} item${totalItems > 1 ? 's' : ''} – ${itemNames}${items.length > 2 ? '...' : ''}`;
  };

  // Add error handling for image loading
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/100?text=Error";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold text-black mb-6">Order History</h2>
      <div className="space-y-4">
        {sortedOrders.map((order) => {
          const statusConfig = getOrderStatusConfig(order.status);
          const paymentConfig = getPaymentStatusConfig(order.paymentStatus);
          const StatusIcon = statusConfig.icon;
          const PaymentIcon = paymentConfig.icon;
          
          return (
            <motion.div
              key={order.id}
              layout
              className="border border-black rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                className="p-6 cursor-pointer w-full text-left bg-transparent border-none outline-none"
                style={{ appearance: 'none' }}
                onClick={() => {
                  if (onSelectOrder) {
                    onSelectOrder({
                      ...order,
                      items: order.items.map((item, index) => ({
                        ...item,
                        index,
                        imageUrl: item.imageUrls?.[0] || "https://via.placeholder.com/100?text=No+Image",
                        name: item.name || `Product ${item.productId}`
                      }))
                    });
                  }
                }}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-black">{order.id}</h3>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                        <StatusIcon size={14} />
                        {statusConfig.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-black">
                        <Calendar size={16} />
                        <span className="text-sm">{formatDate(order.date)}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                          Payment Status
                        </span>
                        <div className="flex items-center gap-2">
                          <PaymentIcon size={16} className={paymentConfig.color} />
                          <span className={`text-sm font-medium ${paymentConfig.color}`}>
                            {paymentConfig.label}
                          </span>
                        </div>
                      </div>
                      <div className="text-right md:text-left">
                        <span className="text-lg font-bold text-black">
                          {formatCurrency(order.finalAmountPaid || order.totalAmount || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {(order.items || []).slice(0, MAX_THUMBNAIL_COUNT).map((item, index) => {
                            const imageUrl = item.imageUrls?.[0] || "https://via.placeholder.com/100?text=No+Image";
                            const itemName = item.name || `Product ${item.productId}`;
                            
                            return (
                              <div
                                key={`${order.id}-${item.productId}-${index}`}
                                className="w-12 h-12 rounded-lg border-2 border-white overflow-hidden bg-gray-100"
                                title={itemName}
                              >
                                <img
                                  src={imageUrl}
                                  alt={itemName}
                                  className="w-full h-full object-cover"
                                  onError={handleImageError}
                                />
                              </div>
                            );
                          })}
                          {(order.items || []).length > MAX_THUMBNAIL_COUNT && (
                            <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-medium text-black">
                                +{order.items.length - MAX_THUMBNAIL_COUNT}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-black">
                          {getItemsSummary(order.items)}
                        </p>
                      </div>
                      <ChevronDown size={20} className="text-black" />
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
      {sortedOrders.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-black mb-4" />
          <h3 className="text-lg font-medium text-black mb-2">No orders yet</h3>
          <p className="text-black">When you place orders, they'll appear here.</p>
        </div>
      )}
    </div>
  );
};

export default OrderListUser;