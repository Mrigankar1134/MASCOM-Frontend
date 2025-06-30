import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X, Heart, ShoppingCart, Eye } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import Navbar from '../Navbar/Navbar';
import CustomCursor from '../Cursor/CustomCursor';

// Dropdown Filter Component
const FilterDropdown = ({ label, options, value, onChange, isOpen, onToggle }) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
            >
                <span className="text-gray-700">
                    {value === 'all' ? label : value}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        onToggle();
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${value === option.value ? 'bg-gray-100 text-black font-medium' : 'text-gray-700'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Main Product Grid Component
const ProductGrid = () => {
    const [filters, setFilters] = useState({
        category: 'all',
        size: 'all',
        color: 'all'
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    // Sample product data
    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Headphones",
            name: "Premium Wireless Headphones",
            price: "$299",
            originalPrice: "$399",
            tag: "Sale",
            tagType: "sale",
            category: "Electronics",
            size: "One Size",
            color: "Black"
        },
        {
            id: 2,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Watch",
            name: "Classic Analog Watch",
            price: "$199",
            tag: "New",
            tagType: "new",
            category: "Accessories",
            size: "Medium",
            color: "Silver"
        },
        {
            id: 3,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Sunglasses",
            name: "Designer Sunglasses",
            price: "$149",
            tag: "Sold Out",
            tagType: "soldout",
            category: "Accessories",
            size: "One Size",
            color: "Black"
        },
        {
            id: 4,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Shoes",
            name: "Athletic Running Shoes",
            price: "$129",
            originalPrice: "$169",
            tag: "Hot",
            tagType: "hot",
            category: "Footwear",
            size: "Large",
            color: "White"
        },
        {
            id: 5,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Backpack",
            name: "Minimalist Backpack",
            price: "$89",
            tag: "New",
            tagType: "new",
            category: "Bags",
            size: "Large",
            color: "Gray"
        },
        {
            id: 6,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Speaker",
            name: "Wireless Bluetooth Speaker",
            price: "$79",
            originalPrice: "$99",
            tag: "Sale",
            tagType: "sale",
            category: "Electronics",
            size: "Small",
            color: "Blue"
        },
        {
            id: 7,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Jacket",
            name: "Winter Leather Jacket",
            price: "$259",
            tag: "New",
            tagType: "new",
            category: "Clothing",
            size: "Medium",
            color: "Brown"
        },
        {
            id: 8,
            image: "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Phone",
            name: "Smartphone Case",
            price: "$39",
            tag: "Hot",
            tagType: "hot",
            category: "Electronics",
            size: "Small",
            color: "Clear"
        }
    ];

    // Filter options
    const filterOptions = {
        category: [
            { value: 'all', label: 'All Categories' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Accessories', label: 'Accessories' },
            { value: 'Footwear', label: 'Footwear' },
            { value: 'Bags', label: 'Bags' },
            { value: 'Clothing', label: 'Clothing' }
        ],
        size: [
            { value: 'all', label: 'All Sizes' },
            { value: 'Small', label: 'Small' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Large', label: 'Large' },
            { value: 'One Size', label: 'One Size' }
        ],
        color: [
            { value: 'all', label: 'All Colors' },
            { value: 'Black', label: 'Black' },
            { value: 'White', label: 'White' },
            { value: 'Gray', label: 'Gray' },
            { value: 'Blue', label: 'Blue' },
            { value: 'Brown', label: 'Brown' },
            { value: 'Silver', label: 'Silver' },
            { value: 'Clear', label: 'Clear' }
        ]
    };

    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return (
                (filters.category === 'all' || product.category === filters.category) &&
                (filters.size === 'all' || product.size === filters.size) &&
                (filters.color === 'all' || product.color === filters.color)
            );
        });
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleDropdownToggle = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            size: 'all',
            color: 'all'
        });
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

    // Grid animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
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
        <div className="min-h-screen bg-gray-50 py-8 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black mb-4">Product Collection</h1>
                    <p className="text-lg text-gray-600">
                        Discover our curated selection of premium products
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <Filter size={20} className="text-gray-600" />
                            <span className="text-gray-700 font-medium">Filters:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 max-w-2xl">
                            <FilterDropdown
                                label="Category"
                                options={filterOptions.category}
                                value={filters.category}
                                onChange={(value) => handleFilterChange('category', value)}
                                isOpen={openDropdown === 'category'}
                                onToggle={() => handleDropdownToggle('category')}
                            />

                            <FilterDropdown
                                label="Size"
                                options={filterOptions.size}
                                value={filters.size}
                                onChange={(value) => handleFilterChange('size', value)}
                                isOpen={openDropdown === 'size'}
                                onToggle={() => handleDropdownToggle('size')}
                            />

                            <FilterDropdown
                                label="Color"
                                options={filterOptions.color}
                                value={filters.color}
                                onChange={(value) => handleFilterChange('color', value)}
                                isOpen={openDropdown === 'color'}
                                onToggle={() => handleDropdownToggle('color')}
                            />
                        </div>

                        {hasActiveFilters && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearFilters}
                                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                            >
                                <X size={16} />
                                <span>Clear Filters</span>
                            </motion.button>
                        )}
                    </div>

                    {/* Results count */}
                    <div className="text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                </div>

                {/* Product Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={JSON.stringify(filters)}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                layout
                            >
                                <ProductCard
                                    product={product}
                                    onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
                                    onQuickView={(id) => console.log(`Quick view for product ${id}`)}
                                    onToggleFavorite={(id) => console.log(`Toggled favorite for product ${id}`)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="text-gray-400 mb-4">
                            <Filter size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your filters to see more results
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            Clear All Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
        </>
    );
};

export default ProductGrid;