import { fetchProduct, fetchProducts } from '@/app/hooks/useGetProducts';
import ReviewCard from '@/components/Card';
import RenderedStars from '@/components/renderStars';
import { Review } from '@/lib/types';
import { capitalizeFirstLetter } from '@/lib/utils';
import React from 'react'

const productPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                    {capitalizeFirstLetter(product.name)}
                </h1>
                <div className="flex items-center space-x-1">
                  <p className='text-gray-800 pr-1'>
                    Av. Ratings
                     ({product.reviews.length}): 
                     </p>
                    <RenderedStars rating={product.rating} />
                    <span className="text-lg font-medium text-gray-600">
                        ({product.rating}/5)
                    </span>
                </div>
            </div>
        </div>

        <div className="space-y-10">
            <div className="flex items-center justify-between px-8">
                <h2 className="text-xl font-semibold text-gray-800">
                    All Reviews ({product.reviews.length})
                </h2>
                <div className="flex gap-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="newest">Newest First</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                    </select>
                </div>
            </div>

            {product.reviews.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {product.reviews.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-600">No reviews yet.</p>
                </div>
            )}
        </div>

        {/* Review Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = product.reviews.filter((r: Review) => Math.floor(r.rating) === star).length;
                    const percentage = (count / product.reviews.length) * 100 || 0;

                    return (
                        <div key={star} className="flex items-center">
                            <span className="w-12 text-sm text-gray-600">{star} stars</span>
                            <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="w-12 text-sm text-gray-600">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default productPage