import React from 'react'
import { Star } from 'lucide-react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

const ReviewCard = ({ review }: any) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`h-5 w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill={index < rating ? 'currentColor' : 'none'}
            />
        ));
    }
    
    return (
        <Link href='/review'>
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 mx-auto max-w-3xl">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{review.title}</h2>
                <div className="flex">
                    {renderStars(review.rating)}
                </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">
                {review.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-medium">@{review.user?.username}</span>
                <span>{formatDateTime(review.createdAt)}</span>
            </div>
        </div>
        </Link>
    );
};
export default ReviewCard