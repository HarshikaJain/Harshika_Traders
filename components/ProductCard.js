"use client";
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity/lib/image';

export default function ProductCard({ product }) {
  // 1. Logic to handle the new Variants structure
  // We grab the first variant to show as the "default" on the card
  const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

  let imageUrl = '/placeholder.jpg';
  
  if (defaultVariant && defaultVariant.variantImage) {
    // Show image from the first variant
    try {
      imageUrl = urlFor(defaultVariant.variantImage).url();
    } catch (error) {
      console.error("Sanity Image Error:", error);
    }
  } else if (product.image) {
    // Fallback for old static images or top-level images
    imageUrl = typeof product.image === 'string' ? product.image : urlFor(product.image).url();
  }

  // 2. Logic to handle price from the variant
  const displayPrice = defaultVariant ? defaultVariant.price : (product.price || "Contact for Price");

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

        {/* Use _id for Sanity products. Using the slug or ID to link to detail page */}
        <Link href={`/products/${product._id || product.id}`}>
          <button className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}