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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images Display */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-100 dark:border-slate-800">
            {product.images?.[0] && (
              <img 
                src={urlFor(product.images[0]).url()} 
                alt={product.title} 
                className="max-h-full object-contain" 
              />
            )}
          </div>
        </div>

        {/* Product Details Stack */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {product.brand}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {product.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Key Specifications:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">
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