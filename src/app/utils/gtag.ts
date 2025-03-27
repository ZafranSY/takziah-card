// src/app/utils/gtag.ts
export const GA_TRACKING_ID = "G-S8GBJJ331E"; // Your Measurement ID

// Safely trigger a pageview event
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};

// Safely trigger a custom event
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};