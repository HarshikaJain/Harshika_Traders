"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

// GROQ query focusing strictly on variants, titles, and dynamic image mappings
async function getProductData(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    brand,
    category,
    rating,
    images,
    variants[]{
      configuration,
      variantHighlights,
      colors[]{
        colorName,
        price,
        originalPrice,
        isAvailable,
        colorImages
      }
    }
  }`;
  return await client.fetch(query, { slug });
}

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const resolvedParams = await params;
      const data = await getProductData(resolvedParams.slug);
      setProduct(data);
      setLoading(false);
    }
    init();
  }, [params]);

  if (loading) return <div className="pt-32 text-center text-slate-500 font-bold">Loading Storefront...</div>;
  if (!product) return <div className="pt-32 text-center font-bold text-red-500">Product Not Found</div>;

  // Safe mapping resolution paths
  const currentVariant = product.variants?.[selectedVariantIdx] || null;
  const currentColor = currentVariant?.colors?.[selectedColorIdx] || currentVariant?.colors?.[0] || null;

  // Dynamic Image Logic: Uses nested color images first, falls back to parent product images array
  let displayImageSrc = null;
  if (currentColor?.colorImages?.[0]) {
    displayImageSrc = urlFor(currentColor.colorImages[0]).url();
  } else if (product.images?.[0]) {
    displayImageSrc = urlFor(product.images[0]).url();
  }

  // Highlights updates instantly depending on selected storage variant array values
  const activeHighlights = currentVariant?.variantHighlights || [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Hand: Image Asset Canvas Wrapper */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-100 dark:border-slate-800">
            {displayImageSrc ? (
              <img 
                src={displayImageSrc} 
                alt={product.title} 
                className="max-h-full object-contain transition-all duration-300" 
              />
            ) : (
              <div className="text-slate-400 font-medium">No Image Available</div>
            )}
          </div>
        </div>

        {/* Right Hand: Product Configurations Details Stack */}
        <div className="flex flex-col justify-start">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {product.brand}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1 mb-2">
            {product.title} {currentColor?.colorName ? `(${currentColor.colorName})` : ""}
          </h1>

          {/* Pricing Module updates live based on selected variant combinations */}
          {currentColor && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ₹{currentColor.price.toLocaleString('en-IN')}
              </span>
              {currentColor.originalPrice && (
                <span className="text-base text-slate-400 dark:text-slate-500 line-through">
                  ₹{currentColor.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          )}

          {/* Storage & RAM Options Controls */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Variant Options:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVariantIdx(idx);
                      setSelectedColorIdx(0); // Reset color index to 0 on storage swap
                    }}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      selectedVariantIdx === idx
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {variant.configuration}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nested Color Option Swatches - Only appears if structural data exists inside the active storage variant */}
          {currentVariant?.colors && currentVariant.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Selected Color: <span className="text-slate-800 dark:text-slate-200 font-medium">{currentColor?.colorName}</span>
              </h3>
              <div className="flex gap-3">
                {currentVariant.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`p-1 rounded-xl border-2 transition-all ${
                      selectedColorIdx === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      {color.colorImages?.[0] && (
                        <img 
                          src={urlFor(color.colorImages[0]).url()} 
                          alt="" 
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Highlights List - Filters and updates dynamically per chosen storage variant */}
          {activeHighlights.length > 0 && (
            <div className="mt-4 border-t border-slate-100 dark:border-slate-900 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Product Highlights ({currentVariant?.configuration})
              </h3>
              <ul className="space-y-3">
                {activeHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
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