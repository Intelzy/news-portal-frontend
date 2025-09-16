import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: {
    default: "Online Kanda | Your Source for Daily News",
    template: "%s | Online Kanda",
  },
  description: "Stay informed with Online Kanda, your trusted source for the latest news, in-depth analysis, and comprehensive coverage of local and global events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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