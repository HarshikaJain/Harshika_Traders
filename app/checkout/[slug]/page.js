"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Ratlam',
    pincode: ''
  });

  const variantIdx = parseInt(searchParams.get('variant') || '0', 10);
  const colorIdx = parseInt(searchParams.get('color') || '0', 10);

  useEffect(() => {
    if (!params?.slug) return;

    async function fetchCheckoutDetails() {
      const query = `*[_type == "product" && _id == $incomingId][0]{
        _id,
        title,
        brand,
        images,
        variants[]{
          configuration,
          price,
          colors[]{
            colorName,
            colorImages
          }
        }
      }`;

      try {
        const data = await client.fetch(query, { incomingId: params.slug });
        setProduct(data);
      } catch (err) {
        console.error("Checkout database fetch failed:", err);
      } finally {
        setFetching(false);
      }
    }

    fetchCheckoutDetails();
  }, [params]);

  const currentVariant = product?.variants?.[variantIdx] || product?.variants?.[0];
  const currentColor = currentVariant?.colors?.[colorIdx] || currentVariant?.colors?.[0];
  const finalPrice = currentVariant?.price || currentColor?.price || 0;

  let productImg = '/placeholder.jpg';
  if (currentColor?.colorImages?.[0]) {
    productImg = urlFor(currentColor.colorImages[0]);
  } else if (product?.images?.[0]) {
    productImg = urlFor(product.images[0]);
  }

  // Helper method to dynamically load Razorpay's Checkout script bundle
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Ensure the Razorpay script script element is properly mounted
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay Checkout SDK. Are you connected to the internet?");
      setLoading(false);
      return;
    }

    try {
      // 2. Call your existing app/api/razorpay-order/route.js backend
      const response = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: finalPrice }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Order token generation failed.");
      }

      // 3. Construct Razorpay's runtime gateway config
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Exposes test key to checkout client 
        amount: data.amount, // Set explicitly via your backend calculation
        currency: "INR",
        name: "Harshika Traders",
        description: `Checkout for ${product?.title || "Premium Unit"}`,
        order_id: data.orderId, // Links securely back to your verified internal tracking ID
        handler: function (paymentResponse) {
          alert(`Order Successfully Processed!\nPayment ID: ${paymentResponse.razorpay_payment_id}`);
          // Send user straight to their tracking space with data strings appended
          router.push(`/order-tracking?payment_id=${paymentResponse.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },
        theme: {
          color: "#2563eb", // Primary branding color hex matching tailwind's blue-600
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpayWindowInstance = new window.Razorpay(options);
      
      razorpayWindowInstance.on("payment.failed", function (failResponse) {
        console.error("Payment decline exception:", failResponse.error.description);
        alert(`Payment Failed: ${failResponse.error.description}`);
        setLoading(false);
      });

      // 4. Fire open the secure screen container
      razorpayWindowInstance.open();

    } catch (err) {
      console.error("Razorpay integration initialization crash:", err);
      alert(err.message || "Something went wrong structural wise initializing your checkouts.");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-400 font-bold tracking-widest animate-pulse">PREPARING SECURE CHECKOUT...</p>
      </div>
    );
  }

  const displayTitle = product?.title || "Premium Tech Unit";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 px-6 pb-20 transition-colors">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Shipping Form Context Layout Column */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">CHECKOUT</h1>
          <p className="text-slate-500 font-bold mb-10 uppercase tracking-widest text-xs">Shipping & Delivery</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Full Name *</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold text-sm"
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Your complete name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Phone Number *</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold text-sm"
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Contact mobile number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Delivery Address *</label>
              <textarea 
                required
                rows="3"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold text-sm resize-none"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Flat/House No., Colony, Street, Landmark"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">City</label>
                <input 
                  className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border-none text-slate-400 font-bold cursor-not-allowed text-sm"
                  type="text" value="Ratlam" disabled 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Pincode *</label>
                <input 
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-semibold text-sm"
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="457001"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Opening Gateway Container...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Order Sticky Card Column */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24 space-y-6">
          <h3 className="text-lg font-black tracking-tight border-b border-slate-100 dark:border-slate-800/80 pb-3">Order Summary</h3>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-2 flex items-center justify-center shrink-0 overflow-hidden">
              <img src={productImg} alt={displayTitle} className="max-h-full object-contain" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{displayTitle}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{product?.brand}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentVariant?.configuration && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {currentVariant.configuration}
                  </span>
                )}
                {currentColor?.colorName && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {currentColor.colorName}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Item Subtotal</span>
              <span>₹{finalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Express Delivery</span>
              <span className="text-green-500 font-extrabold tracking-wide">FREE</span>
            </div>
            <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
              <span className="text-sm font-black text-slate-800 dark:text-slate-200">Total Amount</span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}