import { Product, Review, UserRating } from '@/lib/types';
import React from 'react'

const RatingStats = ({ product }: { product: Product }) => {
    console.log(product)
    return (
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <div className='flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-4'>
                <h3 className="text-lg font-semibold">Rating Breakdown</h3>
                <p className='mr-4 sm:mr-8'>
                    Based on <span className='text-lg font-bold text-black'>{product.ratingsCount}</span> total rating(s)
                </p>
            </div>
            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    // const count = product.reviews.filter((r: Review) => Math.floor(r.rating) === star).length;
                    // const percentage = (count / (product.reviews.length + product.rating?.length)) * 100 || 0;

                    const reviewCount = product.reviews.filter((r: Review) => Math.floor(r.rating) === star).length;
                    const ratingCount = product.rating.filter((r: UserRating) => Math.floor(r.productRating) === star).length;

                    const count = reviewCount + ratingCount;
                    const totalRatings = product.reviews.length + product.rating.length;
                    const percentage = (count / totalRatings) * 100 || 0;

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
        </div>)
}

export default RatingStats