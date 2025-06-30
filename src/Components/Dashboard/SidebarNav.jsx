import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMainMenuItems, adminMenuItems } from '../../configs/menuItems';
import { User, Package, Bell, LogOut, Menu, X, ChevronRight, Home, Users, ShoppingCart, CreditCard, Archive, FileText, ArrowLeft } from 'lucide-react';
import { MENU_COLORS } from '../../configs/menuColors';
import { LABELS } from '../../utils/constants';


const SidebarNav = ({ activeTab, onTabChange, isMobile = false, isAdminView, onAdminToggle, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentMenuItems = activeTab === 'user-management' ? adminMenuItems : getMainMenuItems(user);

  const handleTabClick = (tabId) => {
    if (tabId === 'home') {
      window.location.href = '/hero';
      return;
    }
    if (tabId === 'admin') {
      if (user?.isAdmin) {
        onAdminToggle('admin');
      } else if (user?.isModerator) {
        onAdminToggle('moderator');
      }
      onTabChange('user-management'); // Set active tab to user-management
      return;
    }
    if (tabId === 'back') {
      onAdminToggle(false);
      onTabChange('profile'); // Reset to main dashboard view
      return;
    }
    onTabChange(tabId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animated hamburger lines
  const HamburgerIcon = ({ isOpen }) => (
    <div className="w-6 h-6 flex flex-col justify-center items-center relative">
      <motion.span
        className="w-6 h-0.5 bg-gray-800 rounded-full absolute"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="w-6 h-0.5 bg-gray-800 rounded-full absolute"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? -20 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="w-6 h-0.5 bg-gray-800 rounded-full absolute"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );

  // Mobile navbar
  if (isMobile) {
    return (
      <>
        {/* Mobile top navbar with gradient */}
        <motion.div 
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-lg shadow-lg border-b border-gray-100 z-50 px-6 py-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {isAdminView ? LABELS.ADMIN_PANEL : LABELS.DASHBOARD}
          </motion.h1>
          
          <motion.button
            onClick={toggleMobileMenu}
            className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </motion.button>
        </motion.div>

        {/* Mobile menu overlay with backdrop blur */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <motion.div
                className="fixed top-20 right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 min-w-64 max-h-96 overflow-hidden flex flex-col"
                initial={{ opacity: 0, scale: 0.8, y: -20, x: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20, x: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.4 
                }}
              >
                <div className="py-4 overflow-y-auto flex-1">
                  {currentMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center px-6 py-4 text-left transition-all duration-300 relative group ${
                          isActive
                            ? `text-white bg-gradient-to-r ${MENU_COLORS[item.id] || 'from-gray-500 to-gray-700'} shadow-lg`
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-2 rounded-lg mr-4 transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 group-hover:bg-white group-hover:shadow-md'
                        }`}>
                          <Icon size={18} />
                        </div>
                        <span className="font-semibold flex-1">{item.label}</span>
                        
                        <motion.div
                          className={`transition-all duration-300 ${
                            isActive ? 'text-white/80' : 'text-gray-400 group-hover:text-gray-600'
                          }`}
                          animate={{ x: isActive ? 0 : -5 }}
                        >
                          <ChevronRight size={16} />
                        </motion.div>

                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                            layoutId="mobile-active-indicator"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                
                {/* Bottom decoration */}
                <motion.div
                  className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
      </>
    );
  }

  // Desktop sidebar with enhanced animations and scrollable navigation
  return (
    <>
    <motion.div 
      className="fixed left-0 top-0 h-full w-72 bg-black text-white shadow-2xl z-30 flex flex-col border-r border-gray-800"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Fixed Header with animated background */}
      <motion.div 
        className="relative p-8 border-b border-gray-800 overflow-hidden flex-shrink-0"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.h1 
          className="text-3xl font-bold text-white relative z-10"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {isAdminView ? LABELS.ADMIN_PANEL : LABELS.DASHBOARD}
        </motion.h1>
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Scrollable Navigation menu */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <nav className="mt-8 flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <AnimatePresence mode="wait">
            {currentMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center px-6 py-4 mb-2 text-left transition-all duration-300 rounded-xl relative group overflow-hidden ${
                    isActive 
                      ? 'text-white bg-gray-800 shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-900'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ 
                    delay: 0.1 + (index * 0.05),
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    x: isActive ? 0 : 8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background for active state */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                  
                  <div className={`p-3 rounded-lg mr-4 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gray-700 shadow-lg' 
                      : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}>
                    <Icon size={20} />
                  </div>
                  
                  <span className="font-semibold text-lg">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                      layoutId="desktop-active-indicator"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </nav>
      </div>
      
      {/* Fixed Enhanced user profile section */}
      <motion.div 
        className="p-6 mx-4 mb-6 bg-gray-900 backdrop-blur-sm rounded-2xl border border-gray-800 relative overflow-hidden flex-shrink-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="flex items-center relative z-10">
          <motion.div 
            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
            }}
            transition={{ duration: 0.2 }}
          >
            <User size={24} className="text-white" />
          </motion.div>
          <div className="ml-4">
            <motion.p 
              className="font-semibold text-white text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {user?.name?.split(' ')[0] || 'Guest'}
            </motion.p>
            <motion.p 
              className="text-sm text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {isAdminView ? LABELS.ADMIN_PANEL : user?.type || 'Member'}
            </motion.p>
          </div>
        </div>
        
        {/* Animated decoration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
    
    </>
  );
};

export default SidebarNav;