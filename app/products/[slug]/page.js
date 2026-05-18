import { sanityFetch } from '../../../sanity/lib/live';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({
    query: `*[_type == "product" && (slug.current == $id || _id == $id)][0]{
      _id,
      title,
      category,
      brand,
      images,
      rating,
      ratingCount,
      colors,
      variants,
      specialFeatures
    }`,
    params: { id: slug }
  });
  
  if (!product) {
    return notFound();
  }

  return <ProductDetailClient product={product} />;
}