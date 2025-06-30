// src/pages/CheckoutPage.jsx

import React, { useState, useEffect } from 'react';
import { 
  Smartphone,
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock,
  UploadCloud 
} from 'lucide-react';
import { motion } from 'framer-motion';
import CustomCursor from '../Cursor/CustomCursor';

const CheckoutPage = () => {
  // UPI Recipient dropdown
  const [upiRecipient, setUpiRecipient] = useState('rohan@upi');

  // Uploaded screenshot file
  const [screenshotFile, setScreenshotFile] = useState(null);

  // Transaction ID entered by user
  const [transactionId, setTransactionId] = useState('');

  // "Paid To" dropdown (same list as recipients, for consistency)
  const [paidTo, setPaidTo] = useState('rohan');

  // Payment/process states
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Animation stage for entry animations
  const [animationStage, setAnimationStage] = useState(0);

  // Sample order items (hard-coded for demo)
  const orderItems = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 49.99,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop',
      color: 'Midnight Black',
      size: 'M',
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: 89.99,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=80&h=80&fit=crop',
      color: 'Indigo Blue',
      size: 'L',
    },
  ];

  // Calculate subtotal, tax, shipping, and total
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));

  // Trigger entry animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStage(1), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle form submission (simulate a payment flow)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Add actual validation here (e.g., ensure screenshotFile and transactionId are non-empty)
    if (!screenshotFile || !transactionId.trim()) {
      alert('Please upload a screenshot and enter your Transaction ID.');
      return;
    }

    setIsProcessing(true);

    // Simulate a 2.5-second “payment processing” delay
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 2500);
  };

  // If order is placed, show confirmation screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your order will be processed shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold text-black">
              #ORD-{Date.now().toString().slice(-6)}
            </p>
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Custom animated cursor */}
      <CustomCursor
        size={32}
        color="rgba(51, 51, 51, 0.52)"
        borderColor="rgba(255, 255, 255, 0.5)"
        blur={true}
        zIndex={9999}
      />

      {/* Main checkout container */}
      <div className="min-h-screen bg-white">
        {/* Keyframe animations for tailwind's `animate-...` classes */}
        <style jsx>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }

          .animate-delay-200 {
            animation-delay: 0.2s;
            animation-fill-mode: both;
          }

          .animate-delay-400 {
            animation-delay: 0.4s;
            animation-fill-mode: both;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-black">Checkout</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: UPI Payment Form */}
            <div
              className={`space-y-8 ${
                animationStage >= 1 ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-6">
                  Pay via UPI
                </h2>

                {/* 1. UPI Recipient Dropdown */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-black mb-2">
                    Select Recipient
                  </label>
                  <select
                    value={upiRecipient}
                    onChange={(e) => setUpiRecipient(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="rohan@upi">Rohan</option>
                    <option value="ayush@upi">Ayush</option>
                    <option value="sanjeet@upi">Sanjeet</option>
                  </select>
                </div>

                {/* 2. QR Code Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-8 text-center"
                >
                  <img
                    src={`/qr/${upiRecipient}.png`} // e.g., public/qr/rohan@upi.png
                    alt="UPI QR Code"
                    className="mx-auto w-40 h-40 object-contain border-2 border-gray-200 p-2 rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Scan this QR code to pay
                  </p>
                </motion.div>

                {/* 3. Upload Payment Screenshot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-black mb-2">
                    Upload Payment Screenshot
                  </label>
                  <div
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition-all duration-300"
                    onClick={() =>
                      document.getElementById('screenshotInput').click()
                    }
                  >
                    <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      {screenshotFile
                        ? screenshotFile.name
                        : 'Click to upload a screenshot (PNG, JPG)'}
                    </p>
                    <input
                      id="screenshotInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setScreenshotFile(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                </motion.div>

                {/* 4. Transaction ID */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-black mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., TXN12345678"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </motion.div>

                {/* 5. Paid To Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-black mb-2">
                    Paid To
                  </label>
                  <select
                    value={paidTo}
                    onChange={(e) => setPaidTo(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="rohan">Rohan</option>
                    <option value="ayush">Ayush</option>
                    <option value="sanjeet">Sanjeet</option>
                  </select>
                </motion.div>

                {/* 6. “Place Order” Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8"
                >
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                      isProcessing
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-800 transform hover:scale-105 active:scale-95'
                    } shadow-lg hover:shadow-xl`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Place Order • ${total.toFixed(2)}</span>
                      </div>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div
              className={`${
                animationStage >= 1
                  ? 'animate-slide-in-right animate-delay-200'
                  : 'opacity-0'
              }`}
            >
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8 border border-gray-200 shadow-lg">
                <h2 className="text-xl font-semibold text-black mb-6">
                  Order Summary
                </h2>

                {/* Order Items List */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-black">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.color} • {item.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown Section */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-black border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security & Assurance Info */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                    <Shield className="w-4 h-4" />
                    <span>Your payment information is secure</span>
                  </div>
                  <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      SSL Encrypted
                    </span>
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      256-bit Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;