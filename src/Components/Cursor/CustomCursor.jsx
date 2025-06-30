import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = ({
  size = 24,
  color = 'rgba(255, 255, 255, 0.2)',
  borderColor = 'rgba(255, 255, 255, 0.4)',
  blur = true,
  zIndex = 9999
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  
  // Use motion values for better performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    let rafId;
    
    const updateMousePosition = (e) => {
      // Use requestAnimationFrame for smoother updates
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - size / 2);
        cursorY.set(e.clientY - size / 2);
        
        if (!isVisible) {
          setIsVisible(true);
        }
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, size, isVisible]);

  // Hide default cursor
  useEffect(() => {
    if (isVisible) {
      document.body.style.cursor = 'none';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        backgroundColor: color,
        border: `1px solid ${borderColor}`,
        borderRadius: '50%',
        zIndex,
        backdropFilter: blur ? 'blur(4px)' : 'none',
        willChange: 'transform'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default CustomCursor;