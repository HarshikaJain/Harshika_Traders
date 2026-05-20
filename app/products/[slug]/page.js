import { sanityFetch } from '../../../sanity/lib/live';
import { urlFor } from '../../../sanity/lib/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductDetailPage({ params }) {
  // 1. Must match the folder name [slug]
  const { slug } = await params;

  // 2. We use the 'slug' variable to query the Sanity _id
  const { data: product } = await sanityFetch({
    query: `*[_type == "product" && _id == $id][0]{
      _id,
      name,
      price,
      description,
      image,
      category
    }`,
    params: { id: slug } // Mapping the URL slug to the $id variable in the query
  });
  
  if (!product) {
    return notFound();
  }

  const imageUrl = product.image ? urlFor(product.image).url() : '/placeholder.jpg';

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20 px-6 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-12 flex items-center justify-center border border-slate-100 dark:border-slate-800">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            {product.name}
          </h1>
          <p className="text-4xl font-black text-slate-900 dark:text-white mb-8">
            ₹{product.price}
          </p>
          <div className="prose dark:prose-invert mb-10">
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>          
          <Link href={`/checkout/${product._id}`}>
            <button className="w-full md:w-max px-12 py-5 rounded-2xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
            Buy Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}