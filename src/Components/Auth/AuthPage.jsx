
import CustomCursor from '../Cursor/CustomCursor';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Login from './Login';
import Register from './Register';
import { X, RotateCcw, Check } from 'lucide-react';

const Auth = () => {
const [isLogin, setIsLogin] = useState(true);
const [imagePreview, setImagePreview] = useState(null);
const [showCropper, setShowCropper] = useState(false);
const [cropData, setCropData] = useState({
  x: 50,
  y: 50,
  width: 200,
  height: 200,
  scale: 1
});
const [dragStart, setDragStart] = useState(null);
const [isDragging, setIsDragging] = useState(false);
const [isResizing, setIsResizing] = useState(false);
const [resizeHandle, setResizeHandle] = useState(null);
const [originalImage, setOriginalImage] = useState(null);
const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
const fileInputRef = useRef(null);
const canvasRef = useRef(null);
const cropperRef = useRef(null);


// If Register now handles file input internally, this and related state can be removed.

const getEventPosition = (e) => {
  // Handle both mouse and touch events
  if (e.touches && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
};

const handleCropStart = (e) => {
  e.preventDefault();
  const rect = cropperRef.current.getBoundingClientRect();
  const pos = getEventPosition(e);
  setDragStart({
    x: pos.x - rect.left - cropData.x,
    y: pos.y - rect.top - cropData.y
  });
  setIsDragging(true);
};

const handleResizeStart = (e, handle) => {
  e.preventDefault();
  e.stopPropagation();
  const pos = getEventPosition(e);
  setResizeHandle(handle);
  setIsResizing(true);
  setDragStart({ x: pos.x, y: pos.y });
};

const handleCropMove = useCallback((e) => {
  if (!cropperRef.current) return;
  
  e.preventDefault();
  const pos = getEventPosition(e);
  const rect = cropperRef.current.getBoundingClientRect();
  
  if (isDragging && dragStart) {
    const containerSize = rect.width;
    const newX = Math.max(0, Math.min(containerSize - cropData.width, pos.x - rect.left - dragStart.x));
    const newY = Math.max(0, Math.min(containerSize - cropData.height, pos.y - rect.top - dragStart.y));
    
    setCropData(prev => ({ ...prev, x: newX, y: newY }));
  } else if (isResizing && dragStart) {
    const containerSize = rect.width;
    const deltaX = pos.x - dragStart.x;
    const deltaY = pos.y - dragStart.y;
    
    setCropData(prev => {
      let newData = { ...prev };
      const minSize = 50;
      const maxSize = containerSize;
      
      if (resizeHandle === 'se') {
        const delta = Math.min(deltaX, deltaY);
        newData.width = Math.max(minSize, Math.min(maxSize - prev.x, prev.width + delta));
        newData.height = newData.width;
      } else if (resizeHandle === 'sw') {
        const delta = Math.min(-deltaX, deltaY);
        const newSize = Math.max(minSize, Math.min(prev.x + prev.width, prev.width + delta));
        newData.width = newSize;
        newData.height = newSize;
        newData.x = prev.x + prev.width - newSize;
      } else if (resizeHandle === 'nw') {
        const delta = Math.min(-deltaX, -deltaY);
        const newSize = Math.max(minSize, Math.min(Math.min(prev.x + prev.width, prev.y + prev.height), prev.width + delta));
        newData.width = newSize;
        newData.height = newSize;
        newData.x = prev.x + prev.width - newSize;
        newData.y = prev.y + prev.height - newSize;
      } else if (resizeHandle === 'ne') {
        const delta = Math.min(deltaX, -deltaY);
        const newSize = Math.max(minSize, Math.min(Math.min(maxSize - prev.x, prev.y + prev.height), prev.width + delta));
        newData.width = newSize;
        newData.height = newSize;
        newData.y = prev.y + prev.height - newSize;
      }
      
      return newData;
    });
    
    setDragStart({ x: pos.x, y: pos.y });
  }
}, [isDragging, isResizing, dragStart, cropData.width, cropData.height, resizeHandle]);

const handleCropEnd = useCallback(() => {
  setIsDragging(false);
  setIsResizing(false);
  setDragStart(null);
  setResizeHandle(null);
}, []);

useEffect(() => {
  const handleGlobalMove = (e) => {
    if (isDragging || isResizing) {
      handleCropMove(e);
    }
  };

  const handleGlobalEnd = (e) => {
    e.preventDefault();
    handleCropEnd();
  };

  if (isDragging || isResizing) {
    // Mouse events
    document.addEventListener('mousemove', handleGlobalMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalEnd);
    // Touch events
    document.addEventListener('touchmove', handleGlobalMove, { passive: false });
    document.addEventListener('touchend', handleGlobalEnd);
    // Prevent context menu on long press
    document.addEventListener('contextmenu', handleGlobalEnd);
  }

  return () => {
    document.removeEventListener('mousemove', handleGlobalMove);
    document.removeEventListener('mouseup', handleGlobalEnd); 
    document.removeEventListener('touchmove', handleGlobalMove);
    document.removeEventListener('touchend', handleGlobalEnd);
    document.removeEventListener('contextmenu', handleGlobalEnd);
  };
}, [isDragging, isResizing, handleCropMove, handleCropEnd]);

const handleScaleChange = (e) => {
  setCropData(prev => ({ ...prev, scale: parseFloat(e.target.value) }));
};

const applyCrop = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    const outputSize = 300; // Higher resolution output
    canvas.width = outputSize;
    canvas.height = outputSize;

    // 1) Determine container size (same as in the JSX):
    const containerSize = Math.min(window.innerWidth - 40, 400);

    // 2) Compute scaled image dimensions
    const scaledWidth = imageNaturalSize.width * cropData.scale;
    const scaledHeight = imageNaturalSize.height * cropData.scale;

    // 3) Calculate displayedWidth and displayedHeight based on object-contain
    let displayedWidth, displayedHeight;
    if (scaledWidth > scaledHeight) {
      displayedWidth = containerSize;
      displayedHeight = (scaledHeight / scaledWidth) * containerSize;
    } else {
      displayedHeight = containerSize;
      displayedWidth = (scaledWidth / scaledHeight) * containerSize;
    }

    // 4) Calculate offset to center the image in the container
    const offsetX = (containerSize - displayedWidth) / 2;
    const offsetY = (containerSize - displayedHeight) / 2;

    // 5) Compute ratio of original (scaled) image pixels to displayed pixels
    const ratioOrigToDisp = scaledWidth / displayedWidth;

    // 6) Convert crop box from container coordinates to original image coordinates
    const cropX = (cropData.x - offsetX) * ratioOrigToDisp;
    const cropY = (cropData.y - offsetY) * ratioOrigToDisp;
    const cropSize = cropData.width * ratioOrigToDisp;

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      img,
      cropX,             // top‐left x in original image
      cropY,             // top‐left y in original image
      cropSize,          // width of crop region in original image
      cropSize,          // height of crop region in original image (square)
      0,                 // draw at canvas x = 0
      0,                 // draw at canvas y = 0
      outputSize,        // scale to outputSize × outputSize
      outputSize
    );

    const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreview(croppedImage);
    setFormData(prev => ({ ...prev, profilePic: croppedImage }));
    setShowCropper(false);
  };

  img.src = originalImage;
};

