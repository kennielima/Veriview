import React from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import RenderStars from '@/components/renderStars';

const reviewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const response = await fetch(`${process.env.API_URL}/reviews/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const reviewData = await response.json();
  const review = reviewData.review;
  const reviewUser = reviewData.user;

  console.log(review, id)
  
  if (!review) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Review Not Found</h1>
        <Link href='/'>
          <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
            Back to Reviews
          </button>
        </Link>
        <Link href='/'>
          <button className="mb-6 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reviews
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href='/'>
        <button className="mb-6 flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reviews
        </button>
      </Link>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{review.title}</h1>
              <div className="flex items-center mb-2">
              <RenderStars rating={review.rating} />
              <span className="ml-2 text-gray-600">({review.rating}/5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-800 text-base leading-relaxed">{review.content}</p>

            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Product:</strong> {review.productName}
                </div>
                <div>
                  <strong>Reviewer:</strong> @{reviewUser?.username}
                </div>
                <div>
                  <strong>Date:</strong> {formatDateTime(review.createdAt)}
                </div>
                <div>
                  <strong>Verified Purchase:</strong>
                  <span className={review.verifiedPurchase ? 'text-green-600' : 'text-gray-500'}>
                    {review.verifiedPurchase ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reviewPage;