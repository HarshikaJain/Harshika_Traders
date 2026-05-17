import React from 'react';
import { brands } from '../constants/productData';

export default function BrandMarquee() {
  return (
    <div className="flex justify-center flex-wrap gap-8 md:gap-14 py-12 px-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      {brands.map((brand) => (
        <span 
          key={brand} 
          className="font-black text-gray-300 dark:text-slate-700 hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer text-sm tracking-[0.3em] transition-all select-none uppercase"
        >
          {brand}
        </span>
      ))}
    </div>
  );
}