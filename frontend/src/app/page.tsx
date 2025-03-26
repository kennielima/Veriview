import React from 'react'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import { fetchReviews } from './hooks/useGetReviews'
import ProductPage from './products/components/ProductPage'

const page = async () => {
  const Reviews = await fetchReviews()

  return (
    <div className="container px-16 py-8 gap-8 mx-auto grid sm:flex">
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
      <div className='flex flex-col gap-4 my-8'>
        <h1 className='text-xl font-bold underline'>Products</h1>
        <ProductPage />
      </div>
    </div>
  )
}

export default page