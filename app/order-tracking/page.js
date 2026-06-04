"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id') || 'MOCK_PAYMENT_ID';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center pt-24 px-6 pb-20 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-6">
        
        {/* Animated Success Checkmark */}
        <div className="mx-auto w-20 h-20 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center text-green-500 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">ORDER CONFIRMED!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Thank you for shopping with Harshika Traders. Your payment was processed successfully.
          </p>
        </div>

        {/* Transaction Receipt Box */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 text-left border border-slate-100 dark:border-slate-800/50 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Status</span>
            <span className="text-green-500 font-black">Paid</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider items-center">
            <span>Payment ID</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px] select-all bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {paymentId}
            </span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Delivery City</span>
            <span className="text-slate-700 dark:text-slate-300">Ratlam</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}

// Next.js App Router requires Suspense for hook segments like useSearchParams
export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-400 font-bold tracking-widest animate-pulse">LOADING RECEIPT...</p>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}