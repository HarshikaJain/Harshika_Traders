"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getProductData(slug) {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/\s+/g, '-');
  const query = `*[_type == "product" && (slug.current == $slug || slug.current == $cleanSlug)][0]{
    title, brand, category, rating, images,
    variants[]{
      configuration, variantHighlights,
      colors[]{ colorName, price, originalPrice, isAvailable, colorImages }
    }
  }`;
  return await client.fetch(query, { slug, cleanSlug });
}

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI Apps (GPay/PhonePe/Paytm)');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  if (!product) return <div className="pt-40 text-center font-bold text-red-500">Product Not Found.</div>;

  const currentVariant = product.variants?.[selectedVariantIdx] || null;
  const currentColor = currentVariant?.colors?.[selectedColorIdx] || currentVariant?.colors?.[0] || null;

  // SAFE IMAGE RESOLUTION
  let displayImageSrc = null;
  if (currentColor?.colorImages?.[0]) {
    displayImageSrc = urlFor(currentColor.colorImages[0]).url();
  } else if (product.images?.[0]) {
    displayImageSrc = urlFor(product.images[0]).url();
  }

  const activeHighlights = currentVariant?.variantHighlights || [];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return alert("Please fill in all details.");
    setIsSubmitting(true);
    // ... (Keep your existing sendOrderToBackend and Razorpay logic here)
    alert("Order processing initiated..."); 
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-slate-50 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-100">
          {displayImageSrc ? (
            <img src={displayImageSrc} alt={product.title} className="max-h-full object-contain" />
          ) : (
            <div className="text-slate-400 font-medium text-center">No Image Provided</div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-black uppercase text-blue-600">{product.brand}</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1 mb-2">{product.title}</h1>

          {currentColor && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-slate-900">₹{currentColor.price?.toLocaleString('en-IN')}</span>
              {currentColor.originalPrice > currentColor.price && (
                <span className="text-base text-slate-400 line-through">₹{currentColor.originalPrice?.toLocaleString('en-IN')}</span>
              )}
            </div>
          )}

          {/* Variants and Highlights UI logic remains here... */}
          <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black">Buy Now</button>
        </div>
      </div>
    </div>
  );
}