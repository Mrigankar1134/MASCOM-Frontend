import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Package } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', icon: null },
        { name: 'Shop', href: '#shop', icon: null },
        { name: 'Orders', href: '#orders', icon: Package },
        { name: 'Cart', href: '#cart', icon: ShoppingCart }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Sticky Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-black/95 backdrop-blur-md shadow-lg'
                        : 'bg-black'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0"
                        >
                            <a href="#" className="text-white font-bold text-xl tracking-wide">
                                LOGO
                            </a>
                        </motion.div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -2 }}
                                        className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group flex items-center space-x-1"
                                    >
                                        {link.icon && <link.icon size={16} />}
                                        <span>{link.name}</span>

                                        {/* Animated underline */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* User Avatar/Login - Desktop */}
                        <div className="hidden md:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-200"
                            >
                                <User size={20} />
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="text-white hover:text-gray-300 p-2"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        onClick={() => setIsOpen(false)}
                                        className="text-white hover:text-gray-300 hover:bg-gray-800 block px-3 py-2 text-base font-medium transition-all duration-200 flex items-center space-x-2"
                                    >
                                        {link.icon && <link.icon size={18} />}
                                        <span>{link.name}</span>
                                    </motion.a>
                                ))}

                                {/* Mobile Login Button */}
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                                    className="w-full text-left text-white hover:text-gray-300 hover:bg-gray-800 px-3 py-2 text-base font-medium transition-all duration-200 flex items-center space-x-2"
                                >
                                    <User size={18} />
                                    <span>Login</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;