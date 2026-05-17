"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function CheckoutPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Ratlam',
    pincode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // This is where you would normally trigger Razorpay or Stripe
    // For now, we simulate the redirect
    setTimeout(() => {
      alert(`Order Placed for ${formData.fullName}!\nRedirecting to secure payment gateway...`);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">CHECKOUT</h1>
          <p className="text-slate-500 font-bold mb-10 uppercase tracking-widest text-xs">Shipping & Payment</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Full Name</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold"
                  type="text" 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Phone Number</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold"
                  type="tel" 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Delivery Address</label>
              <textarea 
                required
                rows="3"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">City</label>
                <input 
                  className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-slate-400 font-semibold cursor-not-allowed"
                  type="text" value="Ratlam" disabled 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Pincode</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold"
                  type="text"
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-8">
              <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}