// React is automatically imported with JSX in modern React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AnimatedLanding from './Pages/Landing/Landing';
import Sponsors from './Pages/Sponsors/Sponsors';
import Team from './Pages/Team/Team';
import NotFound from './Pages/NotFound/NotFound';
import HeroSection from './Components/Hero/HeroSection';
import ProductGrid from './Components/ProductGrid/ProductGrid';
import ProductDetailPage from './Components/ProductDetail/ProductDetailPage';
import Cart from './Components/Cart/Cart';
import CheckoutPage from './Components/Checkout/CheckoutPage';
import AuthPage from './Components/Auth/AuthPage';
import UserDashboard from './Components/Dashboard/DashboardWrapper';
import { AuthProvider } from './context/authContext';
import useAuth from './hooks/useAuth';

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
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