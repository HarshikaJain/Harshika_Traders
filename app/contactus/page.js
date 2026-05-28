"use client";
import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact Our Team
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Have questions about configurations? Get in touch with Harshika Traders.
        </p>
      </div>

      {/* Form Container Container */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 max-w-xl">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Full Name
            </label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="name@domain.com" 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Message
            </label>
            <textarea 
              rows={4} 
              placeholder="How can we help you setup your device?" 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm py-3 rounded-xl transition-colors duration-150"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}