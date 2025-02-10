import React from 'react'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Sidebar from '@/components/Sidebar'
import { fetchReviews } from './hooks/useGetReviews'

const page = async () => {
  const Reviews = await fetchReviews()

  return (
    <div className="container px-16 py-8 mx-auto flex">
      <div className="space-y-4 w-4/5">
        {Reviews && Reviews.length > 0 ? (
          Reviews.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )
        }
      </div>
      <Sidebar />
    </div>
  )
}

export default page