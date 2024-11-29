import React from 'react';
import { MicardButton } from '../components/MicardButton';

export const Login: React.FC = () => {
  const handleSuccess = (response: any) => {
    console.log('Authentication successful:', response);
  };

  const handleError = (error: Error) => {
    console.error('Authentication failed:', error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Micard SSO Demo</h1>
          <p className="text-gray-600">Sign in using your Micard healthcare account</p>
        </div>

        <div className="space-y-4">
          <MicardButton
            clientId="your-client-id"
            redirectUri="http://localhost:5173/callback"
            scope={['basic_profile', 'medical_data']}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          
          <p className="text-sm text-gray-500 text-center">
            By signing in, you agree to share your healthcare information with this application
          </p>
        </div>
      </div>
    </div>
  );
};