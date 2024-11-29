import React from 'react';
import { Heart } from 'lucide-react';
import { MicardSSO } from '../services/auth';

interface MicardButtonProps {
  clientId: string;
  redirectUri: string;
  scope?: string[];
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
}

export const MicardButton: React.FC<MicardButtonProps> = ({
  clientId,
  redirectUri,
  scope = ['basic_profile'],
  onSuccess,
  onError,
}) => {
  const handleLogin = async () => {
    try {
      const sso = MicardSSO.getInstance();
      sso.initialize({
        clientId,
        redirectUri,
        scope,
      });
      const response = await sso.login();
      onSuccess?.(response);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Heart className="w-5 h-5" />
      <span>Sign in with Micard</span>
    </button>
  );
};