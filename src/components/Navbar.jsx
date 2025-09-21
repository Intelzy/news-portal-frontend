"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCategories } from "@/lib/data";
import { Search, X, Menu } from 'lucide-react'; // Import icons

export default function Navbar() {
  const pathname = usePathname();
  const categories = getCategories();
  const [currentDate, setCurrentDate] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  
  // --- NEW: State for mobile menu ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-US", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }));

    const handleScroll = () => {
      if (window.scrollY > 80) { setIsSticky(true); } 
      else { setIsSticky(false); }
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  const navLinks = ["Home", ...categories];

  return (
    <header className="relative bg-white">
      {/* --- TOP BAR --- */}
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          
          {/* --- NEW: Hamburger Button (Mobile Only) --- */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex items-center text-sm">
            <span>{currentDate}</span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="font-extrabold text-3xl sm:text-5xl">Online Kanda</Link>
          </div>

          <div className="flex items-center">
            <Link href="/search" aria-label="Search page" className="p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR (Desktop) --- */}
      <div className={`hidden lg:block border-b transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-40 shadow-lg bg-white' : 'relative bg-white'}`}>
        <nav className="container mx-auto flex justify-center items-center space-x-8 py-3">
          {navLinks.map((link) => {
            const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(/ /g, '-')}`;
            const isActive = pathname === href;
            return (
              <Link key={link} href={href} className={`text-gray-700 font-semibold uppercase tracking-wider text-sm pb-1 hover:text-blue-600 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                {link}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* --- NEW: MOBILE MENU (Dropdown) --- */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-white z-50 p-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="font-extrabold text-2xl text-blue-600">Online Kanda</Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(/ /g, '-')}`;
              return (
                <Link key={link} href={href} onClick={() => setIsMenuOpen(false)} className="text-gray-800 font-bold text-lg py-2 border-b">
                  {link}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}