import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import CustomCursor from '../Cursor/CustomCursor';



const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
      color: { name: 'black', label: 'Midnight Black' },
      size: 'M',
      quantity: 2
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=150&h=150&fit=crop",
      color: { name: 'blue', label: 'Indigo Blue' },
      size: 'L',
      quantity: 1
    },
    {
      id: 3,
      name: "Comfortable Joggers",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1506629905607-5d82aa4d9e5d?w=150&h=150&fit=crop",
      color: { name: 'gray', label: 'Charcoal Gray' },
      size: 'M',
      quantity: 1
    }
  ]);

  const [removingItems, setRemovingItems] = useState(new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setRemovingItems(prev => new Set(prev).add(id));
    setTimeout(() => {
      setCartItems(items => items.filter(item => item.id !== id));
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      // Reset cart or redirect to checkout page
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-black mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <button className="group bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-semibold">Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
     <Navbar />
    <CustomCursor 
  size={32}
  color="rgba(51, 51, 51, 0.52)"
  borderColor="rgba(255,255,255,0.5)"
  blur={true}
  zIndex={9999}
/>
    <div className="bg-white min-h-screen">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 pt-34">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 ease-out ${
                  removingItems.has(item.id) 
                    ? 'opacity-0 scale-95 -translate-x-4 transform' 
                    : 'opacity-100 scale-100 translate-x-0 transform hover:shadow-md hover:border-gray-300'
                }`}
                style={{
                  animation: removingItems.has(item.id) ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.4s ease-out'
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>Color: {item.color.label}</span>
                      <span>Size: {item.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors duration-200 rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-0 focus:ring-0 py-1.5 text-sm"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-lg font-semibold text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8 animate-fade-in-up shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
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
                {shipping === 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    🎉 Free shipping on orders over $50!
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-black">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isCheckingOut
                    ? 'bg-green-600 scale-95'
                    : 'bg-black hover:bg-gray-800 hover:scale-105 active:scale-95'
                }`}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

              <div className="mt-4 text-center">
                <button className="group inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md border border-gray-200">
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="font-medium">Continue Shopping</span>
                </button>
              </div>

              {/* Security Icons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-3">
                  Secure checkout guaranteed
                </div>
                <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                  <span className="bg-gray-200 px-2 py-1 rounded">SSL</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">256-bit</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">Encrypted</span>
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

export default ShoppingCart;
