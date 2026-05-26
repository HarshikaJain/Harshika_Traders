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
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // 1. Unwrap the async params object safely
  useEffect(() => {
    params.then((res) => setUnwrappedParams(res));
  }, [params]);

  // 2. Fetch the updated nested data structure from Sanity
  useEffect(() => {
    if (!unwrappedParams?.slug) return;

    async function fetchDetails() {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        category,
        brand,
        description,
        rating,
        colors[]{
          colorName,
          hexCode,
          images,
          variants[]{
            configuration,
            price,
            originalPrice,
            isAvailable,
            specialFeatures
          }
        }
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

  // 3. Reset variant and image indices when switching colors to prevent crashes
  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedImageIdx(0);
  }, [selectedColorIdx]);

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

  // --- Dynamic State Evaluation Engine ---
  const displayTitle = product.title || "Premium Model";
  const colors = product.colors || [];
  
  // Extract active color data block safely
  const currentColorData = colors[selectedColorIdx] || {};
  
  // Extract images specific to this color block
  const images = currentColorData.images || [];
  const activeImageUrl = images[selectedImageIdx] ? urlFor(images[selectedImageIdx]).url() : '/placeholder.jpg';
  
  // Extract hardware configurations specific to this color block
  const variants = currentColorData.variants || [];
  const currentVariant = variants[selectedVariantIdx] || {};
  
  // Extract custom highlights specific to this selection
  const specialFeatures = currentVariant.specialFeatures || [];

  // Gallery Navigation Controls
  const handlePrevImage = () => {
    if (images.length === 0) return;
    setSelectedImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (images.length === 0) return;
    setSelectedImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  console.log("LOGGED PRODUCT DATA:", product);
  
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-24 px-6 pb-20 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Color-specific Image Stack */}
        <div className="space-y-4 md:sticky top-24">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 flex items-center justify-center border border-slate-100 dark:border-slate-800 aspect-square relative group">
            
            <img 
              src={activeImageUrl} 
              alt={`${displayTitle} - ${currentColorData.colorName}`} 
              className="max-h-[420px] max-w-full object-contain transition-all duration-300"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md font-black border border-slate-200 dark:border-slate-700 transition-all active:scale-90 select-none z-10"
                  aria-label="Previous Image"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md font-black border border-slate-200 dark:border-slate-700 transition-all active:scale-90 select-none z-10"
                  aria-label="Next Image"
                >
                  &gt;
                </button>
              </>
            )}
          </div>

          {/* Color-specific Thumbnails View */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border transition-all flex items-center justify-center shrink-0 overflow-hidden ${
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

        {/* Right Column: Dynamic Specifications Controls */}
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-3">
            {product.brand || "Premium"} / {product.category}
          </span>
          
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            {displayTitle}
          </h1>
          
          {/* Dynamic Variant Pricing */}
          <div className="flex items-baseline space-x-4 mb-4">
            <p className="text-4xl font-black text-slate-900 dark:text-white transition-all">
              ₹{currentVariant.price ? currentVariant.price.toLocaleString('en-IN') : "Contact Store"}
            </p>
            {currentVariant.originalPrice && (
              <p className="text-xl text-slate-400 line-through">
                ₹{currentVariant.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>

          {product.description && (
            <div className="prose dark:prose-invert mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          )}

          {/* Color Selection Buttons */}
          {colors.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Available Colors:</p>
              <div className="flex flex-wrap gap-4 items-center">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColorIdx(i)}
                    title={color.colorName}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                      selectedColorIdx === i 
                        ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800' 
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-inner" 
                      style={{ backgroundColor: color.hexCode || '#ccc' }}
                    />
                    <span className="text-slate-700 dark:text-slate-300">{color.colorName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage and RAM Options Grid for Selected Color */}
          {variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Storage & RAM Options for this Color:</p>
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

          {/* Dynamic Highlights Specific to Configuration Selection */}
          {specialFeatures.length > 0 && (
            <div className="mb-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-4">
                Product highlights
              </h3>
              
              <div className="space-y-4">
                {specialFeatures.map((item, idx) => {
                  let highlightIcon = "📱";
                  const cleanText = item.toLowerCase();
                  
                  if (cleanText.includes('ram') || cleanText.includes('rom') || cleanText.includes('storage')) {
                    highlightIcon = "🎛️";
                  } else if (cleanText.includes('processor') || cleanText.includes('dimensity') || cleanText.includes('snapdragon') || cleanText.includes('core')) {
                    highlightIcon = "🔲";
                  } else if (cleanText.includes('rear camera')) {
                    highlightIcon = "📸";
                  } else if (cleanText.includes('front camera')) {
                    highlightIcon = "📷";
                  } else if (cleanText.includes('battery') || cleanText.includes('mah')) {
                    highlightIcon = "🔋";
                  } else if (cleanText.includes('inch') || cleanText.includes('display') || cleanText.includes('screen')) {
                    highlightIcon = "📱";
                  }

                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50/80 dark:bg-slate-900 flex items-center justify-center shrink-0 text-base border border-blue-100/40 dark:border-slate-800">
                        {highlightIcon}
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Checkout Redirection Trigger passing specific state index markers */}
          <Link href={`/checkout/${product._id}?variant=${selectedVariantIdx}&color=${selectedColorIdx}`}>
            <button className="w-full md:w-max px-14 py-5 rounded-2xl bg-slate-950 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95">
              Buy Now
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}