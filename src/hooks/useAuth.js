// hooks/useAuth.js
import { useAuth as useAuthContext } from '../context/authContext';

export default function useAuth() {
  return useAuthContext();
}