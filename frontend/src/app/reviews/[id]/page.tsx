import React from 'react';
import getCurrentUser from '@/lib/getCurrentUser';
import { fetchReview } from '@/app/hooks/useGetReviews';
import ReviewPage from './components/ReviewPage';

const reviewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const reviewData = await fetchReview(id);

  return (
    <ReviewPage reviewData={reviewData} currentUser={currentUser} id={id} />
  )
}
export default reviewPage;







