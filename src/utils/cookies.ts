import Cookies from 'js-cookie';
import { UserData } from '../types/auth';

// Cookie configuration
const COOKIE_CONFIG = {
  expires: 7, // 7 days
  secure: true,
  sameSite: 'strict' as const,
  path: '/'
} as const;

// Cookie keys
const COOKIE_KEYS = {
  TOKEN: 'micard_token',
  USER: 'micard_user'
} as const;

export class CookieService {
  static setToken(token: string | null): void {
    if (!token) {
      this.removeToken();
      return;
    }
    Cookies.set(COOKIE_KEYS.TOKEN, token, COOKIE_CONFIG);
  }

  static getToken(): string | null {
    const token = Cookies.get(COOKIE_KEYS.TOKEN);
    return token || null;
  }

  static removeToken(): void {
    Cookies.remove(COOKIE_KEYS.TOKEN, { path: '/' });
  }

  static setUser(user: UserData | null): void {
    if (!user) {
      this.removeUser();
      return;
    }
    
    try {
      const userString = JSON.stringify(user);
      Cookies.set(COOKIE_KEYS.USER, userString, COOKIE_CONFIG);
    } catch (error) {
      console.error('Failed to serialize user data:', error);
      this.removeUser();
    }
  }

  static getUser(): UserData | null {
    try {
      const userString = Cookies.get(COOKIE_KEYS.USER);
      if (!userString) return null;
      
      const user = JSON.parse(userString) as UserData;
      return user;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      this.removeUser();
      return null;
    }
  }

  static removeUser(): void {
    Cookies.remove(COOKIE_KEYS.USER, { path: '/' });
  }

  static clearAll(): void {
    this.removeToken();
    this.removeUser();
  }
}