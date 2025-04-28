import { fetchProduct } from '@/app/hooks/useGetProducts';
import ReviewCard from '@/components/Card';
import { Review } from '@/lib/types';
import React, { Fragment } from 'react'
import RateProduct from '@/app/products/components/RateProduct';
import RenderedStars from '@/components/renderStars';
import RatingStats from '../components/RatingStats';
import getCurrentUser from '@/lib/getCurrentUser';
import getUserData from '@/app/hooks/useUser';
import Link from 'next/link';

const productPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const product = await fetchProduct(id);
    // const user = await getCurrentUser()
    const { userData } = await getUserData();

    return (
        <Fragment>
            {product && (
                <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                            <div className='flex flex-col gap-2 mb-4 md:mb-0'>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {product.name}
                                </h1>
                                <div className='flex gap-1 items-center'>
                                    <RenderedStars rating={product.averageRating} />
                                    <span className="font-medium text-gray-600">
                                        ({product.averageRating}/5)
                                    </span>
                                </div>
                            </div>
                            <RateProduct id={id} user={userData} />
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="flex items-center justify-between px-8">
                            <h2 className="text-xl font-semibold text-gray-800">
                                All Reviews ({product?.reviews?.length})
                            </h2>
                            <Link href={`/create-review?brand=${product.id}`}>
                                <button className='text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl'>
                                    Write a Review
                                </button>
                            </Link>
                            {/* <div className="flex gap-4">
                                <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="newest">Newest First</option>
                                    <option value="highest">Highest Rated</option>
                                    <option value="lowest">Lowest Rated</option>
                                </select>
                            </div> */}
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
                    <RatingStats product={product} />
                </div>
            )}
        </Fragment>
    )
}

export default productPage