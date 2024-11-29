export class PopupManager {
  private readonly DEFAULT_WIDTH = 500;
  private readonly DEFAULT_HEIGHT = 600;

  async requestPopupPermission(): Promise<void> {
    // This will trigger the browser's popup blocker if not triggered by a user action
    const testPopup = window.open('', '_blank', 'width=1,height=1');
    
    if (!testPopup) {
      throw new Error('Please allow popups for this site to continue with authentication');
    }
    
    testPopup.close();
  }

  openPopup(url: string): Window {
    const { width, height, left, top } = this.calculatePopupPosition();
    const features = this.buildPopupFeatures(width, height, left, top);

    const popup = window.open(url, 'MicardSSO', features);
    if (!popup) {
      throw new Error('Failed to open authentication popup');
    }

    return popup;
  }

  monitorPopup(popup: Window, onError: (error: Error) => void): () => void {
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        onError(new Error('Authentication cancelled'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }

  private calculatePopupPosition() {
    const width = this.DEFAULT_WIDTH;
    const height = this.DEFAULT_HEIGHT;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    return { width, height, left, top };
  }

  private buildPopupFeatures(width: number, height: number, left: number, top: number): string {
    return [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'status=yes',
      'location=yes'
    ].join(',');
  }
}