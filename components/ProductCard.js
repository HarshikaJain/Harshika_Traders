"use client";
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity/lib/image';

export default function ProductCard({ product }) {
  // 1. Logic to handle both old static paths and new Sanity image objects
  let imageUrl = '/placeholder.jpg';
  
  if (product.image) {
    if (typeof product.image === 'string') {
      // Old static data (e.g., '/assets/iphone17pro.webp')
      imageUrl = product.image;
    } else if (product.image.asset || product.image._ref) {
      // New Sanity data
      try {
        imageUrl = urlFor(product.image).url();
      } catch (error) {
        console.error("Sanity Image Error:", error);
      }
    }
  }

  // 2. Logic to handle price field naming differences
  const displayPrice = product.price || product.basePrice;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 product-card-shadow hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900/30 transition-all group relative overflow-hidden">
      {/* Visual Badge */}
      <div className="absolute top-6 left-6 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full z-10">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">New Arrival</span>
      </div>

      <div className="relative h-64 mb-6 mt-4 select-none flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="text-center">
        <h3 className="font-black text-slate-900 dark:text-white mb-2 text-xl tracking-tight truncate">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{displayPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Use _id for Sanity products, or id for static products */}
        <Link href={`/products/${product._id || product.id}`}>
          <button className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}