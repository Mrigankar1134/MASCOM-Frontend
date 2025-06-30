
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search, 
  Filter,
  Heart,
  Plus,
  Minus,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
  CreditCard,
  Download,
  Edit,
  Eye,
  ZoomIn,
  Check,
  AlertCircle
} from 'lucide-react';

// Mock Data
const products = [
  {
    id: 1,
    name: "IIM Amritsar Classic T-Shirt",
    category: "t-shirts",
    price: 899,
    originalPrice: 1199,
    colors: ["black", "white", "gray"],
    sizes: ["S", "M", "L", "XL"],
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    description: "Premium cotton t-shirt with IIM Amritsar logo",
    tags: ["new"],
    inStock: true,
    rating: 4.5,
    reviews: 23
  },
  {
    id: 2,
    name: "IIM Amritsar Hoodie",
    category: "hoodies",
    price: 1899,
    originalPrice: 2399,
    colors: ["black", "gray"],
    sizes: ["M", "L", "XL"],
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    description: "Warm and comfortable hoodie perfect for campus life",
    tags: [],
    inStock: true,
    rating: 4.8,
    reviews: 45
  },
  {
    id: 3,
    name: "IIM Amritsar Varsity Jacket",
    category: "jackets",
    price: 3499,
    originalPrice: 4199,
    colors: ["black", "white"],
    sizes: ["S", "M", "L"],
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    description: "Premium varsity jacket with embroidered logo",
    tags: ["bestseller"],
    inStock: false,
    rating: 4.9,
    reviews: 12
  },
  {
    id: 4,
    name: "IIM Amritsar Keychain",
    category: "accessories",
    price: 299,
    colors: ["black"],
    sizes: ["one-size"],
    images: ["/api/placeholder/400/400"],
    description: "Metal keychain with IIM Amritsar emblem",
    tags: ["new"],
    inStock: true,
    rating: 4.2,
    reviews: 8
  },
  {
    id: 5,
    name: "IIM Amritsar Coffee Mug",
    category: "accessories",
    price: 599,
    colors: ["white", "black"],
    sizes: ["one-size"],
    images: ["/api/placeholder/400/400"],
    description: "Ceramic mug perfect for your morning coffee",
    tags: [],
    inStock: true,
    rating: 4.6,
    reviews: 34
  },
  {
    id: 6,
    name: "IIM Amritsar Water Bottle",
    category: "accessories",
    price: 799,
    colors: ["black", "white"],
    sizes: ["500ml", "750ml"],
    images: ["/api/placeholder/400/400"],
    description: "Stainless steel water bottle with logo",
    tags: ["eco-friendly"],
    inStock: true,
    rating: 4.4,
    reviews: 19
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 't-shirts', name: 'T-Shirts' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'jackets', name: 'Varsity Jackets' },
  { id: 'accessories', name: 'Accessories' }
];

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      }`}
    >
      {type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
    </motion.div>
  );
};
