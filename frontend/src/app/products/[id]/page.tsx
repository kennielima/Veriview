import { fetchProduct, fetchProducts } from '@/app/hooks/useGetProducts';
import ReviewCard from '@/components/Card';
import { Review } from '@/lib/types';
import React from 'react'

const productPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const productData = await fetchProduct(id);
  const product = productData.product;
  const ProductReviews = productData.ProductReviews;

  console.log("product", product, ProductReviews);
  return (
    <div className="container h-screen mx-auto px-4 py-8 text-center">
      <div>{product.name}</div>
      <p>All Reviews</p>
      {ProductReviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}

export default productPage