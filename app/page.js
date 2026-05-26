import React from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import Link from 'next/link';

async function getLatestProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    brand,
    category,
    slug,
    images,
    variants
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function HomePage() {
  const products = await getLatestProducts();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Latest Premium Devices
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Authorized tech configurations synced live with Harshika Traders database.
        </p>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // Safe image validation extraction
            const imageAsset = product.images && product.images[0];
            const baseVariant = product.variants && product.variants[0];

            return (
              <div key={product._id} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div className="bg-white dark:bg-slate-900 rounded-xl aspect-square flex items-center justify-center p-6 mb-4 overflow-hidden relative">
                  {imageAsset ? (
                    <img
                      src={urlFor(imageAsset).url()}
                      alt={product.title || "Product Image"}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-xs text-slate-400">No Image Provided</div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    {product.brand || "Brand"}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {product.category || "Mobile"}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {baseVariant?.price ? `₹${baseVariant.price.toLocaleString('en-IN')}` : 'TBD'}
                  </span>
                  {product.slug?.current ? (
                    <Link
                      href={`/products/${product.slug.current}`}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition-all"
                    >
                      View Setup
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400">Unavailable</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}