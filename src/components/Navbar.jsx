// src/components/Navbar.jsx

"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCategories } from "@/lib/data";

// A simple SVG component for the search icon
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const categories = getCategories();
  const [currentDate, setCurrentDate] = useState('');
  
  // --- NEW: State to track if the nav bar should be sticky ---
  const [isSticky, setIsSticky] = useState(false);

  // Effect for setting the date (no changes here)
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);
  
  // --- NEW: Effect to handle scroll position ---
  useEffect(() => {
    const handleScroll = () => {
      // Use a scroll position (e.g., 80px) to trigger the sticky nav
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const navLinks = ["Home", ...categories];

  return (
    // The main header no longer needs to be sticky itself
    <header className="relative bg-white">
      {/* --- TOP BAR --- */}
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-3">
          <div className="flex items-center text-sm">
            <span>{currentDate}</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="font-extrabold text-5xl">Online Kanda</Link>
          </div>
          <div className="flex items-center">
            <Link href="/search" aria-label="Search page" className="p-2 rounded-full hover:bg-blue-700 transition-colors">
              <SearchIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR (MODIFIED) --- */}
      {/* This div is now conditionally styled to be sticky */}
      <div className={`
        border-b transition-all duration-300
        ${isSticky ? 'fixed top-0 left-0 right-0 z-40 shadow-lg bg-white' : 'relative bg-white'}
      `}>
        <nav className="container mx-auto flex justify-center items-center space-x-8 py-3">
          {navLinks.map((link) => {
            const href = link === "Home" ? "/" : `/${link.toLowerCase().replace(/ /g, '-')}`;
            const isActive = pathname === href;

            return (
              <Link
                key={link}
                href={href}
                className={`
                  text-gray-700 font-semibold uppercase tracking-wider text-sm pb-1
                  hover:text-blue-600 transition-colors
                  ${isActive ? "text-blue-600 border-b-2 border-blue-600" : ""}
                `}
              >
                {link}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}