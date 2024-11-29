import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const AuthPopup: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuth = () => {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'MICARD_AUTH_SUCCESS',
            payload: {
              accessToken: 'mock_access_token_xyz',
              userData: {
                id: 'usr_123',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                birthDate: '1990-01-01',
                gender: 'Male',
                bloodGroup: 'O+',
                weight: '75kg',
                height: '180cm',
                allergies: ['Peanuts', 'Penicillin']
              }
            }
          },
          window.location.origin
        );
      }
    };

    // Simulate authentication delay
    setTimeout(handleAuth, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Authenticating with Micard...</p>
        <p className="mt-2 text-sm text-gray-500">
          Client ID: {searchParams.get('client_id')}
        </p>
      </div>
    </div>
  );
};