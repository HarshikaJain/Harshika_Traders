'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function TrackingContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    if (paymentId) {
      supabase.from('orders').select('*').eq('razorpay_payment_id', paymentId).single()
        .then(({ data }) => { setOrder(data); setLoading(false); });
    }
  }, [paymentId]);

  if (loading) return <div className="text-center pt-32">Loading...</div>;
  if (!order) return <div className="text-center pt-32">Order not found.</div>;

  const currentStepIndex = steps.indexOf(order.status || 'Confirmed');

  return (
    <main className="min-h-screen bg-slate-50 pt-32 px-6 pb-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h1 className="text-xl font-black mb-6">ORDER DETAILS</h1>
        <div className="bg-slate-50 p-4 rounded-xl mb-8 text-sm">
          <p className="font-bold">{order.product_name}</p>
          <p className="text-slate-500 mt-1">Booked at: {new Date(order.created_at).toLocaleString()}</p>
        </div>

        <h2 className="text-lg font-black mb-6">TRACKING STATUS</h2>
        <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            return (
              <div key={step} className="relative pl-8">
                {/* Green Circle Indicator */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}`}>
                  {isCompleted && <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
                </div>
                <div className={isCompleted ? 'text-green-600 font-bold' : 'text-slate-400'}>
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function OrderTrackingPage() {
  return <Suspense><TrackingContent /></Suspense>;
}