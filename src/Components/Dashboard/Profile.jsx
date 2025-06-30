import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Edit3,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar,
  Award,
  Star,
  Trophy,
  Target,
  Shield,
  Crown,
  Zap,
  Heart,
  Trash2,
  Home,
  Building,
  Hash,
  IdCard,
  Mars,
  Venus,
  LayoutPanelTop
} from 'lucide-react';


// ---- PasswordModal component ----
const PasswordModal = ({
  passwordType,
  setPasswordType,
  passwordData,
  setPasswordData,
  handlePasswordChange,
  setShowPasswordModal,
  showOTPModal,
  setShowOTPModal,
  handleOTPVerification,
  formData
}) => {
  const otpRefs = useRef([]);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {passwordType === 'change' ? 'Change Password' : 'Forgot Password'}
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              <div className="flex gap-2 mb-6">
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    passwordType === 'change'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setPasswordType('change')}
                >
                  Change
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    passwordType === 'forgot'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setPasswordType('forgot')}
                >
                  Forgot
                </button>
              </div>
              {passwordType === 'change' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <input
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                </>
              )}
              {passwordType === 'forgot' && (
                <>
                  {!showOTPModal && (
                    <>
                      <p className="text-sm text-gray-600 mb-4">
                        An OTP will be sent to <strong>{formData.email}</strong>
                      </p>
                      <button
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        onClick={handlePasswordChange}
                      >
                        Send OTP
                      </button>
                    </>
                  )}
                  {showOTPModal && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                        <div className="flex justify-between gap-2 mb-4">
                          {[...Array(6)].map((_, i) => (
                            <input
                              key={i}
                              ref={el => otpRefs.current[i] = el}
                              type="text"
                              inputMode="numeric"
                              maxLength="1"
                              className="w-10 h-12 text-center border border-gray-300 rounded-md"
                              value={passwordData.otp[i] || ''}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/, '');
                                setPasswordData(prev => {
                                  const otpArray = prev.otp.split('');
                                  otpArray[i] = value;
                                  return { ...prev, otp: otpArray.join('') };
                                });
                                if (value && i < 5) otpRefs.current[i + 1]?.focus();
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !passwordData.otp[i] && i > 0) {
                                  otpRefs.current[i - 1]?.focus();
                                }
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={e =>
                            setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={e =>
                            setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <button
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        onClick={handleOTPVerification}
                      >
                        Verify OTP & Set Password
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [passwordType, setPasswordType] = useState('change');

  // Form data state - using the provided user data structure
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    section: user.section,
    rollNo: user.rollNo,
    hostel: user.hostel,
    block: user.block,
    roomNo: user.roomNo,
    userType: user.userType,
    profilePhotoUrl: user.profilePhotoUrl
  });

  const [editData, setEditData] = useState({
    phone: formData.phone,
    hostel: formData.hostel,
    block: formData.block,
    roomNo: formData.roomNo,
    profilePic: formData.profilePhotoUrl
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });

  // Image cropping states
  const [imagePreview, setImagePreview] = useState(formData.profilePhotoUrl);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
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

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const cropperRef = useRef(null);

  // Achievement badges data
  const achievements = [
    { id: 1, name: 'First Login', icon: Star, color: 'from-yellow-400 to-orange-500', earned: true },
    { id: 2, name: 'Profile Complete', icon: Trophy, color: 'from-green-400 to-blue-500', earned: true },
    { id: 3, name: 'Active User', icon: Target, color: 'from-purple-400 to-pink-500', earned: true },
    { id: 4, name: 'Security Pro', icon: Shield, color: 'from-blue-400 to-indigo-500', earned: user.isAdmin },
    { id: 5, name: 'Top Performer', icon: Crown, color: 'from-amber-400 to-red-500', earned: true },
    { id: 6, name: 'Quick Learner', icon: Zap, color: 'from-cyan-400 to-blue-500', earned: false },
    { id: 7, name: 'Community Hero', icon: Heart, color: 'from-pink-400 to-red-500', earned: user.isModerator }
  ];

  // Helper functions for image cropping (keeping the existing crop functionality)
  const getEventPosition = (e) => {
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
      const newX = Math.max(
        0,
        Math.min(containerSize - cropData.width, pos.x - rect.left - dragStart.x)
      );
      const newY = Math.max(
        0,
        Math.min(containerSize - cropData.height, pos.y - rect.top - dragStart.y)
      );
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
          const newSize = Math.max(
            minSize,
            Math.min(Math.min(prev.x + prev.width, prev.y + prev.height), prev.width + delta)
          );
          newData.width = newSize;
          newData.height = newSize;
          newData.x = prev.x + prev.width - newSize;
          newData.y = prev.y + prev.height - newSize;
        } else if (resizeHandle === 'ne') {
          const delta = Math.min(deltaX, -deltaY);
          const newSize = Math.max(
            minSize,
            Math.min(Math.min(maxSize - prev.x, prev.y + prev.height), prev.width + delta)
          );
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
      if (isDragging || isResizing) handleCropMove(e);
    };
    const handleGlobalEnd = (e) => {
      e.preventDefault();
      handleCropEnd();
    };
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleGlobalMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove, { passive: false });
      document.addEventListener('touchend', handleGlobalEnd);
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
      const outputSize = 300;
      canvas.width = outputSize;
      canvas.height = outputSize;

      const containerSize = Math.min(window.innerWidth - 40, 400);
      const scaledWidth = imageNaturalSize.width * cropData.scale;
      const scaledHeight = imageNaturalSize.height * cropData.scale;
      let displayedWidth, displayedHeight;

      if (scaledWidth > scaledHeight) {
        displayedWidth = containerSize;
        displayedHeight = (scaledHeight / scaledWidth) * containerSize;
      } else {
        displayedHeight = containerSize;
        displayedWidth = (scaledWidth / scaledHeight) * containerSize;
      }

      const offsetX = (containerSize - displayedWidth) / 2;
      const offsetY = (containerSize - displayedHeight) / 2;
      const ratioOrigToDisp = scaledWidth / displayedWidth;

      const cropX = (cropData.x - offsetX) * ratioOrigToDisp;
      const cropY = (cropData.y - offsetY) * ratioOrigToDisp;
      const cropSize = cropData.width * ratioOrigToDisp;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropSize,
        cropSize,
        0,
        0,
        outputSize,
        outputSize
      );

      const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
      setImagePreview(croppedImage);
      setEditData(prev => ({ ...prev, profilePic: croppedImage }));
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

  const removePicture = () => {
    setImagePreview(null);
    setEditData(prev => ({ ...prev, profilePic: null }));
    setShowCropper(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImageNaturalSize({ width: img.width, height: img.height });
          setOriginalImage(event.target.result);
          setShowCropper(true);
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
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setFormData(prev => ({
      ...prev,
      phone: editData.phone,
      hostel: editData.hostel,
      block: editData.block,
      roomNo: editData.roomNo,
      profilePhotoUrl: editData.profilePic
    }));
    setIsEditing(false);
    // Here you would make an API call to update the user data
    console.log('Saving profile data:', {
      phone: editData.phone,
      hostel: editData.hostel,
      block: editData.block,
      roomNo: editData.roomNo,
      profilePhotoUrl: editData.profilePic
    });
  };

  const handleCancelEdit = () => {
    setEditData({
      phone: formData.phone,
      hostel: formData.hostel,
      block: formData.block,
      roomNo: formData.roomNo,
      profilePic: formData.profilePhotoUrl
    });
    setImagePreview(formData.profilePhotoUrl);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordType === 'change') {
      if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        alert('Please fill all password fields');
        return;
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New password and confirmation do not match');
        return;
      }
      console.log('Changing password...');
      setShowPasswordModal(false);
    } else {
      const userEmail = formData.email;
      if (!userEmail) {
        alert('No email found for this account');
        return;
      }
      console.log(`Sending OTP to ${userEmail}...`);
      setShowOTPModal(true);
    }
  };

  const handleOTPVerification = () => {
    if (!passwordData.otp || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill all required fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    console.log('Verifying OTP and setting new password...');
    setShowOTPModal(false);
    setShowPasswordModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome back, {formData.name.split(' ')[0]}! 👋
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Manage your profile and track your achievements
          </motion.p>
          {(user.isAdmin || user.isModerator) && (
            <motion.div
              className="flex justify-center gap-2 mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {user.isAdmin && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center gap-1">
                  <Crown size={14} />
                  Admin
                </span>
              )}
              {user.isModerator && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center gap-1">
                  <Shield size={14} />
                  Moderator
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Profile Details Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          <motion.button
            onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isEditing
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? <X size={18} /> : <Edit3 size={18} />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>

        {/* Profile Picture Row */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
            </motion.div>
            {isEditing && (
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={16} />
              </motion.button>
            )}
          </div>
        </div>
        {isEditing && imagePreview && (
          <motion.button
            onClick={removePicture}
            className="flex items-center gap-2 mx-auto text-red-600 hover:text-red-700 text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Trash2 size={14} />
            Remove Photo
          </motion.button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        {/* Unified Profile Fields Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <User size={18} className="text-gray-500" />
              <span className="text-gray-900 font-medium">{formData.name}</span>
            </div>
          </div>
          {/* Roll Number (if available and not faculty) */}
          {formData.rollNo && formData.userType !== 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Roll No</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <IdCard size={18} className="text-gray-500" />
                <span className="text-gray-900 font-mono">{formData.rollNo}</span>
              </div>
            </div>
          )}
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <Mail size={18} className="text-gray-500" />
              <span className="text-gray-900">{formData.email}</span>
            </div>
          </div>
          {/* Phone (editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Phone"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <Phone size={18} className="text-gray-500" />
                <span className="text-gray-900">{formData.phone}</span>
              </div>
            )}
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              {formData.gender === 'Male' ? (
                <Mars size={18} className="text-blue-500" />
              ) : (
                <Venus size={18} className="text-pink-500" />
              )}
              <span className="text-gray-900">{formData.gender}</span>
            </div>
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-gray-900">
                {formData.dateOfBirth
                  ? new Date(formData.dateOfBirth).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
          {/* Section */}
          {formData.userType !== 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <LayoutPanelTop size={18} className="text-gray-500" />
                <span className="text-gray-900">{formData.section}</span>
              </div>
            </div>
          )}
          {/* Hostel (editable) */}
          {formData.userType !== 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.hostel}
                  onChange={(e) => setEditData(prev => ({ ...prev, hostel: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <Home size={18} className="text-gray-500" />
                  <span className="text-gray-900">{formData.hostel}</span>
                </div>
              )}
            </div>
          )}
          {/* Block (editable) */}
          {formData.userType !== 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Block</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.block}
                  onChange={(e) => setEditData(prev => ({ ...prev, block: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <Building size={18} className="text-gray-500" />
                  <span className="text-gray-900">{formData.block}</span>
                </div>
              )}
            </div>
          )}
          {/* Room No (editable) */}
          {formData.userType !== 'faculty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room No</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.roomNo}
                  onChange={(e) => setEditData(prev => ({ ...prev, roomNo: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <Hash size={18} className="text-gray-500" />
                  <span className="text-gray-900">{formData.roomNo}</span>
                </div>
              )}
            </div>
          )}
          {/* Password Change */}
          {isEditing && (
            <div className="md:col-span-2">
              <motion.button
                onClick={() => setShowPasswordModal(true)}
                className="mb-4 text-black hover:text-gray-700 text-sm underline"
                whileHover={{ scale: 1.02 }}
              >
                Change Password
              </motion.button>
            </div>
          )}
          {/* Save Changes */}
          {isEditing && (
            <div className="md:col-span-2">
              <motion.button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save size={18} />
                Save Changes
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Award size={24} className="text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Achievement Badges</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? 'border-gray-200 bg-white shadow-sm'
                  : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: achievement.earned ? 1.05 : 1 }}
            >
              <div className="text-center">
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    achievement.earned
                      ? `bg-gradient-to-r ${achievement.color}`
                      : 'bg-gray-200'
                  }`}
                  animate={achievement.earned ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <achievement.icon
                    size={20}
                    className={achievement.earned ? 'text-white' : 'text-gray-400'}
                  />
                </motion.div>
                <h3 className={`text-sm font-medium ${
                  achievement.earned ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </h3>
              </div>
              
              {achievement.earned && (
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Cropper Modal */}
      <AnimatePresence>
        {showCropper && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto max-h-screen overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Crop Your Photo</h3>
                  <button
                    onClick={() => setShowCropper(false)}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X size={24} />
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
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="border border-white opacity-30"></div>
                        ))}
                      </div>

                      {['nw', 'ne', 'sw', 'se'].map((handle) => (
                        <div
                          key={handle}
                          className="absolute w-4 h-4 bg-white border-2 border-black rounded-full hover:bg-gray-50"
                          style={{
                            top: handle.includes('n') ? 0 : 'auto',
                            bottom: handle.includes('s') ? 0 : 'auto',
                            left: handle.includes('w') ? 0 : 'auto',
                            right: handle.includes('e') ? 0 : 'auto',
                            transform: handle.includes('n') && handle.includes('w') ? 'translate(-50%, -50%)' :
                                     handle.includes('n') && handle.includes('e') ? 'translate(50%, -50%)' :
                                     handle.includes('s') && handle.includes('w') ? 'translate(-50%, 50%)' :
                                     'translate(50%, 50%)',
                            cursor: `${handle}-resize`
                          }}
                          onMouseDown={(e) => handleResizeStart(e, handle)}
                          onTouchStart={(e) => handleResizeStart(e, handle)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Zoom</label>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{Math.round(cropData.scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={cropData.scale}
                    onChange={handleScaleChange}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={resetCrop}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyCrop}
                    className="px-4 py-2 text-sm bg-black text-white hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            passwordType={passwordType}
            setPasswordType={setPasswordType}
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            handlePasswordChange={handlePasswordChange}
            setShowPasswordModal={setShowPasswordModal}
            showOTPModal={showOTPModal}
            setShowOTPModal={setShowOTPModal}
            handleOTPVerification={handleOTPVerification}
            formData={formData}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;