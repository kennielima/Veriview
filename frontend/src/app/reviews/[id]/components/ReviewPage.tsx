"use client"
import DeleteComponent from '@/app/reviews/[id]/components/DeleteComponent'
import RenderedStars from '@/components/renderStars'
import { RatedHelpful, Review, User } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { ArrowLeft, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation';
import { rateHelpful } from '@/app/hooks/useRating'

export type reviewTypeProps = {
    reviewData: {
        review: Review,
    };
    currentUser: {
        loggedIn: boolean;
        user: User
    };
    id: string
}
const ReviewPage: React.FC<reviewTypeProps> = ({ reviewData, currentUser, id }) => {
    const router = useRouter();
    const review = reviewData?.review;

    const ratedHelpfulArray = Array.isArray(review?.ratedhelpful) ? review?.ratedhelpful : [];
    const ratedhelpfulCount = ratedHelpfulArray.length;
    const userRatedHelpful = ratedHelpfulArray?.find((ratedhelpful: RatedHelpful) => currentUser?.user?.id === ratedhelpful?.userId);
    const [isRatedHelpful, setIsRatedHelpful] = useState(userRatedHelpful ? true : false);

    // console.log("urh", userRatedHelpful, "aa", ratedHelpfulArray, isRatedHelpful)

    const thumbsUpHandler = async () => {
        const newRateHelpful = !isRatedHelpful;
        setIsRatedHelpful(newRateHelpful);
        await rateHelpful(newRateHelpful, id)
        router.push(`/reviews/${id}`)
    }

    return (
        <Fragment>
            {!review ? (
                <div className="container h-screen mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold">Review Not Found</h1>
                    <Link href='#' onClick={(e) => { e.preventDefault(); router.back() }}>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                            Back to Reviews
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <Link href='#' onClick={(e) => { e.preventDefault(); router.back() }}>
                        <button className="mb-6 flex items-center px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Reviews
                        </button>
                    </Link>

                    <div className="p-6 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{review.title}</h1>
                                <div className="flex items-center mb-2 space-x-1 md:space-x-4">
                                    <RenderedStars rating={review.rating} />
                                    <span className="ml-2 text-gray-600">({review.rating}/5)</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-1 text-gray-800'>
                                <ThumbsUp
                                    className={`size-5 cursor-pointer ${isRatedHelpful && 'text-gray-600 hover:text-gray-900'}`}
                                    onClick={thumbsUpHandler}
                                    fill={isRatedHelpful ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                />
                                <p className='text-xs'>rate as helpful ({ratedhelpfulCount})</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b pb-6 mb-6 border-t pt-6 mt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                                    {review.brand && (
                                        <div>
                                            <Link href={`/products/${review?.productId}`} className='hover:text-gray-500'>
                                                <strong>Product:</strong> {review.brand}
                                            </Link>
                                        </div>
                                    )}
                                    <div>
                                        <strong>Reviewer: </strong>
                                        @
                                        {review.anonymous ? (
                                            <span>Anonymous</span>
                                        ) : (
                                            <span>{review?.user?.username}</span>
                                        )}
                                    </div>
                                    <div>
                                        <strong>Date:</strong> {formatDateTime(review.createdAt)}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-800 text-base leading-relaxed">{review.content}</p>
                        </div>
                    </div>
                    {review.userId === currentUser?.user?.id && (
                        <div className="mt-6 flex justify-end">
                            <DeleteComponent id={id} />
                        </div>
                    )}
                </div>
            )
            }
        </Fragment>
    )
}

export default ReviewPage