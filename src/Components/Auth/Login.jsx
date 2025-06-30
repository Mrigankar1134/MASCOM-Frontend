import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import CustomCursor from '../Cursor/CustomCursor';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/merch-section');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
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
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
      </div>

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
        {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" {...register('rememberMe')} className="mr-2 rounded" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
    </>
  );
};

export default Login;
