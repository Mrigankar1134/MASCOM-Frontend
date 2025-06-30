import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Target, RefreshCw } from 'lucide-react';
import './NotFound.css';
import CustomCursor from '../../Components/Cursor/CustomCursor';

// Enhanced game component with score tracking
const Game = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('404GameHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const gameAreaRef = useRef(null);
  
  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    moveTarget();
  };
  
  // Move the target to a random position
  const moveTarget = () => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const targetSize = 40; // Target width/height
    
    // Calculate random position within game area boundaries
    const maxX = gameArea.width - targetSize;
    const maxY = gameArea.height - targetSize;
    
    setTargetPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    });
  };
  
  // Handle target click
  const handleTargetClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    
    // Update high score if needed
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('404GameHighScore', newScore.toString());
    }
    
    moveTarget();
  };
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h3>Never-ending Target Game</h3>
        <div className="score-display">
          Score: <span className="score-value">{score}</span>
          {highScore > 0 && (
            <span style={{ marginLeft: '15px', fontSize: '0.9rem', opacity: 0.8 }}>
              High: {highScore}
            </span>
          )}
        </div>
      </div>
      
      {!isPlaying ? (
        <motion.button 
          className="start-game-btn"
          onClick={startGame}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(37, 211, 102, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Target size={20} />
          Start Game
        </motion.button>
      ) : (
        <>
          <div 
            className="game-area" 
            ref={gameAreaRef}
          >
            <motion.div
              className="target"
              style={{
                left: targetPosition.x,
                top: targetPosition.y,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleTargetClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          
          <p className="game-instructions">
            Click the target as many times as you can! Your high score is saved.
          </p>
        </>
      )}
    </div>
  );
};

// Main NotFound component
const NotFound = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dotRef = useRef(null);
  const rafId = useRef(null);
  
  useEffect(() => {
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Initial off-screen position
    dot.style.left = '-215px';
    dot.style.top = '-215px';

    // Update cursor-dot position
    function update(x, y) {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    }

    // Desktop mouse handler
    function handleMouse(e) {
      update(e.clientX, e.clientY);
    }
    window.addEventListener('mousemove', handleMouse);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);
  
  const handleBack = () => {
    navigate('/');
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
    <div className="not-found-page">
      {isLoading ? (
        <div className="loading-overlay">
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <>
          <motion.button
            className="back-button"
            onClick={handleBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </motion.button>
          
          <motion.div 
            className="not-found-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="error-code"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 10,
                delay: 0.3
              }}
            >
              404
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              The page you're looking for doesn't exist or has been moved.
              Our MERCH section is currently under construction.
            </motion.p>
            
            <motion.div 
              className="action-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button 
                className="home-button"
                onClick={handleBack}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255, 51, 102, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="home-button-content">
                  <Home size={18} />
                  <span>Back to Home</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="game-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h2 className="game-title">While you're here...</h2>
            <Game />
          </motion.div>
        </>
      )}
      <div className="cursor-dot" ref={dotRef}></div>
    </div>
    </>
  );
};

export default NotFound;