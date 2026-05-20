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
      // Fetches the exact root values and configuration-based variation structures
      const query = `*[_type == "product"] | order(_id desc) {
        _id,
        title,
        slug,
        images,
        rating,
        category,
        brand,
        variants[]{
          configuration,
          price,
          originalPrice,
          isAvailable
        },
        colors[]{
          colorName,
          hexCode
        }
      }`;

      try {
        const data = await client.fetch(query);
        
        // Filter drafts correctly to display fresh modifications instantly
        const uniqueProducts = data.reduce((acc, current) => {
          const isDraft = current._id.startsWith('drafts.');
          const baseId = isDraft ? current._id.replace('drafts.', '') : current._id;
          const existingIndex = acc.findIndex(p => p._id.replace('drafts.', '') === baseId);
          
          if (existingIndex === -1) {
            acc.push(current);
          } else if (isDraft) {
            acc[existingIndex] = current;
          }
          return acc;
        }, []);

        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <main className="relative min-h-screen bg-background transition-colors overflow-hidden">
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
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">Loading Latest Tech...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}