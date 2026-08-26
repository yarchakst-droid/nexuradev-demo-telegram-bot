interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
  themeParams: Record<string, string>;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
  };
  initDataUnsafe?: { user?: { first_name?: string } };
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp };
  }
}

export function getTelegram(): TelegramWebApp | null {
  return typeof window !== "undefined" ? window.Telegram?.WebApp ?? null : null;
}

export function initTelegram(): TelegramWebApp | null {
  const tg = getTelegram();
  if (!tg) return null;
  tg.ready();
  tg.expand();
  return tg;
}

export function hapticImpact(style: "light" | "medium" | "heavy" = "light"): void {
  getTelegram()?.HapticFeedback?.impactOccurred(style);
}

export function hapticSuccess(): void {
  getTelegram()?.HapticFeedback?.notificationOccurred("success");
}
