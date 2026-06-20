import React from 'react';
import Link from 'next/link';
import { urlFor } from '../sanity/lib/image';

export default function ProductCard({ product }) {
  const displayTitle = product.title || "Premium Device";

  // Now 'mainImage' is GUARANTEED to be a simple string (URL)
  const mainImage = (product.images && product.images[0]) 
    ? urlFor(product.images[0]) 
    : "/assets/placeholder.jpg";

  const firstVariant = product.variants && product.variants[0];
  const displayPrice = firstVariant && firstVariant.price 
    ? firstVariant.price 
    : "Contact For Price";

  const productLink = product.slug?.current 
    ? `/products/${product.slug.current}` 
    : '#';

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
      <div>
        <div className="relative aspect-square w-full rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center p-6">
          <img 
            src={mainImage} 
            alt={displayTitle}
            className="max-h-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            New Arrival
          </span>
        </div>

        <div className="mt-5 space-y-2 px-1">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors line-clamp-1">
            {displayTitle}
          </h3>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-50 dark:border-slate-800/50 px-1">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xl font-black text-blue-600 dark:text-blue-400">
            {typeof displayPrice === 'number' ? `₹${displayPrice.toLocaleString('en-IN')}` : displayPrice}
          </span>
        </div>

        <Link href={productLink} className="block w-full text-center text-xs font-bold bg-slate-950 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors tracking-wide uppercase">
          View Details
        </Link>
      </div>
    </div>
  );
}