"use client";
import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors pt-32">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-slate-900 py-16 px-6 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            GET IN TOUCH
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Have a question about a specific model or looking for a deal? Our team at Harshika Traders is here to help you find the perfect device.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Information */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Contact Details
            </h2>
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg">
                  📞
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Direct: 9893100789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg">
                  ✉️
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">Email Us</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">harshika.ratlam@gmail.com</p>
                </div>
              </div>

              {/* Physical Shop Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg">
                  📍
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">Visit Shop</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Harshika Traders, <br />
                    13, Stadium Market, Do Batti Road, <br />
                    Ratlam, Madhya Pradesh
                  </p>
                </div>
              </div>

              {/* Facebook Integration */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">Follow On Facebook</h4>
                  <a href="https://facebook.com/harshikatraders" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 block">
                    facebook.com/harshikatraders
                  </a>
                </div>
              </div>

              {/* Instagram Integration */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">Follow On Instagram</h4>
                  <a href="https://www.instagram.com/harshikatraders_mobile/" target="_blank" rel="noopener noreferrer" className="text-sm text-pink-600 dark:text-pink-400 hover:underline mt-1 block">
                    instagram.com/harshikatraders_mobile
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Opening Hours */}
          <div className="p-8 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
            <h3 className="font-black text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-widest">Shop Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Monday - Saturday</span>
                <span className="font-bold text-gray-900 dark:text-white">11:00 AM - 09:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Sunday</span>
                <span className="font-bold text-red-500 uppercase">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 ml-1">Subject</label>
              <div className="relative">
                <select className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Price Check</option>
                  <option>Availability Request</option>
                  <option>Business Partnership</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 ml-1">Message</label>
              <textarea 
                rows="5" 
                placeholder="How can we help you?" 
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
              ></textarea>
            </div>

            <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-widest text-sm">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}