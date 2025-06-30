import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pulse() {
  const [currentPage, setCurrentPage] = useState('first');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Delay page transition to sync with pulse animation
    setTimeout(() => {
      setCurrentPage('second');
    }, 800);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  const handleSponsorsClick = (e) => {
    if (isAnimating) return;
    
    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;
    
    // Set CSS custom properties for clip-path animation
    document.documentElement.style.setProperty('--clip-x', `${x}px`);
    document.documentElement.style.setProperty('--clip-y', `${y}px`);
    
    setIsAnimating(true);
    
    // Navigate to sponsors page
    setTimeout(() => {
      setCurrentPage('sponsors');
    }, 100);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const handleBackClick = () => {
    setCurrentPage('first');
    // Reset clip-path variables
    document.documentElement.style.removeProperty('--clip-x');
    document.documentElement.style.removeProperty('--clip-y');
  };

  return (
    <>
      <style jsx>{`
        .circular-reveal {
          clip-path: circle(0px at var(--clip-x, 50%) var(--clip-y, 50%));
          animation: circularReveal 1.2s ease-out forwards;
        }

        @keyframes circularReveal {
          to {
            clip-path: circle(150% at var(--clip-x, 50%) var(--clip-y, 50%));
          }
        }

        .pulse-button {
          width: 120px;
          height: 120px;
          background-color: black;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          user-select: none;
          position: relative;
          z-index: 10;
        }

        .sponsors-button {
          padding: 12px 30px;
          background-color: white;
          color: black;
          border: 2px solid white;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          margin-top: 30px;
          transition: all 0.3s ease;
        }

        .sponsors-button:hover {
          background-color: black;
          color: white;
          border-color: white;
          transform: translateY(-2px);
        }

        .back-button {
          padding: 12px 30px;
          background-color: black;
          color: white;
          border: 2px solid black;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          margin-top: 30px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background-color: white;
          color: black;
          transform: translateY(-2px);
        }

        .white-back-button {
          background-color: white;
          color: black;
          border-color: white;
        }

        .white-back-button:hover {
          background-color: black;
          color: white;
          border-color: black;
        }
      `}</style>

      <div className="w-full h-screen relative overflow-hidden font-sans">
        {/* First Page (Black with Button) */}
        <AnimatePresence>
          {currentPage === 'first' && (
            <motion.div
              key="firstPage"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.8, delay: 0.3 }
              }}
              className="absolute w-full h-full bg-black flex flex-col justify-center items-center z-10"
            >
              {/* Main Pulse Button */}
              <motion.button
                className="pulse-button"
                onClick={handleButtonClick}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#ccc',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                animate={isAnimating ? {
                  scale: [1, 1.1, 1],
                  borderColor: ['white', '#fff', 'white']
                } : {}}
                transition={{ duration: 0.3 }}
              >
                ENTER
              </motion.button>

              {/* Sponsors Button */}
              <motion.button
                className="sponsors-button"
                onClick={handleSponsorsClick}
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                Sponsors
              </motion.button>

              {/* Multiple Ripple Effects for Pulse Animation */}
              {isAnimating && currentPage === 'first' && [1, 2, 3].map(i => (
                <motion.div
                  key={`ripple-${i}`}
                  initial={{
                    width: 120,
                    height: 120,
                    opacity: 0.8,
                    scale: 1
                  }}
                  animate={{
                    width: 400 + (i * 100),
                    height: 400 + (i * 100),
                    opacity: 0,
                    scale: 1.5
                  }}
                  transition={{
                    duration: 1.2 + (i * 0.2),
                    ease: 'easeOut',
                    delay: i * 0.1
                  }}
                  className="absolute border-2 border-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Pulse Overlay for ENTER button */}
        {isAnimating && currentPage === 'first' && (
          <motion.div
            key="pulseOverlay"
            initial={{
              width: 0,
              height: 0,
              opacity: 0
            }}
            animate={{
              width: '400vw',
              height: '400vh',
              opacity: [0, 0.3, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
            className="fixed bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
          />
        )}

        {/* Sponsors Page with Circular Reveal */}
        <AnimatePresence>
          {currentPage === 'sponsors' && (
            <motion.div
              key="sponsorsPage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full flex flex-col justify-center items-center z-20 p-5 circular-reveal"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              {/* Animated Sponsors Title */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-white text-5xl mb-5 font-bold text-center"
              >
                Welcome to Sponsors!
              </motion.h1>

              {/* Animated Sponsors Content */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-gray-100 text-xl text-center max-w-2xl leading-relaxed my-5"
              >
                This is the sponsors page with a beautiful circular reveal animation. 
                The transition creates a smooth, elegant effect that expands from the exact 
                point where you clicked the button - just like in your Landing component!
              </motion.p>

              {/* Animated Back Button */}
              <motion.button
                className="back-button white-back-button"
                onClick={handleBackClick}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -3, 
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Go Back
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Second Page (White) - Original pulse transition */}
        <AnimatePresence>
          {currentPage === 'second' && (
            <motion.div
              key="secondPage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute w-full h-full bg-white flex flex-col justify-center items-center z-10 p-5"
            >
              {/* Animated Title */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-black text-5xl mb-5 font-bold"
              >
                Welcome to the New Page!
              </motion.h1>

              {/* Animated Content */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-gray-700 text-xl text-center max-w-2xl leading-relaxed my-5"
              >
                This is your new white page that emerged from the pulse animation. 
                The Framer Motion transition creates a smooth, elegant effect with 
                enhanced physics and timing.
              </motion.p>

              {/* Animated Back Button */}
              <motion.button
                className="back-button"
                onClick={handleBackClick}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -3, 
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Go Back
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}