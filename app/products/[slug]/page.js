"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive client states
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // 1. Unwrap the async params object safely
  useEffect(() => {
    params.then((res) => setUnwrappedParams(res));
  }, [params]);

  // 2. Fetch the product details with client configuration live
  useEffect(() => {
    if (!unwrappedParams?.slug) return;

    async function fetchDetails() {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        category,
        brand,
        images,
        rating,
        description,
        variants[]{
          configuration,
          price,
          originalPrice,
          isAvailable
        },
        colors[]{
          colorName,
          hexCode
        },
        highlights
      }`;

      try {
        const data = await client.fetch(query, { slug: unwrappedParams.slug });
        setProduct(data);
      } catch (err) {
        console.error("Detail Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-slate-400 font-bold tracking-wider animate-pulse">LOADING PREMIUM TECH...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <h1 className="text-xl font-bold text-slate-500">Product Not Found</h1>
      </div>
    );
  }

  // Safe data evaluations
  const displayTitle = product.title || "Premium Model";
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIdx];
  
  const images = product.images || [];
  const activeImageUrl = images[selectedImageIdx] ? urlFor(images[selectedImageIdx]).url() : '/placeholder.jpg';

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-24 px-6 pb-20 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Image Stack and Thumbnails View */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 flex items-center justify-center border border-slate-100 dark:border-slate-800 aspect-square relative">
            <img 
              src={activeImageUrl} 
              alt={displayTitle} 
              className="max-h-[420px] max-w-full object-contain transition-all duration-300"
            />
          </div>

          {/* Dynamic Image Thumbnails Navigation Stack */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border transition-all flex items-center justify-center overflow-hidden ${
                    selectedImageIdx === idx 
                      ? 'border-blue-600 ring-2 ring-blue-600/20' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <img src={urlFor(img).url()} alt="" className="max-h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Data Formats & Option Controls */}
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-3">
            {product.brand || "Premium"} / {product.category}
          </span>
          
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            {displayTitle}
          </h1>
          
          {/* Reactive Price Rendering Block */}
          <div className="flex items-baseline space-x-4 mb-4">
            <p className="text-4xl font-black text-slate-900 dark:text-white transition-all">
              ₹{currentVariant?.price ? currentVariant.price.toLocaleString('en-IN') : "Contact Store"}
            </p>
            {currentVariant?.originalPrice && (
              <p className="text-xl text-slate-400 line-through">
                ₹{currentVariant.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>

          {/* Product Description Prose Block */}
          {product.description && (
            <div className="prose dark:prose-invert mb-6">
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          )}

          {/* Interactive Storage and RAM Selection Grid */}
          {variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Storage & RAM Options:</p>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((v, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedVariantIdx(i)}
                    className={`px-5 py-3 rounded-xl text-xs font-black border uppercase tracking-wider transition-all duration-200 ${
                      selectedVariantIdx === i 
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-sm shadow-blue-500/10' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {v.configuration}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Features / Bullet Highlights List */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Specifications:</p>
              <ul className="space-y-2.5">
                {product.highlights.map((item, idx) => (
                  <li key={idx} className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-start">
                    <span className="text-blue-500 mr-2.5 mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Checkout Redirection Trigger */}
          <Link href={`/checkout/${product._id}?variant=${selectedVariantIdx}`}>
            <button className="w-full md:w-max px-14 py-5 rounded-2xl bg-slate-950 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95">
              Buy Now
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}