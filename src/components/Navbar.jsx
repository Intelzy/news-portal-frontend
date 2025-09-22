// src/components/Navbar.jsx

"use client";

import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, UserCircle2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- States for Authentication ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  // This effect runs on the client-side to check localStorage and set the clock
  useEffect(() => {
    // Check login status and get user data
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      const userDataString = localStorage.getItem('userCredentials');
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      }
    }

    // Live clock logic
    const updateTime = () => {
      const date = new Date();
      const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kathmandu' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kathmandu' };
      const dateString = date.toLocaleDateString("en-US", dateOptions);
      const timeString = date.toLocaleTimeString("en-US", timeOptions);
      setCurrentTime(`${dateString} ${timeString}`);
    };
    updateTime(); // Set time immediately
    const timer = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userCredentials');
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileMenuOpen(false);
    alert("You have been logged out.");
    router.push('/');
    router.refresh();
  };

  const mainNavLinks = [
    { title: 'Home', href: '/' },
    { title: 'Politics', href: '/politics' },
    { title: 'Sports', href: '/sports' },
    { title: 'Economy', href: '/economy' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Left Side: Logo and Date */}
          <Link href="/" className="flex flex-col">
            <h1 className="font-extrabold text-3xl">
              <span>Online</span><span className="text-red-500">Kanda</span>
            </h1>
            <p className="text-xs text-gray-300">{currentTime}</p>
          </Link>

          {/* Right Side: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.title} href={link.href} className={`font-semibold px-3 py-2 rounded-md transition-colors text-sm uppercase ${isActive ? "bg-blue-700" : "hover:bg-blue-700"}`}>
                  {link.title}
                </Link>
              );
            })}
            <Link href="/news" className="font-semibold px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-sm uppercase">View All News</Link>
            <Link href="/search" className="p-2 hover:bg-blue-700 rounded-full transition-colors"><Search size={22} /></Link>
            
            {/* --- DYNAMIC AUTH SECTION --- */}
            {isLoggedIn && user ? (
              // --- LOGGED-IN VIEW ---
              <div className="relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded-full transition-colors">
                  <span className="text-sm font-semibold hidden sm:block">Welcome, {user.name}</span>
                  <UserCircle2 size={24} />
                </button>
                {isProfileMenuOpen && (
                  <div onMouseLeave={() => setIsProfileMenuOpen(false)} className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg text-black">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // --- LOGGED-OUT VIEW ---
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold hover:bg-blue-700 rounded-md">Login</Link>
                <Link href="/signup" className="px-4 py-2 text-sm font-semibold bg-white text-blue-800 hover:bg-gray-200 rounded-md">Sign up</Link>
              </>
            )}
          </nav>
          
          {/* Hamburger Button (Mobile) */}
          <div className="lg:hidden"><button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu"><Menu className="w-6 h-6" /></button></div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-2xl text-blue-700">Online Kanda</Link>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu"><X className="w-6 h-6 text-gray-800" /></button>
          </div>
          <nav className="flex flex-col space-y-2 text-gray-800">
             {[...mainNavLinks, {title: "View All News", href: "/news"}, {title: "Search", href: "/search"}].map((link) => (
              <Link key={link.title} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg py-3 border-b">{link.title}</Link>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t">
            {isLoggedIn && user ? (
               <div className="text-gray-800">
                <div className="px-2 py-2 border-b"><p className="text-sm">Welcome, {user.name}</p></div>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold py-3">My Profile</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left font-semibold py-3 text-red-600">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-sm font-semibold rounded-md border">Login</Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
