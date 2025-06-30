import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center p-6">Loading...</div>; // Or a spinner

  return user ? children : <Navigate to="/login" />;
}
