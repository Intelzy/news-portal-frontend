// src/components/Footer.jsx

"use client";

import Link from "next/link";
// --- NEW: Import icons from lucide-react ---
import { Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-blue-800 text-gray-200 pt-12 pb-6 mt-16">
      <div className="container mx-auto px-6">
        {/* --- Main Footer Section with Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Contact Info */}
          <div className="space-y-6 text-sm">
            <Link href="/" className="font-extrabold text-3xl text-white">
              Online Kanda
            </Link>
            <div className="space-y-2">
              <p className="font-semibold">News Portal Pvt. Ltd.</p>
              <p>Reg. No: 549 / 074-75</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Our Office</p>
              <p>Bharatpur-11, Chitwan, Nepal</p>
              <p>+977 01 4240505 / 4241389</p>
              <p>News: news@onlinekanda.com</p>
            </div>
          </div>
          
          {/* Column 2: Links */}
          <div className="space-y-6 text-sm">
            <h3 className="font-bold text-white uppercase tracking-wider">For Advertisements</h3>
            <div className="space-y-2">
              <p>+977 9851081116</p>
              <p>advertising@onlinekanda.com</p>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/about" className="hover:underline">About Us</Link>
              <Link href="/terms" className="hover:underline">Terms and Conditions</Link>
            </div>
          </div>
          
          {/* Column 3: Social Media & More Links */}
          <div className="space-y-6 text-sm">
            <h3 className="font-bold text-white uppercase tracking-wider">Social Media</h3>
            {/* --- MODIFIED: Using lucide-react icons --- */}
            <div className="flex flex-col space-y-3">
              <Link href="#" className="flex items-center space-x-3 hover:underline"><Facebook size={20} /> <span>Facebook</span></Link>
              <Link href="#" className="flex items-center space-x-3 hover:underline"><Twitter size={20} /> <span>Twitter</span></Link>
              <Link href="https://www.youtube.com/@rajivdhungana3403" className="flex items-center space-x-3 hover:underline"target="_blank" ><Youtube size={20} /> <span>Youtube</span></Link>
            </div>
            <h3 className="font-bold text-white uppercase tracking-wider pt-4">Our Team</h3>
             <div className="flex flex-col space-y-2">
                <Link href="/team" className="hover:underline">Meet the Team</Link>
             </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-blue-700 mt-12 pt-6 flex justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Online Kanda. All rights reserved.</p>
          <button onClick={handleBackToTop} className="flex items-center space-x-1 hover:underline">
            <span>Back to Top</span>
            {/* --- MODIFIED: Using lucide-react icon --- */}
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}