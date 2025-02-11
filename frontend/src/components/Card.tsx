import React from 'react'
import Link from 'next/link';
import { capitalizeFirstLetter, timeAgo } from '@/lib/utils';
import { Review } from '@/lib/types';
import RenderedStars from './renderStars';

const ReviewCard = ({ review }: {review: Review}) => {    
    return (
        <Link href={`/reviews/${review.id}`}>
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 mx-auto max-w-3xl">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{review.title}</h2>
                <div className="flex">
                    <RenderedStars rating={review.rating} />
                </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">
                {review.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-medium">{capitalizeFirstLetter(review.brand)}</span>
                <span>{timeAgo(review.createdAt)}</span>
            </div>
        </div>
        </Link>
    );
};
export default ReviewCard