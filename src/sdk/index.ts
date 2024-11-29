import { MicardPopup } from './popup';
import { JWTVerifier } from '../utils/jwt';

declare global {
  interface Window {
    MicardSSO: typeof MicardSSO;
  }
}

class MicardSSO {
  private popup: MicardPopup | null = null;
  private clientId: string;
  private jwtVerifier: JWTVerifier;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.jwtVerifier = new JWTVerifier();
  }

  async signIn(options: { scope?: string[] } = {}): Promise<any> {
    this.popup = new MicardPopup({
      clientId: this.clientId,
      scope: options.scope || ['basic_profile'],
    });

    const result = await this.popup.open();
    return result;
  }

  async verifyToken(token: string): Promise<boolean> {
    return this.jwtVerifier.verify(token);
  }
}

// Expose to window for script tag usage
window.MicardSSO = MicardSSO;

export default MicardSSO;