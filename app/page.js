"use client";
import { PRODUCTS } from '../constants/productData';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background transition-colors overflow-hidden">
      
      {/* Add this right inside the main <main> tag */}
<div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
  {/* Soft Blue Glow Top Left */}
  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
  {/* Soft Indigo Glow Bottom Right */}
  <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]" />
</div>

      {/* PROFESSIONAL BACKGROUND ACCENTS */}
      {/* These subtle blurry circles add depth and a "tech" feel without being distracting */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* BRAND MARQUEE */}
      <BrandMarquee />

      {/* PRODUCT SECTION */}
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
          {/* Decorative Line */}
          <div className="hidden md:block h-[1px] flex-grow mx-10 bg-gradient-to-r from-blue-600/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </section>

      {/* FOOTER ACCENT */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-20" />
    </main>
  );
}