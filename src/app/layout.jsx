import { Inter } from 'next/font/google'; // Import the font
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import './globals.css';
import Script from 'next/script';

// Configure the font
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "Online Kanda | Your Trusted News Source",
    template: "%s | Online Kanda",
  },
  description: "Your trusted source for timely and accurate news coverage from Nepal and around the world.",
};

export default function RootLayout({ children }) {
  return (
    // Add the font variable to the <html> tag
    <html lang="en" className={inter.className}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* Changed background to white for a cleaner look */}
      <body className="bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <main className="lg:col-span-2">
            {children}
          </main>
          <aside className="lg:col-span-1 hidden lg:block">
            <Sidebar />
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}