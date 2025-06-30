import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarNav from './SidebarNav';
import Profile from './Profile';
import CustomCursor from '../Cursor/CustomCursor';
import OrderDetailsUser from './OrdersDetailsUser';
import OrderListUser from './OrderListUser';
import UserMgmt from './Admin/UserMgmt';
import userData from '../../data/user.json';
import { TABS } from '../../utils/tabs';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {selectedOrder ? (
        <OrderDetailsUser order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <OrderListUser onSelectOrder={handleOrderSelect} />
      )}
    </>
  );
};

const DashboardWrapper = () => {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdminView, setIsAdminView] = useState(null); // 'admin' | 'moderator' | null

  const user = userData[0]; // You can change this logic to dynamically select logged-in user

  useEffect(() => {
    if (user?.isAdmin) {
      setIsAdminView('admin');
    } else if (user?.isModerator) {
      setIsAdminView('moderator');
    } else {
      setIsAdminView(null);
    }
  }, [user]);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleTabChange = (tabId) => {
    if (tabId === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked');
      return;
    }
    setActiveTab(tabId);
  };

  // Page transition variants
  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Render current section
  const renderSection = () => {
    if (activeTab === TABS.USER_MANAGEMENT && isAdminView) {
      return <UserMgmt />;
    }
    switch (activeTab) {
      case TABS.PROFILE:
        return <Profile user={user} />;
      case TABS.ORDERS:
        return <Orders />;
      default:
        return null;
    }
  };

  return (
    <>
<CustomCursor
        size={32}
        color="rgba(51, 51, 51, 0.52)"
        borderColor="rgba(255, 255, 255, 0.5)"
        blur={true}
        zIndex={9999}
      />
    <div className="min-h-screen bg-gray-50">
      <SidebarNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isMobile={isMobile}
        onAdminToggle={setIsAdminView}
        isAdminView={isAdminView}
        user={user}
      />
      
      <main className={`transition-all duration-300 ${
        isMobile ? 'pt-24 px-0' : 'ml-72 p-0'
      }`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {renderSection()}
            </div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
    </>
  );
};

export default DashboardWrapper;