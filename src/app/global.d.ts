declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[]; // Define it as an array of objects
  }
}
