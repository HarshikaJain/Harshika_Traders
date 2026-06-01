"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getProductData(slug) {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/\s+/g, '-');
  
  const query = `*[_type == "product" && (slug.current == $slug || slug.current == $cleanSlug)][0]{
    title,
    brand,
    category,
    rating,
    images,
    variants[]{
      configuration,
      variantHighlights,
      colors[]{
        colorName,
        price,
        originalPrice,
        isAvailable,
        colorImages
      }
    }
  }`;
  return await client.fetch(query, { slug, cleanSlug });
}

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Checkout Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI Apps (GPay/PhonePe/Paytm)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FATHER_PHONE_NUMBER = "919893100789"; 

  useEffect(() => {
    async function init() {
      const resolvedParams = await params;
      const data = await getProductData(resolvedParams.slug);
      setProduct(data);
      setLoading(false);
    }
    init();
  }, [params]);

  if (loading) return <div className="pt-32 text-center text-slate-500 font-bold">Loading Storefront...</div>;
  
  if (!product) {
    return (
      <div className="pt-40 text-center max-w-md mx-auto px-4">
        <div className="text-red-500 font-black text-xl mb-2">Product Syncing...</div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Please click "Generate" on the Slug field inside Sanity Studio and hit "Publish".
        </p>
      </div>
    );
  }

  const currentVariant = product.variants?.[selectedVariantIdx] || null;
  const currentColor = currentVariant?.colors?.[selectedColorIdx] || currentVariant?.colors?.[0] || null;

  // FIXED: Removed the duplicate .url() chain method execution
  let displayImageSrc = null;
  if (currentColor?.colorImages?.[0]) {
    displayImageSrc = urlFor(currentColor.colorImages[0]);
  } else if (product.images?.[0]) {
    displayImageSrc = urlFor(product.images[0]);
  }

  const activeHighlights = currentVariant?.variantHighlights || [];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in all details to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerAddress,
          paymentMethod,
          productTitle: product.title.replace(/[()]/g, ''),
          productBrand: product.brand,
          variantConfig: currentVariant?.configuration || 'Standard',
          colorName: currentColor?.colorName?.trim() || 'Base',
          price: currentColor?.price || 0,
          fatherNumber: FATHER_PHONE_NUMBER
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsModalOpen(false);
        window.location.href = `/track/${data.trackingId}`;
      } else {
        alert(`Notification Pipeline Failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while communicating with notification servers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Canvas */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-100 dark:border-slate-800">
            {displayImageSrc ? (
              <img src={displayImageSrc} alt={product.title} className="max-h-full object-contain" />
            ) : (
              <div className="text-slate-400 font-medium">No Image Available</div>
            )}
          </div>
        </div>

        {/* Right Stack */}
        <div className="flex flex-col justify-start">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{product.brand}</span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1 mb-2">
            {product.title} {currentColor?.colorName ? `(${currentColor.colorName})` : ""}
          </h1>

          {currentColor && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">₹{currentColor.price.toLocaleString('en-IN')}</span>
              {currentColor.originalPrice && (
                <span className="text-base text-slate-400 dark:text-slate-500 line-through">₹{currentColor.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Variant Options:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedVariantIdx(idx); setSelectedColorIdx(0); }}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${selectedVariantIdx === idx ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}
                  >
                    {variant.configuration}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {currentVariant?.colors && currentVariant.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Selected Color: <span className="text-slate-800 dark:text-slate-200 font-medium">{currentColor?.colorName}</span></h3>
              <div className="flex gap-3">
                {currentVariant.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`p-1 rounded-xl border-2 transition-all ${selectedColorIdx === idx ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      {/* FIXED: Removed duplicate .url() from thumbnails as well */}
                      {color.colorImages?.[0] && <img src={urlFor(color.colorImages[0])} alt="" className="w-12 h-12 object-contain" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {activeHighlights.length > 0 && (
            <div className="mt-4 border-t border-slate-100 dark:border-slate-900 pt-6 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Product Highlights ({currentVariant?.configuration})</h3>
              <ul className="space-y-3">
                {activeHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={currentColor?.isAvailable === false}
              className={`w-full py-4 px-8 rounded-2xl font-black text-sm tracking-wide uppercase transition-all duration-200 shadow-xl shadow-blue-600/10 active:scale-[0.98] ${currentColor?.isAvailable === false ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {currentColor?.isAvailable === false ? 'Out of Stock' : 'Buy Now'}
            </button>
          </div>

        </div>
      </div>

      {/* Checkout Modal Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Secure Checkout</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
                <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter your name" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                <input required type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="98XXXXXXXX" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Delivery Address</label>
                <textarea required rows="3" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Enter full address with landmark..." className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Payment Options</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
                  <option value="UPI Apps (GPay/PhonePe/Paytm)">UPI Apps (GPay / PhonePe / Paytm)</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 disabled:bg-slate-400">
                  {isSubmitting ? 'Processing Automation...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}