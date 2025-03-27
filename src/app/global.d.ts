// src/app/global.d.ts

declare global {
  interface Window {
    // Define dataLayer as an array of objects
    dataLayer: Record<string, any>[];
  }
}

// This file needs to be a module
export {};
