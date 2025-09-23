import React from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
  // Check if user is already authenticated
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginSuccess = () => {
    // Use navigate instead of window.location.href
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onSuccess={handleLoginSuccess} />

        <div className="text-center mt-6">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
