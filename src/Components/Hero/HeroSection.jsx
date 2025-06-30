import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Zap } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import CustomCursor from '../Cursor/CustomCursor';

const HeroSection = () => {
  const isStockAvailable = true; // Set this to false when no products are live
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date (7 days from now for demo)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
    <Navbar />
    <CustomCursor />
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center min-h-screen py-20">
          
          {/* Status Badge */}
          {isStockAvailable ? (
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Clock size={16} className="text-white/80" />
                <span className="text-sm font-medium text-white/90">
                  Open Until {formatDate(targetDate)}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <Clock size={16} className="text-white/80" />
                <span className="text-sm font-medium text-white/90">
                  Stocks will be back soon
                </span>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6"
            >
              <span className="block">Premium</span>
              <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Shopping
              </span>
              <span className="block">Experience</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Discover extraordinary products with unmatched quality and style. 
              Your journey to excellence starts here.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              {isStockAvailable ? (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-black px-12 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-3 shadow-2xl"
                >
                  <span>Start Shopping</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-black px-12 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-3 shadow-2xl"
                >
                  <span>Check Your Orders</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              )}
            </motion.div>

            {/* Countdown Timer */}
            {isStockAvailable && (
              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
                <h3 className="text-lg font-medium text-gray-400 mb-6">Limited Time Offer Ends In:</h3>
                <div className="flex justify-center space-x-4 sm:space-x-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <motion.div
                      key={unit}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 min-w-[80px] sm:min-w-[100px]">
                        <div className="text-2xl sm:text-4xl font-bold text-white">
                          {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mt-1">
                          {unit}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Feature Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-white" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-white" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-white" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroSection;