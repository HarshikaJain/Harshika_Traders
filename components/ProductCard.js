"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../sanity/lib/client';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      // This query pulls the variants array which the ProductCard needs
      const query = `*[_type == "product"]{
        _id,
        name,
        slug,
        variants[]{
          price,
          variantImage,
          colorName
        }
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Hero />
      <BrandMarquee />

      <section className="max-w-7xl mx-auto p-6 mt-12 pb-24 relative z-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-12">Latest Models</h2>
        
        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">Loading Latest Tech...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}