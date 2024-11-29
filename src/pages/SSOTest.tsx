import React, { useState, useEffect } from 'react';
import { MicardButton } from '../components/MicardButton';
import { Heart, Shield, UserCheck, Key } from 'lucide-react';
import { MicardSSO } from '../services/auth';
import { JWTService } from '../utils/jwt';
import { CookieService } from '../utils/cookies';

export const SSOTest: React.FC = () => {
  const [authResult, setAuthResult] = useState<any>(null);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = CookieService.getToken();
    const userData = CookieService.getUser();

    if (token && userData) {
      setAuthResult({ token, userData });
      JWTService.decodeToken(token).then(setDecodedToken);
    }
  }, []);

  const handleSuccess = async (response: any) => {
    setAuthResult(response);
    const decoded = await JWTService.decodeToken(response.token);
    setDecodedToken(decoded);
  };

  const handleError = (error: Error) => {
    console.error('Authentication failed:', error);
  };

  const handleLogout = () => {
    const sso = MicardSSO.getInstance();
    sso.logout();
    setAuthResult(null);
    setDecodedToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Micard SSO Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Test your SSO integration with mock data
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600">
                Industry-standard OAuth 2.0 and OIDC compliant
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Healthcare Data</h3>
              <p className="text-gray-600">
                Access to verified medical information
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">User Consent</h3>
              <p className="text-gray-600">Transparent data sharing controls</p>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            {!authResult ? (
              <MicardButton
                clientId="test_client_id"
                redirectUri={window.location.origin + '/callback'}
                scope={['basic_profile', 'medical_data']}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {authResult && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">JWT Token</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">
                      Decoded Token Payload:
                    </span>
                  </div>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(decodedToken, null, 2)}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">User Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Personal Information
                      </h4>
                      <dl className="space-y-1">
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Name:</dt>
                          <dd>{`${authResult.userData.firstName} ${authResult.userData.lastName}`}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Email:</dt>
                          <dd>{authResult.userData.email}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Birth Date:</dt>
                          <dd>{authResult.userData.birthDate}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Gender:</dt>
                          <dd>{authResult.userData.gender}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Medical Information
                      </h4>
                      <dl className="space-y-1">
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Blood Type:</dt>
                          <dd>{authResult.userData.bloodGroup}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Weight:</dt>
                          <dd>{authResult.userData.weight}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Height:</dt>
                          <dd>{authResult.userData.height}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-24 text-gray-600">Allergies:</dt>
                          <dd>{authResult.userData.allergies.join(', ')}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
