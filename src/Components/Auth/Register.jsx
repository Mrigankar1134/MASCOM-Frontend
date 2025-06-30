import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../lib/apiClient';
import { Upload, User, X, Calendar } from 'lucide-react';
import DatePicker from '../DatePicker/DatePicker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/registerSchema';
import CustomCursor from '../Cursor/CustomCursor';

const Register = ({ handleFileSelect, fileInputRef, imagePreview, removePicture }) => {


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      userType: '',
      rollNo: '',
      section: '',
      hostel: '',
      block: '',
      roomNo: '',
      password: '',
      confirmPassword: ''
    }
  });

  const isStudentType = watch('userType') === 'Student';


  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await apiClient.post('/auth/register', formData);
      // Store user payload locally; JWT is now in HTTP-only cookie
      localStorage.setItem('userPayload', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      // For now, just log errors to the console
      console.error(error);
    }
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
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            {imagePreview && (
              <button
                type="button"
                onClick={removePicture}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              {...register('profilePic')}
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo
            </button>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          {...register('name')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-600 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <DatePicker
            selectedDate={watch('dateOfBirth') ? new Date(watch('dateOfBirth')) : null}
            onChange={(date) => {
              const isoString = date.toISOString().split('T')[0];
              setValue('dateOfBirth', isoString);
            }}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        {errors.dateOfBirth && (
          <p className="text-red-600 text-xs">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          {...register('gender')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-xs">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Type
        </label>
        <select
          {...register('userType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        >
          <option value="">Select User Type</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
        </select>
        {errors.userType && (
          <p className="text-red-600 text-xs">{errors.userType.message}</p>
        )}
      </div>

      {isStudentType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number
          </label>
          <input
            {...register('rollNo')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your roll number"
          />
          {errors.rollNo && (
            <p className="text-red-600 text-xs">{errors.rollNo.message}</p>
          )}
        </div>
      )}

      {isStudentType && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              {...register('section')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
            {errors.section && (
              <p className="text-red-600 text-xs">{errors.section.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel
            </label>
            <select
              {...register('hostel')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="">Select Hostel</option>
              <option value="Blessing City">Blessing City</option>
              <option value="Permanent Campus">Permanent Campus</option>
            </select>
            {errors.hostel && (
              <p className="text-red-600 text-xs">{errors.hostel.message}</p>
            )}
          </div>

          {watch('hostel') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block
              </label>
              <select
                {...register('block')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              >
                <option value="">Select Block</option>
                {watch('hostel') === 'Blessing City' && ['B', 'C', 'D', 'F'].map((block) => (
                  <option key={block} value={block}>{block}</option>
                ))}
                {watch('hostel') === 'Permanent Campus' && ['A', 'B', 'C', 'D'].map((block) => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
              {errors.block && (
                <p className="text-red-600 text-xs">{errors.block.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              {...register('roomNo')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter your room number"
            />
            {errors.roomNo && (
              <p className="text-red-600 text-xs">{errors.roomNo.message}</p>
            )}
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-600 text-xs">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting…' : 'Create Account'}
      </button>
    </form>
    </>
  );
};

export default Register;