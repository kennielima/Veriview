import React from 'react';
import getCurrentUser from '@/lib/getCurrentUser';
import { fetchReview } from '@/app/services/useGetReviews';
import ReviewPage from './components/ReviewPage';

type Params = Promise<{
  id: string
}>

const reviewPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const reviewData = await fetchReview(id);

  return (
    <ReviewPage reviewData={reviewData} currentUser={currentUser} id={id} />
  )
}
export default reviewPage;







