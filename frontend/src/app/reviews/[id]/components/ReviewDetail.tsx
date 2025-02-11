"use client"
import React from 'react';
import { ArrowLeft, Clock, User, Package, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import DeleteComponent from '@/components/DeleteComponent';
import { useRouter } from 'next/navigation';
import { reviewTypeProps } from './ReviewPage';
import RenderedStars from '@/components/renderStars';
import { formatDateTime } from '@/lib/utils';

const ReviewDetail: React.FC<reviewTypeProps> = ({ reviewData, currentUser, id }) => {
    const router = useRouter();
    const review = reviewData?.review;

    if (!reviewData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">Review Not Found</h1>
                    <p className="text-gray-600">The review you're looking for doesn't exist or has been removed.</p>
                    <Link href='#' onClick={(e) => { e.preventDefault(); router.back() }}>
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            Back to Reviews
                        </button>
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href='#' onClick={(e) => { e.preventDefault(); router.back() }}>
                    <button className="mb-6 flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Reviews
                    </button>
                </Link>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-8">
                        {/* Header Section */}
                        <div className="border-b pb-6 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{review.title}</h1>
                            <div className="flex items-center space-x-4">
                                <RenderedStars rating={review.rating} />
                                <span className="text-gray-600 font-medium">({review.rating}/5)</span>
                            </div>
                        </div>

                        {/* Metadata Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 mb-6 border-b">
                            {review.brand && (
                                <div className="flex items-center space-x-3">
                                    <Package className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">Product</div>
                                        <Link
                                            href={`/products/${review?.productId}`}
                                            className="text-gray-900 hover:text-blue-600 font-medium"
                                        >
                                            {review.brand}
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-gray-400" />
                                <div>
                                    <div className="text-sm text-gray-500">Reviewer</div>
                                    <div className="text-gray-900 font-medium">@{currentUser.user.username}</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <div>
                                    <div className="text-sm text-gray-500">Posted</div>
                                    <div className="text-gray-900 font-medium">{formatDateTime(review.createdAt)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 leading-relaxed">{review.content}</p>
                        </div>

                    </div>
                </div>

                {/* Delete Button Section */}
                {review.userId === currentUser?.user?.id && (
                    <div className="mt-6 flex justify-end">
                        <DeleteComponent id={id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewDetail;