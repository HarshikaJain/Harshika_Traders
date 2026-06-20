"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const p = await params;
      const query = `*[_type == "product" && slug.current == $slug][0]{
        title, brand, images,
        variants[]{
          configuration, variantHighlights,
          colors[]{ colorName, price, originalPrice, colorImages }
        }
      }`;
      const data = await client.fetch(query, { slug: p.slug });
      setProduct(data);
    }
    fetchData();
  }, [params]);

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  const v = product.variants?.[selectedVariantIdx];
  const c = v?.colors?.[selectedColorIdx] || v?.colors?.[0];

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side: Product Image */}
        <div className="bg-slate-50 p-8 rounded-3xl aspect-square flex items-center justify-center">
          <img 
            src={c?.colorImages?.[0] ? urlFor(c.colorImages[0]) : urlFor(product.images?.[0])} 
            alt={product.title}
            className="max-h-full object-contain" 
          />
        </div>

        {/* Right Side: Details Hierarchy */}
        <div>
          {/* 1. Company Name */}
          <h2 className="text-sm font-bold text-slate-500 uppercase">{product.brand}</h2>
          
          {/* 2. Product Name */}
          <h1 className="text-4xl font-black mt-1 mb-4">{product.title}</h1>
          
          {/* 3. Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-extrabold">₹{c?.price?.toLocaleString('en-IN')}</span>
            {c?.originalPrice && (
              <span className="text-slate-400 line-through">₹{c.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          {/* 4. Variant Options */}
          <div className="mb-6">
            <p className="font-bold text-sm mb-2">Select Variant:</p>
            <div className="flex gap-3">
              {product.variants?.map((varnt, i) => (
                <button 
                  key={i} 
                  onClick={() => { setSelectedVariantIdx(i); setSelectedColorIdx(0); }}
                  className={`px-6 py-3 rounded-lg border-2 text-sm font-bold transition-all ${selectedVariantIdx === i ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'}`}
                >
                  {varnt.configuration}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Selected Color */}
          <div className="mb-8">
            <p className="font-bold text-sm mb-2">Select Color: <span className="font-normal text-slate-500 uppercase">{c?.colorName}</span></p>
            <div className="flex gap-4">
              {v?.colors?.map((col, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedColorIdx(i)}
                  className={`p-1 rounded-2xl border-2 transition-all ${selectedColorIdx === i ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img src={urlFor(col.colorImages[0])} className="w-16 h-16 object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* 6. Product Highlights */}
          <div className="mb-8">
            <p className="font-bold text-sm mb-2">Product Highlights ({v?.configuration}):</p>
            <ul className="space-y-1 text-sm text-slate-600">
              {v?.variantHighlights?.map((h, i) => <li key={i}>• {h}</li>)}
            </ul>
          </div>

          {/* 7. Buy Now Button */}
         <button 
  onClick={() => {
    // Construct the query string
    const productInfo = `${product.title} | ${v.configuration} | ${c.colorName}`;
    const price = c.price;
    
    // Push to checkout with query parameters
    router.push(`/checkout?product=${encodeURIComponent(productInfo)}&price=${price}`);
  }}
  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-colors"
>
  Buy Now
</button>
        </div>
      </div>
    </div>
  );
}