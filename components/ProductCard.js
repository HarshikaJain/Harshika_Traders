"use client";
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity/lib/image'; // Clean reference mapper for image stacks

export default function ProductCard({ product }) {
  if (!product) return null;

  // 1. Dynamic Image Logic - extracts image from the Sanity fields array or standalone fallback
  let imageUrl = '/placeholder.jpg';
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    try {
      imageUrl = urlFor(product.images[0]).url();
    } catch (error) {
      console.error("Sanity Images Array Fetching Error:", error);
    }
  } else if (product.image) {
    if (typeof product.image === 'string') {
      imageUrl = product.image;
    } else if (product.image.asset || product.image._ref) {
      try {
        imageUrl = urlFor(product.image).url();
      } catch (error) {
        console.error("Sanity Standalone Image Fetching Error:", error);
      }
    }
  }

  // 2. Dynamic Price Selection from multi-variant database blocks
  // Pulls the first variant's pricing if available, fallback to legacy base field or 0
  const firstVariant = product.variants && Array.isArray(product.variants) ? product.variants[0] : null;
  
  const displayPrice = firstVariant?.price || product.price || product.basePrice || 0;
  const originalPrice = firstVariant?.originalPrice || product.originalPrice;

  // 3. Fallback normalization across historical database fields mapping
  const productName = product.title || product.name || "Unnamed Product";
  const targetId = product.slug?.current || product._id || product.id;

  return (
    <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 group relative flex flex-col items-center justify-between w-full min-h-[480px]">
      
      {/* 1. New Arrival Decorative Badge Layout */}
      <div className="absolute top-6 left-6 px-3 py-1 bg-blue-50 rounded-full z-10 flex items-center justify-center">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
          New Arrival
        </span>
      </div>

      {/* 2. Embedded Real-time Rating Badge Condition */}
      {product.rating && (
        <div className="absolute top-6 right-6 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-0.5 shadow-xs">
          <span className="text-slate-800">{Number(product.rating).toFixed(1)}</span>
          <span className="text-emerald-600 text-[10px]">★</span>
        </div>
      )}

      {/* 3. Product Display Media Viewport */}
      <div className="relative h-56 w-full mb-6 mt-6 select-none flex items-center justify-center overflow-hidden">
        <img 
          src={imageUrl} 
          alt={productName}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* 4. Unified Text Metadata & Core Actions Wrapper */}
      <div className="text-center w-full flex flex-col items-center">
        
        {/* Bold Product Identifier with max-line clipping protection bounds */}
        <h3 className="font-bold text-slate-900 mb-2 text-xl tracking-tight leading-snug line-clamp-2 h-14 px-1">
          {productName}
        </h3>
        
        {/* Localized In-Rupees Financial Matrix */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl font-bold text-blue-600">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through font-medium">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* 5. Near-Black Rounded "VIEW DETAILS" Operational Action Button */}
        <Link href={`/products/${targetId}`} className="block w-full">
          <button className="w-full py-4 rounded-2xl bg-[#111827] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all duration-150 active:scale-95 shadow-md">
            View Details
          </button>
        </Link>
      </div>

    </div>
  );
}