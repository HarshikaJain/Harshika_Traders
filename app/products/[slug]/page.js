'use client'
import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "product" && _id == "${params.slug}"][0]`;
      const data = await client.fetch(query);
      setProduct(data);
      if (data?.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
      setLoading(false);
    }
    fetchData();
  }, [params.slug]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      {/* Dynamic Image Display */}
      <div className="flex-1 bg-white rounded-3xl p-8 flex items-center justify-center border border-slate-100">
        <img 
          src={selectedVariant ? urlFor(selectedVariant.variantImage).url() : '/placeholder.jpg'} 
          alt={product.name}
          className="max-h-[500px] object-contain transition-all duration-500"
        />
      </div>

      {/* Product Info & Selection */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-black text-slate-900">{product.name}</h1>
        
        {/* Dynamic Price */}
        <p className="text-3xl font-black text-blue-600">
          ₹{selectedVariant ? selectedVariant.price : "Price unavailable"}
        </p>

        {/* Color Circles */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            Color: {selectedVariant?.colorName}
          </h3>
          <div className="flex gap-4">
            {product.variants?.map((variant, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(variant)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedVariant?.colorName === variant.colorName ? 'border-blue-600 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: variant.colorCode }}
                title={variant.colorName}
              />
            ))}
          </div>
        </div>

        {/* Storage Buttons */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Select Storage</h3>
          <div className="flex gap-2">
            {product.variants
              ?.filter(v => v.colorName === selectedVariant?.colorName)
              .map((variant, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-6 py-3 rounded-xl font-bold border transition-all ${
                    selectedVariant?.storage === variant.storage 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-slate-900 border-slate-200'
                  }`}
                >
                  {variant.storage}
                </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 mb-2">Product Details</h3>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}