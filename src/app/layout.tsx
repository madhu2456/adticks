import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Adticks",
  title: "Adticks | AI Visibility Tracking and Technical SEO Measurement",
  description:
    "Measure AI search visibility, GEO, AEO, LLM citations, AI crawler access, technical SEO health, JavaScript rendering, content quality, and competitive gaps.",
  keywords: [
    "AI visibility tracking",
    "AI search visibility",
    "GEO platform",
    "answer engine optimization",
    "LLM visibility tracking",
    "AI citation tracking",
    "technical SEO audit",
    "AI crawler audit",
    "JavaScript SEO audit",
    "Core Web Vitals audit",
    "internal linking analysis",
    "content gap analysis",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Adticks",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#05070a",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
