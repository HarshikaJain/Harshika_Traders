import React from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import Link from 'next/link';

// Fetch both targets safely in parallel
async function getHomeData() {
  const productQuery = `*[_type == "product"] | order(_createdAt desc) {
    _id, title, brand, category, slug, images, variants
  }`;
  
  const bannerQuery = `*[_type == "banner" && isActive == true] {
    _id,
    title,
    image,
    "slugPath": link->slug.current
  }`;

  const [products, banners] = await Promise.all([
    client.fetch(productQuery, {}, { cache: 'no-store' }),
    client.fetch(bannerQuery, {}, { cache: 'no-store' })
  ]);

  return { products, banners };
}

export default async function HomePage() {
  const { products, banners } = await getHomeData();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto">
      
      {/* Dynamic Banner Carousel/Stack Area */}
      {banners && banners.length > 0 && (
        <div className="mb-12 w-full flex flex-col gap-4">
          {banners.map((banner) => {
            const bannerContent = (
              <div className="w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 relative transition-transform duration-200 hover:scale-[1.01] shadow-sm">
                {/* Using object-contain and remove hardcoded heights 
                  so the image fits completely inside its frame without cropping
                */}
                <img 
                  src={urlFor(banner.image).url()} 
                  alt={banner.title || "Promo Banner"} 
                  className="w-full h-auto object-contain block mx-auto max-h-[400px]"
                />
                
                {/* Optional overlay title gradient only if a text title exists */}
                {banner.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-6">
                    <h2 className="text-white font-black text-lg md:text-2xl tracking-tight bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-xl">
                      {banner.title}
                    </h2>
                  </div>
                )}
              </div>
            );

            return banner.slugPath ? (
              <Link key={banner._id} href={`/products/${banner.slugPath}`}>
                {bannerContent}
              </Link>
            ) : (
              <div key={banner._id}>{bannerContent}</div>
            );
          })}
        </div>
      )}

      {/* Main Grid Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Latest Premium Devices
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Authorized tech configurations synced live with Harshika Traders database.
        </p>
      </div>

      {/* Product Map Stack (Unchanged, completely preserving existing view settings) */}
      {!products || products.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageAsset = product.images && product.images[0];
            const baseVariant = product.variants && product.variants[0];

            return (
              <div key={product._id} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div className="bg-white dark:bg-slate-900 rounded-xl aspect-square flex items-center justify-center p-6 mb-4 overflow-hidden relative">
                  {imageAsset ? (
                    <img src={urlFor(imageAsset).url()} alt={product.title} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-xs text-slate-400">No Image Provided</div>
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">{product.brand || "Brand"}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5 line-clamp-1">{product.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{product.category || "Mobile"}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {baseVariant?.price ? `₹${baseVariant.price.toLocaleString('en-IN')}` : 'TBD'}
                  </span>
                  {product.slug?.current && (
                    <Link href={`/products/${product.slug.current}`} className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs px-3 py-2 rounded-xl">
                      View Setup
                    </Link>
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