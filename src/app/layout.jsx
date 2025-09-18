// src/app/layout.jsx

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import Script from 'next/script';

// --- UPDATED METADATA ---
export const metadata = {
  // --- Title for browser tabs and search results ---
  title: {
    default: "Online Kanda | Your Trusted News Source from Nepal",
    template: "%s | Online Kanda", // %s will be replaced by the page's specific title
  },
  // --- Description for search engine results ---
  description: "Your trusted source for timely and accurate news coverage, with a special focus on Nepal, Bharatpur, and relevant global affairs.",
  keywords: ["Nepal News", "Online Kanda", "Bharatpur", "Chitwan", "Nepali Politics", "Sports", "Economy"],
  
  // --- Open Graph (for Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: "Online Kanda | Your Trusted News Source",
    description: "Breaking news, in-depth analysis, and stories from Nepal and around the world.",
    url: "https://yourwebsite.com", // TODO: Replace with your actual domain
    siteName: "Online Kanda",
    images: [
      {
        url: "/images/og-image.png", // Recommended: 1200x630px
        width: 1200,
        height: 630,
        alt: "Online Kanda Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: "Online Kanda | Your Trusted News Source",
    description: "Breaking news, in-depth analysis, and stories from Nepal and around the world.",
    // TODO: Add your Twitter handle if you have one
    // creator: "@yourtwitterhandle", 
    images: ["/images/og-image.png"], // Must be an absolute URL in production
  },

  // --- Favicon and App Icons ---
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874560417184600"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-4 md:p-6 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}