const resetCrop = () => {
  const containerSize = Math.min(window.innerWidth - 40, 400);
  const cropSize = Math.min(200, containerSize * 0.6);
  setCropData({ 
    x: (containerSize - cropSize) / 2, 
    y: (containerSize - cropSize) / 2, 
    width: cropSize, 
    height: cropSize, 
    scale: 1 
  });
};

// If Register now handles file input internally, this and related state can be removed.

// New callbacks for Login and Register
const handleLogin = async (data) => {
  // data contains { email, password, rememberMe }
  console.log('Login attempt:', data);
  alert('Login functionality would be implemented here');
};

const handleRegister = async (data) => {
  // data contains all registered fields, including profilePic if using RHF
  console.log('Register attempt:', data);
  alert('Registration functionality would be implemented here');
};

const toggleMode = () => {
  setIsLogin(!isLogin);
  // Reset image/cropper when switching modes
  setImagePreview(null);
  setShowCropper(false);
};

return (
  <>
  <CustomCursor
        size={32}
        color="rgba(149, 47, 228, 0.52)"
        borderColor="rgba(255, 255, 255, 0.74)"
        blur={true}
        zIndex={9999}
      />
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Join us today'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {isLogin ? (
              <Login onSubmit={handleLogin} />
            ) : (
              <Register onSubmit={handleRegister} />
            )}
          </div>
        </div>

        {/* Crop Modal */}
        {showCropper && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Crop Your Photo</h3>
                  <button
                    onClick={() => setShowCropper(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div 
                    ref={cropperRef}
                    className="relative mx-auto border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 select-none"
                    style={{ 
                      width: Math.min(window.innerWidth - 80, 400), 
                      height: Math.min(window.innerWidth - 80, 400),
                      touchAction: 'none'
                    }}
                  >
                     <img
   src={originalImage}
   alt="Original"
   className="w-full h-full object-contain pointer-events-none"
   style={{
     transform: `scale(${cropData.scale})`,
     transformOrigin: 'center center'
   }}
   draggable={false}
 />
                    
                    {/* Crop overlay */}
                    <div
                      className="absolute border-2 border-white shadow-lg bg-transparent"
                      style={{
                        left: cropData.x,
                        top: cropData.y,
                        width: cropData.width,
                        height: cropData.height,
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                        cursor: isDragging ? 'grabbing' : 'grab'
                      }}
                      onMouseDown={handleCropStart}
                      onTouchStart={handleCropStart}
                    >
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="border border-white opacity-30"></div>
                        ))}
                      </div>
                      
                      {/* Resize handles */}
                      <div
                        className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:bg-blue-50"
                        style={{ 
                          top: 0, 
                          left: 0,
                          cursor: isResizing && resizeHandle === 'nw' ? 'nw-resize' : 'nw-resize'
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'nw')}
                        onTouchStart={(e) => handleResizeStart(e, 'nw')}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2 hover:bg-blue-50"
                        style={{ 
                          top: 0, 
                          right: 0,
                          cursor: isResizing && resizeHandle === 'ne' ? 'ne-resize' : 'ne-resize'
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'ne')}
                        onTouchStart={(e) => handleResizeStart(e, 'ne')}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2 translate-y-1/2 hover:bg-blue-50"
                        style={{ 
                          bottom: 0, 
                          left: 0,
                          cursor: isResizing && resizeHandle === 'sw' ? 'sw-resize' : 'sw-resize'
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'sw')}
                        onTouchStart={(e) => handleResizeStart(e, 'sw')}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform translate-x-1/2 translate-y-1/2 hover:bg-blue-50"
                        style={{ 
                          bottom: 0, 
                          right: 0,
                          cursor: isResizing && resizeHandle === 'se' ? 'se-resize' : 'se-resize'
                        }}
                        onMouseDown={(e) => handleResizeStart(e, 'se')}
                        onTouchStart={(e) => handleResizeStart(e, 'se')}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Zoom
                    </label>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {Math.round(cropData.scale * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={cropData.scale}
                    onChange={handleScaleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetCrop}
                    className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                  <button
                    onClick={applyCrop}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Apply Crop
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Canvas for Cropping */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
  </>
);
};

export default Auth;