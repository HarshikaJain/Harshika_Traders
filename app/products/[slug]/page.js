import { sanityFetch } from '../../../sanity/lib/live';
import { urlFor } from '../../../sanity/lib/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // FIXED: Query now checks against slug.current instead of _id, and pulls new schema structures
  const { data: product } = await sanityFetch({
    query: `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      category,
      brand,
      images,
      rating,
      variants[]{
        configuration,
        price,
        originalPrice,
        isAvailable
      },
      colors[]{
        colorName,
        hexCode
      },
      highlights
    }`,
    params: { slug }
  });
  
  if (!product) {
    return notFound();
  }

  // Fallbacks for the new array-based structures
  const displayTitle = product.title || "Premium Tech Model";
  const imageUrl = product.images && product.images[0] ? urlFor(product.images[0]).url() : '/placeholder.jpg';
  
  const defaultVariant = product.variants?.[0];
  const displayPrice = defaultVariant?.price || 0;
  const displayOriginalPrice = defaultVariant?.originalPrice;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20 px-6 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Product Image Display Stack */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-12 flex items-center justify-center border border-slate-100 dark:border-slate-800 aspect-square">
          <img 
            src={imageUrl} 
            alt={displayTitle} 
            className="max-h-[450px] max-w-full object-contain hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* Product Details Column */}
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-2">
            {product.brand || "Premium Tech"} / {product.category}
          </span>
          
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            {displayTitle}
          </h1>
          
          {/* Prices Structure mapping values cleanly */}
          <div className="flex items-baseline space-x-4 mb-6">
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              ₹{displayPrice.toLocaleString('en-IN')}
            </p>
            {displayOriginalPrice && (
              <p className="text-xl text-slate-400 line-through">
                ₹{displayOriginalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>

          {/* Configuration Selection Chips layout */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Storage & RAM Options:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                      i === 0 
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {v.configuration}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights bullet stack section */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-8 pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features:</p>
              <ul className="space-y-2">
                {product.highlights.map((item, idx) => (
                  <li key={idx} className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-start">
                    <span className="text-blue-500 mr-2">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Dynamic Checkout Flow Button redirect */}
          <Link href={`/checkout/${product._id}`}>
            <button className="w-full md:w-max px-12 py-5 rounded-2xl bg-slate-950 hover:bg-blue-600 text-white font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}