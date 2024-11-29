export class MicardPopup {
  private config: {
    clientId: string;
    scope: string[];
  };

  constructor(config: { clientId: string; scope: string[] }) {
    this.config = config;
  }

  open(): Promise<any> {
    return new Promise((resolve, reject) => {
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        this.getAuthUrl(),
        'MicardSSO',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        reject(new Error('Popup blocked'));
        return;
      }

      window.addEventListener('message', (event) => {
        if (event.origin !== 'https://auth.micard.healthcare') return;
        if (event.data.type === 'MICARD_AUTH_SUCCESS') {
          popup.close();
          resolve(event.data.payload);
        }
      });
    });
  }

  private getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      scope: this.config.scope.join(' '),
      response_type: 'token',
      redirect_uri: `${window.location.origin}/callback`,
    });

    return `https://auth.micard.healthcare/authorize?${params.toString()}`;
  }
}