"use client";
import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors select-none">
      {/* Header Section */}
      <div className="bg-slate-900 dark:bg-black py-24 px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Our Identity</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Harshika Traders is Ratlam's leading authorized destination for premium mobile and computing technology.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-xl">
            <img src="/assets/ht_logo.jpg" className="rounded-[2.5rem] w-full" alt="Store Logo" />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Since 2011</h2>
              <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Quality Meets Trust</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              At Harshika Traders, we believe technology should be accessible and authentic. As an authorized retailer for brands like Apple, Samsung, and Oppo, we guarantee 100% genuine products with official warranties. 
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-3xl font-black text-gray-900 dark:text-white">100%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Genuine Products</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-gray-900 dark:text-white">Ratlam</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}