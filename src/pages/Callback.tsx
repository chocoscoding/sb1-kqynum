import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MicardSSO } from '../services/auth';

export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        navigate('/');
        return;
      }

      try {
        const sso = MicardSSO.getInstance();
        const response = await sso.handleCallback(code);
        // Store the token and user data in your application state
        localStorage.setItem('micard_token', response.accessToken);
        navigate('/dashboard');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}