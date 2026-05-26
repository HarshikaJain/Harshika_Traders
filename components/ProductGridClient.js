'use client';

import React from 'react';
import { urlFor } from '../sanity/lib/image';
import Link from 'next/link';

export default function ProductGridClient({ initialProducts }) {
  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No configurations uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {initialProducts.map((product) => {
        const primaryImage = product.images?.[0];
        const baseVariant = product.variants?.[0];

        return (
          <div 
            key={product._id} 
            className="group relative bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
          >
            {/* Image Wrap */}
            <div className="bg-white dark:bg-slate-900 rounded-xl aspect-square flex items-center justify-center p-6 mb-4 overflow-hidden relative">
              {primaryImage ? (
                <img
                  src={urlFor(primaryImage).url()}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="text-xs text-slate-400">No Image Available</div>
              )}
              
              <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                New Arrival
              </span>
            </div>

            {/* Meta Text Stack */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {product.brand}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Base: {baseVariant?.storage || 'Standard'} + {baseVariant?.ram || 'Standard'}
              </p>
            </div>

            {/* Lower Pricing & Action Row */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 text-lg">
                  ₹{baseVariant?.price?.toLocaleString('en-IN') || 'TBD'}
                </span>
              </div>
              
              {product.slug?.current && (
                <Link
                  href={`/products/${product.slug.current}`}
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition-all"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}