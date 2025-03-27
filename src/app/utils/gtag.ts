// utils/gtag.ts

export const GA_TRACKING_ID = "G-S8GBJJ331E"; // Replace with your actual Measurement ID

// Safely trigger a pageview event
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.dataLayer) {
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
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      category,
      label,
      value,
    });
  }
};
