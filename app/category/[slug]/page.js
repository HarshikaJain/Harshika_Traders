import { sanityFetch } from '../../../sanity/lib/live';
import ProductCard from '../../../components/ProductCard';

export default async function CategoryPage({ params }) {
  // Await params in Next.js Server Components
  const { slug } = await params;
  const categorySlug = decodeURIComponent(slug);

  // Fetch products from Sanity matching the category with the updated schema structure
  const { data: products } = await sanityFetch({
    query: `*[_type == "product" && category == $categorySlug] | order(_id desc) {
      _id,
      title,
      slug,
      images,
      rating,
      category,
      variants[]{
        configuration,
        price,
        originalPrice,
        isAvailable
      }
    }`,
    params: { categorySlug }
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            {categorySlug}
          </h1>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-sm">
            {products?.length || 0} Products Found
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 text-center border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-400 font-bold text-xl">
              No products available in this category yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}