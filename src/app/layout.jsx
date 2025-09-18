import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import Script from 'next/script'; // Import the Script component

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874560417184600"
     crossorigin="anonymous">
     </script>
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