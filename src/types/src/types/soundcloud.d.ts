interface SoundCloudWidget {
  toggle(): void;
  bind(event: string, callback: () => void): void;
}

interface SoundCloudWidgetConstructor {
  (iframe: HTMLElement): SoundCloudWidget;

  Events: {
    READY: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
  };
}

interface Window {
  SC: {
    Widget: SoundCloudWidgetConstructor;
  };
}