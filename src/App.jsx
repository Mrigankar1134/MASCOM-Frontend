import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AnimatedLanding from './Pages/Landing/Landing.jsx';
import Sponsors from './Pages/Sponsors/Sponsors.tsx';
import Team from './Pages/Team/Team.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import HeroSection from './Components/Hero/HeroSection.jsx';
import ProductGrid from './Components/ProductGrid/ProductGrid.jsx';
import ProductDetailPage from './Components/ProductDetail/ProductDetailPage.jsx';
import Cart from './Components/Cart/Cart.jsx';
import CheckoutPage from './Components/Checkout/CheckoutPage.jsx';
import AuthPage from './Components/Auth/AuthPage.jsx';
import UserDashboard from './Components/Dashboard/DashboardWrapper.jsx';
import { AuthProvider } from './context/authContext.js';
import useAuth from './hooks/useAuth';

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AnimatedLanding />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/404" element={<NotFound />} />
            <Route
              path="/merch-section"
              element={
                <ProtectedRoute>
                  <HeroSection />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        {/* Add React Query Devtools for development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}