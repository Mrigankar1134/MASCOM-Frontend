import { Home, User, Package, Bell, LogOut, Users, ShoppingCart, CreditCard, Archive, FileText, ArrowLeft } from 'lucide-react';

export const getMainMenuItems = (user) => [
  { id: 'home', label: 'Back Home', icon: Home, color: 'from-blue-500 to-indigo-600' },
  { id: 'profile', label: 'Profile', icon: User, color: 'from-purple-500 to-indigo-600' },
  { id: 'orders', label: 'Orders', icon: Package, color: 'from-emerald-500 to-teal-600' },
  ...(user?.isAdmin ? [{
    id: 'admin',
    label: 'Admin Dashboard',
    icon: Bell,
    color: 'from-yellow-500 to-orange-600'
  }] : user?.isModerator ? [{
    id: 'admin',
    label: 'Moderator Dashboard',
    icon: Bell,
    color: 'from-yellow-500 to-orange-600'
  }] : []),
  { id: 'logout', label: 'Logout', icon: LogOut, color: 'from-gray-500 to-gray-700' }
];

export const adminMenuItems = [
  { id: 'user-management', label: 'User Management', icon: Users, color: 'from-blue-500 to-indigo-600' },
  { id: 'order-management', label: 'Order Management', icon: ShoppingCart, color: 'from-emerald-500 to-teal-600' },
  { id: 'payment-verification', label: 'Payment Verification', icon: CreditCard, color: 'from-purple-500 to-indigo-600' },
  { id: 'inventory-management', label: 'Inventory Management', icon: Archive, color: 'from-yellow-500 to-orange-600' },
  { id: 'admin-logs', label: 'Admin Logs', icon: FileText, color: 'from-red-500 to-pink-600' },
  { id: 'back', label: 'Back', icon: ArrowLeft, color: 'from-gray-500 to-gray-700' }
];