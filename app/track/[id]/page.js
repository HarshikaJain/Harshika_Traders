"use client";
import React from 'react';
import { useParams } from 'next/navigation';

export default function TrackingPage() {
  const { id } = useParams();

  // Simulated live fulfillment timeline steps
  const milestones = [
    { title: "Order Placed Successfully", time: "Just Now", desc: "Order details auto-forwarded to Harshika Traders management.", complete: true },
    { title: "Payment Verification", time: "Pending Review", desc: "Checking payment authorization token records.", complete: false },
    { title: "Package Handed to Logistics", time: "Awaiting Hub", desc: "Dispatch preparation at local sorting hub.", complete: false },
    { title: "Out For Delivery", time: "In Transit", desc: "Courier partner route assignment.", complete: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-40 px-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600">Store Shipment Tracker</span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1 mb-2">Tracking ID: {id}</h1>
        <p className="text-xs text-slate-400 mb-8">Both the shop manager and customer have been notified automatically via SMS/WhatsApp layers.</p>

        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8">
          {milestones.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              <span className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 ${
                step.complete 
                  ? 'bg-green-500 border-green-100 dark:border-green-950/60' 
                  : 'bg-slate-200 dark:bg-slate-800 border-white dark:border-slate-900'
              }`} />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={`text-sm font-black ${step.complete ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                  {step.title}
                </h3>
                <span className="text-xs font-bold text-slate-400 shrink-0">{step.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}