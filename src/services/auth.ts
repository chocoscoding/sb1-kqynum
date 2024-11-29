import { SSOConfig, AuthResponse, UserData } from '../types/auth';
import { MicardPopup } from './popup';
import { CookieService } from '../utils/cookies';
import { JWTService } from '../utils/jwt';

export class MicardSSO {
  private static instance: MicardSSO;
  private config: SSOConfig | null = null;
  private popup: MicardPopup | null = null;

  private constructor() {}

  static getInstance(): MicardSSO {
    if (!MicardSSO.instance) {
      MicardSSO.instance = new MicardSSO();
    }
    return MicardSSO.instance;
  }

  initialize(config: SSOConfig): void {
    this.config = config;
  }

  async login(): Promise<AuthResponse> {
    if (!this.config) {
      throw new Error('SSO not initialized');
    }

    this.popup = new MicardPopup({
      clientId: this.config.clientId,
      redirectUri: this.config.redirectUri,
      scope: this.config.scope,
    });

    try {
      const result = await this.popup.open();
      
      if (!result?.userData) {
        throw new Error('Invalid authentication response');
      }

      const token = await JWTService.createToken(result.userData);
      
      // Store user data and token
      CookieService.setUser(result.userData);
      CookieService.setToken(token);

      return {
        accessToken: token,
        userData: result.userData
      };
    } catch (error) {
      // Clean up any partial data on failure
      CookieService.clearAll();
      throw new Error('Authentication failed');
    }
  }

  logout(): void {
    CookieService.clearAll();
  }

  isAuthenticated(): boolean {
    const token = CookieService.getToken();
    return Boolean(token);
  }

  getCurrentUser(): UserData | null {
    return CookieService.getUser();
  }

  async verifyToken(): Promise<boolean> {
    const token = CookieService.getToken();
    if (!token) return false;

    try {
      await JWTService.verifyToken(token);
      return true;
    } catch {
      // Clear invalid token
      CookieService.clearAll();
      return false;
    }
  }
}