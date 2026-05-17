'use client'
import React, { useState, useEffect, use } from 'react'; // Added 'use'
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default function ProductDetailPage({ params }) {
  // Use 'use' to unwrap params safely in Next.js 14/15
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // FIX: This query now checks BOTH the Slug and the ID to prevent 404s
      const query = `*[_type == "product" && (slug.current == $slug || _id == $slug)][0]{
        name,
        description,
        variants[]{
          colorName,
          colorCode,
          storage,
          price,
          variantImage
        }
      }`;
      
      try {
        const data = await client.fetch(query, { slug: slug });
        setProduct(data);
        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) return <div className="p-20 text-center font-bold">Loading Product...</div>;
  
  // This triggers if the query returns nothing
  if (!product) return (
    <div className="p-20 text-center">
      <h2 className="text-2xl font-bold">Product not found.</h2>
      <p className="text-slate-500">Slug: {slug}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      {/* Dynamic Image Display */}
      <div className="flex-1 bg-white rounded-3xl p-8 flex items-center justify-center border border-slate-100 shadow-sm">
        {selectedVariant?.variantImage ? (
          <img 
            src={urlFor(selectedVariant.variantImage).url()} 
            alt={product.name}
            className="max-h-[500px] object-contain transition-all duration-500"
          />
        ) : (
          <div className="h-[400px] w-full bg-slate-50 flex items-center justify-center rounded-2xl">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Info & Selection */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">{product.name}</h1>
        
        {/* Dynamic Price */}
        <p className="text-3xl font-black text-blue-600">
          ₹{selectedVariant ? selectedVariant.price : "Price unavailable"}
        </p>

        {/* Color Circles */}
        {product.variants?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              Color: {selectedVariant?.colorName || "Select a color"}
            </h3>
            <div className="flex gap-4">
              {/* Get unique colors only */}
              {[...new Map(product.variants.map(v => [v.colorName, v])).values()].map((variant, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedVariant?.colorName === variant.colorName ? 'border-blue-600 scale-110 shadow-lg' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.colorName}
                />
              ))}
            </div>
          </div>
        )}

        {/* Storage Buttons */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Select Storage</h3>
          <div className="flex gap-2 flex-wrap">
            {product.variants
              ?.filter(v => v.colorName === selectedVariant?.colorName)
              .map((variant, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-6 py-3 rounded-xl font-bold border transition-all ${
                    selectedVariant?.storage === variant.storage 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {variant.storage}
                </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">Product Details</h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
      </div>
    </div>
  );
}