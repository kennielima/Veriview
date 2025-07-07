import React from 'react';
import getCurrentUser from '@/lib/getCurrentUser';
import { fetchReview } from '@/app/services/useGetReviews';
import ReviewComponent from './components/ReviewPage';

type Params = Promise<{ id: string }>

export default async function ReviewPage({ params }: { params: Params }) {
  const { id } = await params;

  const currentUser = await getCurrentUser();

  const reviewData = await fetchReview(id);

  return (
    <ReviewComponent reviewData={reviewData} currentUser={currentUser} id={id} />
  )
}






