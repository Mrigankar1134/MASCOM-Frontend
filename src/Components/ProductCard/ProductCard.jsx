import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({
    image,
    name,
    price,
    originalPrice,
    tag,
    tagType = 'new', // 'new', 'soldout', 'sale', 'hot'
    onAddToCart,
    onQuickView,
    onToggleFavorite,
    className = ""
}) => {
    const getTagStyles = (type) => {
        switch (type) {
            case 'soldout':
                return 'bg-gray-800 text-white';
            case 'sale':
                return 'bg-red-500 text-white';
            case 'hot':
                return 'bg-orange-500 text-white';
            case 'new':
            default:
                return 'bg-black text-white';
        }
    };

    const cardVariants = {
        initial: { scale: 1, y: 0 },
        hover: {
            scale: 1.03,
            y: -8,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const actionVariants = {
        initial: { opacity: 0, y: 20 },
        hover: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const buttonVariants = {
        initial: { opacity: 0, y: 10 },
        hover: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className={`group relative bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ${className}`}
        >
            {/* Product Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <motion.img
                    variants={imageVariants}
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />

                {/* Tag */}
                {tag && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${getTagStyles(tagType)}`}
                    >
                        {tag}
                    </motion.div>
                )}

                {/* Favorite Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.();
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                >
                    <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
                </motion.button>

                {/* Action Buttons Overlay */}
                <motion.div
                    variants={actionVariants}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-2"
                >
                    <motion.button
                        variants={buttonVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuickView?.();
                        }}
                        className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Eye size={18} />
                    </motion.button>

                    {tagType !== 'soldout' && (
                        <motion.button
                            variants={buttonVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart?.();
                            }}
                            className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            <ShoppingCart size={18} />
                        </motion.button>
                    )}
                </motion.div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <motion.h3
                    className="text-lg font-semibold text-black mb-2 line-clamp-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                >
                    {name}
                </motion.h3>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-black">{price}</span>
                        {originalPrice && originalPrice !== price && (
                            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
                        )}
                    </div>

                    {tagType === 'soldout' && (
                        <span className="text-sm text-gray-500 font-medium">Sold Out</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
export default ProductCard;