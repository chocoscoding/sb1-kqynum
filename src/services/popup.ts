import { PopupConfig, AuthResponse } from '../types/auth';
import { PopupManager } from '../utils/PopupManager';

export class MicardPopup {
  private config: PopupConfig;
  private popupManager: PopupManager;

  constructor(config: PopupConfig) {
    this.config = config;
    this.popupManager = new PopupManager();
  }

  async open(): Promise<AuthResponse> {
    const mockAuthUrl = this.buildAuthUrl();
    
    try {
      await this.popupManager.requestPopupPermission();
      const popup = this.popupManager.openPopup(mockAuthUrl);
      return await this.handleAuthentication(popup);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Authentication failed');
    }
  }

  private buildAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: encodeURIComponent(this.config.redirectUri),
      scope: this.config.scope.join(' ')
    });

    return `${window.location.origin}/auth-popup?${params.toString()}`;
  }

  private handleAuthentication(popup: Window): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const cleanup = this.popupManager.monitorPopup(popup, reject);

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data.type !== 'MICARD_AUTH_SUCCESS') return;

        cleanup();
        window.removeEventListener('message', handleMessage);
        popup.close();
        
        resolve(event.data.payload);
      };

      window.addEventListener('message', handleMessage);
    });
  }
}