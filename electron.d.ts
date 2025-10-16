/// <reference types="vite/client" />

interface Window {
  electron?: {
    getAppPath: () => Promise<string>;
  };
}
