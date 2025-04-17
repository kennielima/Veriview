import React from 'react'
import ReviewCard from '@/components/Card'
import { Product, Review } from '@/lib/types'
import { fetchReviews } from './hooks/useGetReviews'
import getCurrentUser from '@/lib/getCurrentUser'
import { LogoutClient } from '@/components/LogoutClient'
import { fetchProducts } from './hooks/useGetProducts'
import { Star } from 'lucide-react'
import Link from 'next/link'

const page = async () => {
  const Reviews = await fetchReviews()
  const user = await getCurrentUser();
  const Products = await fetchProducts();

  return (
    <div className="container flex flex-col md:flex-row mx-auto my-12 md:my-0 h-full md:h-[90vh]">
      {/* FEED */}
      <div className="space-y-4 px-12 md:py-8 w-full md:w-3/4 md:overflow-scroll h-full no-scrollbar">
        {Reviews && Reviews.length > 0 ? (
          Reviews.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>

      <hr className='hidden md:flex w-[1px] h-full bg-slate-300 px-0' />

      {/* SIDEBAR */}
      <div className='flex flex-col md:pt-14 md:h-[85vh] w-full md:w-1/4 justify-between'>
        <div className='flex flex-col gap-4 pr-4 pl-12'>
          <h1 className='text-lg font-bold underline'>Highest Rated Brands</h1>
          <div className="space-y-4 w-full">

            {/* Brands Sidebar */}
            {Products && Products.length > 0 ? (
              [...Products].sort((a: any, b: any) => b.averageRating - a.averageRating).slice(0, 3).map((product: Product) => (
                <div className='flex flex-col' key={product.id}>
                  <div className='flex gap-1 items-center'>
                    <Link href={`products/${product.id}`} className='hover:text-gray-600'>{product.name}</Link>
                    <Star
                      className='text-yellow-500 w-4 h-4 ml-1'
                      fill={"currentColor"}
                      stroke="currentColor"
                    />
                    <p className='text-gray-600 text-sm'>{product.averageRating}</p>
                  </div >
                  <p className='text-indigo-600 text-sm'>{product.reviews.length} review(s)</p>
                </div >
              ))
            ) : (
              <p>No Brands found</p>
            )
            }
          </div>
        </div>
        {(user && user.loggedIn) &&
          <div className='flex flex-col gap-4 justify-end'>
            <hr className='hidden md:flex w-auto' />
            <LogoutClient />
          </div>
        }
      </div>
    </div>
  )
}

export default page