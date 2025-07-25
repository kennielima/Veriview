import React from 'react'
import Link from 'next/link';
import { getInitials, timeAgo, truncate } from '@/lib/utils';
import { Review } from '@/lib/types';
import RenderedStars from './renderStars';
import { Clock } from 'lucide-react';
import Image from 'next/image';

const ReviewCard = ({ review }: { review: Review }) => {
    const ratedHelpful = review?.ratedhelpful;
    const image = review?.images?.[0];

    return (
        <Link href={`/reviews/${review.id}`}>
            <div className="bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6 mb-8 mx-auto max-w-4xl">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 mr-4">{review.title}</h2>
                    <div className="hidden md:flex">
                        <RenderedStars rating={review.rating} />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className="text-indigo-600 md:mb-3 mt-1 text-start">{review.brand}</p>
                    <div className="flex mb-3 md:hidden mt-1">
                        <RenderedStars rating={review.rating} />
                    </div>
                </div>
                {image ? (
                    <div className='flex relative gap-4 mb-4 justify-start'>
                        <Image
                            width={500}
                            height={500}
                            src={image}
                            alt='review-image-card'
                            className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200'
                        />
                        <span className='absolute left-1 bottom-1 w-6 h-6 flex justify-center items-center text-sm bg-black bg-opacity-70 rounded-md text-white'>{review?.images?.length}</span>
                        <>
                            <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-20 overflow-hidden hidden lg:flex">
                                {truncate(review.content, 250)}
                            </p>
                            <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-20 overflow-hidden hidden sm:flex lg:hidden">
                                {truncate(review.content, 200)}
                            </p>
                            <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-24 overflow-hidden sm:hidden">
                                {truncate(review.content, 85)}
                            </p>
                        </>
                    </div>
                ) : (
                    <div className='mb-4'>
                        <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-20 overflow-hidden hidden lg:flex">
                            {truncate(review.content, 300)}
                        </p>
                        <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-20 overflow-hidden hidden sm:flex lg:hidden">
                            {truncate(review.content, 250)}
                        </p>
                        <p className="text-start line-clamp-2 break-words max-w-[80ch] min-h-24 overflow-hidden sm:hidden">
                            {truncate(review.content, 140)}
                        </p>
                    </div>
                )}
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