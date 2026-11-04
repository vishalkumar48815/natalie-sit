import localFont from "next/font/local";

/** Self-hosted fonts: no runtime request to Google, zero layout shift. */
export const jakarta = localFont({
  src: [
    { path: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/plus-jakarta-sans-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const allura = localFont({
  src: "../fonts/allura-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});
