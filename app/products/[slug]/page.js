import React from 'react';
import { client } from '../sanity/lib/client';
import ProductGridClient from '../components/ProductGridClient'; // We will create this below

// Fetch data on the server side
async function getLatestProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    brand,
    category,
    slug,
    images,
    variants,
    rating
  }`;
  // Using no-store ensures that updates show up when you upload new products
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function HomePage() {
  const products = await getLatestProducts();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-6 max-w-7xl mx-auto">
      {/* Header Info Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Latest Premium Devices
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Authorized tech configurations synced live with Harshika Traders database.
        </p>
      </div>

      {/* Pass data downstream to a clean client presentation layer */}
      <ProductGridClient initialProducts={products} />
    </main>
  );
}