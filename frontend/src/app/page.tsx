import React from 'react'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import { fetchReviews } from './hooks/useGetReviews'
import ProductPage from './products/components/ProductPage'
import { LogOut } from 'lucide-react'

const page = async () => {
  const Reviews = await fetchReviews()

  return (
    <div className="container mx-auto grid md:flex h-full md:h-[90vh]">
      <div className="space-y-4 px-12 py-8 w-3/4 overflow-aut md:overflow-scroll h-full md:no-scrollbar">
        {Reviews && Reviews.length > 0 ? (
          Reviews.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>

      <hr className='hidden md:flex w-[1px] h-full bg-slate-300 px-0' />

      <div className='flex flex-col pt-14 md:h-[85vh] justify-between'>
        <div className='flex flex-col gap-4 px-4 pl-12'>
          <h1 className='text-xl font-bold underline'>Brands</h1>
          <ProductPage />
        </div>
        <div className='flex flex-col gap-4'>
          <hr className='hidden md:flex w-full' />
          <div className='pr-4 pl-12 hidden w-full md:flex justify-end items-center gap-2'>
            <LogOut size="15" />
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default page