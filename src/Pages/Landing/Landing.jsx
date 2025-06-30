import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/authContext';
import { Linkedin, Instagram } from 'lucide-react';
import './Landing.css'; // Ensure you have the CSS file for styles

export default function Landing() {
  const maskRef = useRef(null);
  const dotRef  = useRef(null);
  const rafId   = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // State for transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mask = maskRef.current;
    const dot  = dotRef.current;
    if (!mask || !dot) return;

    // Initial off-screen positions
    mask.style.setProperty('--mx', '-200px');
    mask.style.setProperty('--my', '-200px');
    dot.style.left = '-215px';
    dot.style.top  = '-215px';

    // Normalize beta into –180…+180 and mirror past ±90°
    function normalizeBeta(raw) {
      let b = ((raw + 180) % 360) - 180;
      if (b > 90)  b = 180 - b;
      if (b < -90) b = -180 - b;
      return b;
    }

    // Update mask CSS vars and cursor-dot position
    function update(x, y) {
      const container = mask.parentElement;
      if (!(container instanceof HTMLElement)) return;
      const rect   = container.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;

      // Shift hole 20px left & 20px up
      const offsetX = -50;
      const offsetY = -50;
      mask.style.setProperty('--mx', `${localX - offsetX}px`);
      mask.style.setProperty('--my', `${localY - offsetY}px`);

      dot.style.left = `${x}px`;
      dot.style.top  = `${y}px`;
    }

    // Desktop mouse fallback
    function handleMouse(e) {
      update(e.clientX, e.clientY);
    }
    window.addEventListener('mousemove', handleMouse);

    // Device orientation handler with portrait & face-up presets
    function handleOrientation(e) {
      const rawG = e.gamma || 0;
      const rawB = e.beta  || 0;
      // Portrait (β≈90°) or Display Up (β≈0° & γ≈0°) → center
      if (Math.abs(rawB - 90) < 15 || (Math.abs(rawB) < 15 && Math.abs(rawG) < 15)) {
        update(window.innerWidth / 2, window.innerHeight / 2);
        return;
      }
      // Otherwise map tilt ±30° → screen
      const max = 30;
      const g   = Math.max(-max, Math.min(max, rawG));
      const b   = Math.max(-max, Math.min(max, normalizeBeta(rawB)));
      const x   = ((g + max) / (2 * max)) * window.innerWidth;
      const y   = ((b + max) / (2 * max)) * window.innerHeight;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => update(x, y));
    }

    // Attach orientation listener (iOS permission flow)
    function attachOrientation() {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      DeviceOrientationEvent.requestPermission()
        .then(permission => {
          if (permission === 'granted') attachOrientation();
        })
        .catch(console.error);
    } else {
      attachOrientation();
    }

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Cosmic Void Portal transition
  function handleSponsorsClick(e) {
    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;
    
    // Store click position for the transition
    setClickPosition({ x, y });
    
    // Start transition
    setIsTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/sponsors');
    }, 3000);
  }

  function handleMerchClick() {
    // Redirect to 404 page as requested
    navigate('/404');
  }

  function handleTeamClick() {
    // Get click coordinates for center of screen
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    
    // Store click position for the transition
    setClickPosition({ x, y });
    
    // Start transition
    setIsTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/team'); // You'll need to create this route and page
    }, 2000);
  }

  // Social media redirect functions with animations
  function handleLinkedInClick() {
    // Store click position for the transition
    setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    // Start transition
    setIsTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      window.open('https://www.linkedin.com/company/mascom-iimasr', '_blank');
      setIsTransitioning(false);
    }, 1000);
  }

  function handleInstagramClick() {
    // Store click position for the transition
    setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    // Start transition
    setIsTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      window.open('https://www.instagram.com/mascom_iimamritsar/', '_blank');
      setIsTransitioning(false);
    }, 1000);
  }

  return (
    <>
      <div className="min-h-screen w-full bg-black overflow-hidden font-sans flex flex-col items-center justify-center text-center text-white relative">
        <motion.div 
          className="content"
          initial={{ opacity: 1, scale: 1 }}
          animate={isTransitioning ? { 
            opacity: 0, 
            scale: 0.7,
            rotateY: 15,
            filter: "blur(8px) brightness(0.3)"
          } : { 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            filter: "blur(0px) brightness(1)"
          }}
          transition={{ 
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.h1 
            className="top-heading"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            WE'RE THE
          </motion.h1>
          
          <div className="mascom-container">
            <motion.h2 
              className="mascom-text"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              MASCOM
            </motion.h2>
            <div className="light-mask" ref={maskRef}></div>
          </div>
          
          <motion.p 
            className="description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            MERCHANDISING AND SPONSORSHIP COMMITTEE
          </motion.p>
          
          <motion.div 
            className="buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          >
            <motion.button 
              className="btn" 
              onClick={handleSponsorsClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000",
                fontWeight: 700,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isTransitioning}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              Sponsors
            </motion.button>
            
            <motion.button 
              className="btn"
              onClick={handleMerchClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000",
                fontWeight: 700,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              Merch
            </motion.button>
            
            <motion.button 
              className="btn"
              onClick={handleTeamClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000",
                fontWeight: 700,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isTransitioning}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              The Team
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="social-buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.button 
              className="social-btn" 
              onClick={handleLinkedInClick}
              whileHover={{ 
                scale: 1.2,
                boxShadow: "0 0 20px rgba(10, 102, 194, 0.8)",
                backgroundColor: "#0A66C2",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              disabled={isTransitioning}
            >
              <Linkedin size={24} />
            </motion.button>
            
            <motion.button 
              className="social-btn"
              onClick={handleInstagramClick}
              whileHover={{ 
                scale: 1.2,
                boxShadow: "0 0 20px rgba(225, 48, 108, 0.8)",
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              disabled={isTransitioning}
            >
              <Instagram size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
        
        <div className="cursor-dot" ref={dotRef}></div>
      </div>

      {/* COSMIC VOID PORTAL TRANSITION */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Bomb-like Explosion Animation */}
            <motion.div
              className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
              style={{ left: clickPosition.x, top: clickPosition.y, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,200,0,1) 0%, rgba(255,100,0,0.8) 60%, transparent 100%)",
                  boxShadow: "0 0 50px rgba(255,150,0,0.8), 0 0 100px rgba(255,80,0,0.6)"
                }}
              />
            </motion.div>

            {/* Debris Shards */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <motion.div
                  key={`shard-${i}`}
                  className="fixed z-45 pointer-events-none bg-orange-400"
                  style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                    width: 6,
                    height: 20,
                    background: "linear-gradient(to bottom, rgba(255,150,0,1) 0%, rgba(255,80,0,0.6) 100%)",
                    transformOrigin: 'top center',
                    borderRadius: "2px",
                    transform: `rotate(${(angle * 180 / Math.PI)}deg)`
                  }}
                  initial={{ opacity: 1, scaleY: 0 }}
                  animate={{
                    opacity: 0,
                    scaleY: 1,
                    x: Math.cos(angle) * 150,
                    y: Math.sin(angle) * 150,
                    rotate: 360
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: "easeOut"
                  }}
                />
              );
            })}

            {/* Fade to Black */}
            <motion.div
              className="fixed inset-0 z-60 pointer-events-none bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeIn" }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}