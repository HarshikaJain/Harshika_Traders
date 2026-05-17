import React from 'react';
import Link from 'next/link';

export default function Hero() {
  const banners = [
    { id: 1, img: "/assets/realme_16_pro+.webp", link: "/products/realme-16-pro-plus" },
    { id: 2, img: "/assets/oppo-f33-pro.webp", link: "/products/oppo-f33-pro" }
  ];

  return (
    <section className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-slate-950">
      {banners.map((banner) => (
        <Link 
          href={banner.link} 
          key={banner.id}
          className="flex-1 bg-gray-50 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[220px] sm:h-[300px] lg:h-[450px]"
        >
          <img 
            src={banner.img} 
            alt="Promotion Banner" 
            className="w-full h-full object-cover lg:object-fill" // object-fill ensures no blank spaces
          />
        </Link>
      ))}
    </section>
  );
}