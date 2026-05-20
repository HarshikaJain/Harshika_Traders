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
      // This query specifically pulls the first variant's image and price
      const query = `*[_type == "product"]{
  _id,
  name,
  slug,
  variants[]{
    price,
    variantImage,
    colorName,
    colorCode
  }
}`;

      const data = await client.fetch(query);
      setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <main className="relative min-h-screen bg-background transition-colors overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <Hero />
      <BrandMarquee />

      <section className="max-w-7xl mx-auto p-6 mt-12 pb-24 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
              Latest Models
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-widest">
              Premium Tech in Ratlam
            </p>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-10 bg-gradient-to-r from-blue-600/50 to-transparent" />
        </div>

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
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20" />
    </main>
  );
}