import React from 'react'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Sidebar from '@/components/Sidebar'
import { fetchReviews } from './hooks/useGetReviews'

const page = async () => {
  const Reviews = await fetchReviews()

  return (
    <div className="container px-16 py-8 mx-auto">
      <div className="space-y-4">
        {Reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {/* <Sidebar /> */}
    </div>
    )
}

export default page