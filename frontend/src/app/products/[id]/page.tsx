import { fetchProduct, fetchProducts } from '@/app/hooks/useGetProducts';
import ReviewCard from '@/components/Card';
import RenderedStars from '@/components/renderStars';
import { Review } from '@/lib/types';
import React from 'react'

const productPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const product = await fetchProduct(id);
  return (
    <div className="container h-screen mx-auto px-4 py-8 text-center space-y-8">
      <div className="flex text-2xl font-bold text-gray-800 gap-3">
        {product.name}
        <div className="flex items-center mb-2">
          <RenderedStars rating={product.rating} />
          <span className="ml-2 text-gray-600">({product.rating}/5)</span>
        </div>
      </div>
      <p>All Reviews ({product.reviews.length})</p>
      {product.reviews.map((review: Review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}

export default productPage