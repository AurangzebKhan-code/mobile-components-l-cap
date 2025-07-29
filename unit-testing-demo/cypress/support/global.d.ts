declare global {
  interface Window {
    __DEV__: boolean;
    global: Window & typeof globalThis;
  }
}

export {};