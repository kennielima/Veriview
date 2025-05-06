import React from 'react'
import Link from 'next/link';
import { getInitials, timeAgo, truncate } from '@/lib/utils';
import { RatedHelpful, Review } from '@/lib/types';
import RenderedStars from './renderStars';
import { Clock } from 'lucide-react';

const ReviewCard = ({ review }: { review: Review }) => {
    const ratedHelpful = review?.ratedhelpful;

    return (
        <Link href={`/reviews/${review.id}`}>
            <div className="bg-white border-t border-t-slate-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6 mb-8 mx-auto max-w-4xl">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 mr-4">{review.title}</h2>
                    <div className="hidden md:flex">
                        <RenderedStars rating={review.rating} />
                    </div>
                </div>
                <p className="text-indigo-600 md:mb-3 mt-1 text-start">{review.brand}</p>
                <div className="flex mb-3 md:hidden mt-1">
                    <RenderedStars rating={review.rating} />
                </div>
                <p className="mb-4 flex justify-start line-clamp-2 break-words max-w-[80ch] min-h-20 overflow-hidden">
                    {truncate(review.content)}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className='flex gap-1 items-center'>
                        {review?.user?.fullName && <p className={`${review.anonymous ? "bg-gray-400" : "bg-indigo-600 "} p-3 rounded-full mr-2 text-white`}>{getInitials(review.anonymous ? "A non" : review?.user?.fullName)}</p>}
                        <div className='flex flex-col gap-1'>
                            <p className="font-medium text-gray-700">{review.anonymous ? "Anonymous" : review?.user?.username}</p>
                            <p className='text-xs sm:hidden flex items-center gap-1'>
                                <Clock className='size-3' />
                                {timeAgo(review.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-1 sm:gap-6'>
                        <p>Helpful ({ratedHelpful?.length})</p>
                        <p className='hidden sm:flex items-center gap-1'>
                            <Clock className='size-4' />
                            {timeAgo(review.createdAt)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default ReviewCard