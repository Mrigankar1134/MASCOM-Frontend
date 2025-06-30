import { CheckCircle, AlertCircle, Clock, Truck, Package, CreditCard, XCircle, Wrench, ClipboardList } from 'lucide-react';

export const ORDER_STATUS_CONFIG = {
  delivered: {
    icon: CheckCircle,
    color: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25',
    label: 'Delivered'
  },
  'verification pending': {
    icon: AlertCircle,
    color: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25',
    label: 'Verification Pending'
  },
  confirmed: {
    icon: Package,
    color: 'bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-lg shadow-indigo-500/25',
    label: 'Confirmed'
  },
  'partially fulfilled': {
    icon: Clock,
    color: 'bg-gradient-to-r from-orange-400 to-amber-600 text-white shadow-lg shadow-orange-400/25',
    label: 'Partially Fulfilled'
  },
  failed: {
    icon: XCircle,
    color: 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25',
    label: 'Failed'
  },
  processing: {
    icon: Truck,
    color: 'bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-lg shadow-blue-500/25',
    label: 'Processing'
  },
  default: {
    icon: Package,
    color: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25',
    label: 'Status Unknown'
  }
};

export const PAYMENT_STATUS_CONFIG = {
  paid: {
    icon: CreditCard,
    color: 'text-green-600',
    label: 'Paid'
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    label: 'Pending'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600',
    label: 'Failed'
  },
  default: {
    icon: Package,
    color: 'text-gray-400',
    label: 'Unknown'
  }
};

export const getOrderStatusConfig = (status) =>
  ORDER_STATUS_CONFIG[status?.toLowerCase()] || ORDER_STATUS_CONFIG.default;

// Item status configuration without "partially fulfilled"
export const ITEM_STATUS_CONFIG = {
  delivered: {
    icon: CheckCircle,
    color: 'bg-green-200 text-green-800',
    label: 'Delivered'
  },
  'verification pending': {
    icon: AlertCircle,
    color: 'bg-yellow-100 text-yellow-800',
    label: 'Verification Pending'
  },
  confirmed: {
    icon: ClipboardList,
    color: 'bg-indigo-100 text-indigo-800',
    label: 'Confirmed'
  },
  failed: {
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    label: 'Failed'
  },
  processing: {
    icon: Wrench,
    color: 'bg-blue-100 text-blue-800',
    label: 'Processing'
  },
  default: {
    icon: Package,
    color: 'bg-gray-200 text-gray-800',
    label: 'Status Unknown'
  }
};

export const getItemStatusConfig = (status) =>
  ITEM_STATUS_CONFIG[status?.toLowerCase()] || ITEM_STATUS_CONFIG.default;

export const getPaymentStatusConfig = (status) =>
  PAYMENT_STATUS_CONFIG[status?.toLowerCase()] || PAYMENT_STATUS_CONFIG.default;