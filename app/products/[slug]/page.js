import React from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

async function getProductData(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    brand,
    category,
    description,
    rating,
    images,
    variants,
    highlights
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export default async function ProductPage({ params }) {
  // Await params safely to support Next.js 15+ dynamic routing
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = await getProductData(slug);

  if (!product) {
    return (
      <div className="pt-32 text-center font-bold text-red-500">
        Product Not Found
      </div>
    );
  }

  // Fallback to the first available hardware specification package for basic pricing view
  const activeVariant = product.variants?.[0];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Hand: High-Res Layout Image Canvas */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-100 dark:border-slate-800">
            {product.images?.[0] && (
              <img 
                src={urlFor(product.images[0]).url()} 
                alt={product.title} 
                className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
              />
            )}
          </div>
        </div>

        {/* Right Hand: Core Product Metadata Stack */}
        <div className="flex flex-col justify-start">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {product.brand}
          </span>
          
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1 mb-3 tracking-tight">
            {product.title}
          </h1>

          {/* Price Component pulled live from active variants mapping */}
          {activeVariant && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ₹{activeVariant.price.toLocaleString('en-IN')}
              </span>
              {activeVariant.originalPrice && (
                <span className="text-base text-slate-400 dark:text-slate-500 line-through">
                  ₹{activeVariant.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          )}

          <hr className="border-slate-100 dark:border-slate-900 mb-6" />

          {/* Content Description Workspace */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Overview
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
              {product.description || "No item summary data currently provided for this hardware build."}
            </p>
          </div>

          {/* Storage & Memory Configuration Badges */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Memory Configurations
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <div 
                    key={idx}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200`}
                  >
                    {variant.configuration}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications Highlights Grid */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-2 border-t border-slate-100 dark:border-slate-900 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Key Specifications
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}