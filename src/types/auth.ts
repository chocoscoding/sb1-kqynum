export interface PopupConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  gender?: string;
  bloodGroup?: string;
  weight?: string;
  height?: string;
  allergies?: string[];
}

export interface AuthResponse {
  accessToken: string;
  userData: UserData;
}

export interface SSOConfig extends PopupConfig {}