"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const categories = [
    "Mobile", "TV", "AC", "Cooler", "Bluetooth devices", "Watch", "Hp laptop"
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact Us', href: '/contactus' }
  ];

  return (
    <nav className="glass-effect sticky top-0 z-[200] w-full border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SECTION: MENU & LOGO */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-900 dark:text-white text-2xl hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            ☰
          </button>

          <Link href="/" className="flex items-center shrink-0 active:scale-95 transition-transform">
            <img src="/assets/ht_logo.jpg" alt="HT" className="h-10 w-auto object-contain" />
            <div className="flex flex-col ml-3">
              <span className="text-lg font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">Harshika Traders</span>
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">Ratlam’s Premier</span>
            </div>
          </Link>
        </div>

        {/* RIGHT SECTION: NAV LINKS + SEARCH (Minimized Space) */}
        <div className="flex items-center gap-6"> 
          {/* Changed 'justify-between' to grouping them here with a 'gap-6' */}
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-black text-slate-500 dark:text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar Container */}
          <div className="relative flex items-center">
            <div className={`flex items-center transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-48 md:w-56 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl text-sm outline-none focus:border-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY DROPDOWN MENU */}
      <div className={`absolute top-full left-6 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">
          Product Categories
        </p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${encodeURIComponent(cat)}`}
              onClick={() => setIsMenuOpen(false)} 
              className="text-left py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 font-black text-sm transition-all hover:text-blue-600 hover:pl-6"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}