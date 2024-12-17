import React from 'react'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Sidebar from '@/components/Sidebar'

const page = async () => {
  const response = await fetch(`${process.env.API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const Reviews = await response.json()

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