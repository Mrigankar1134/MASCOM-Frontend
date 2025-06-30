import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import CustomCursor from '../Cursor/CustomCursor';

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 124,
    description: "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this shirt offers a perfect blend of style and sustainability.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4152?w=500&h=600&fit=crop"
    ],
    colors: [
      { name: 'black', hex: '#000000', label: 'Midnight Black' },
      { name: 'white', hex: '#FFFFFF', label: 'Pure White' },
      { name: 'navy', hex: '#1e3a8a', label: 'Navy Blue' },
      { name: 'gray', hex: '#6b7280', label: 'Charcoal Gray' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-34">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-black' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-black">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">Color: {product.colors.find(c => c.name === selectedColor)?.label}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.name === 'white' && (
                      <div className="absolute inset-1 rounded-full border border-gray-200" />
                    )}
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 rounded-full border-2 border-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-all duration-200 font-medium ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-600">Total: ${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isAddingToCart
                    ? 'bg-green-600 scale-95'
                    : 'bg-black hover:bg-gray-800 hover:scale-105 active:scale-95'
                }`}
              >
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${
                  isAddingToCart ? 'animate-bounce' : ''
                }`} />
                <span>
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-black mb-1">Free Shipping</h4>
                  <p className="text-gray-600">On orders over $50</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Easy Returns</h4>
                  <p className="text-gray-600">30-day return policy</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Secure Payment</h4>
                  <p className="text-gray-600">SSL encrypted checkout</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Customer Support</h4>
                  <p className="text-gray-600">24/7 help available</p>
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

export default ProductDetailPage;