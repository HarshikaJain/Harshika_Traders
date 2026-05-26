"use client";
import React from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import Link from 'next/link';

// Fetch products with deep nested structures
async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    brand,
    category,
    slug,
    colors[]{
      images,
      variants[]{
        price,
        originalPrice
      }
    }
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Latest Premium Devices
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Authorized tech configurations synced live with Harshika Traders database.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            // Extract baseline parameters safely across multi-nested variants
            const firstColorBlock = product.colors?.[0] || {};
            const firstImage = firstColorBlock.images?.[0];
            const firstVariant = firstColorBlock.variants?.[0] || {};
            
            const displayImageUrl = firstImage ? urlFor(firstImage).url() : '/placeholder.jpg';
            const displayPrice = firstVariant.price ? `₹${firstVariant.price.toLocaleString('en-IN')}` : 'View Setup';

            return (
              <Link 
                href={`/products/${product.slug?.current}`} 
                key={product._id} 
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Product Image Wrapper */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center p-6 aspect-square overflow-hidden border border-slate-100/50 dark:border-slate-900 relative">
                  <img 
                    src={displayImageUrl} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                {/* Info block */}
                <div className="mt-4 flex flex-col flex-grow">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {product.brand}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {product.category}
                  </p>
                  
                  {/* Dynamic Pricing Footprint */}
                  <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between">
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {displayPrice}
                    </span>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}