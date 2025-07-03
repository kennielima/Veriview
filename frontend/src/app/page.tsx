import React from 'react'
import ReviewCard from '@/components/Card'
import { Product, Review } from '@/lib/types'
import { fetchReviews } from './services/useGetReviews'
import getCurrentUser from '@/lib/getCurrentUser'
import { LogoutClient } from '@/components/LogoutClient'
import { fetchProducts } from './services/useGetProducts'
import { Star } from 'lucide-react'
import Link from 'next/link'
import Faq from './faq/page'

const page = async () => {
  const { data: Reviews } = await fetchReviews()

  const user = await getCurrentUser();
  const { data: Products } = await fetchProducts();

  return (
    <div className="flex flex-col md:flex-row mx-auto h-full md:h-[90vh]">
      {/* FEED */}
      <div className="space-y-4 w-full md:w-2/3 lg:w-3/4 md:overflow-scroll h-full no-scrollbar">

        <div className="max-w-7xl py-10 md:py-16 px-6 bg-indigo-600 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find and Share Authentic Brand Experiences</h1>
            <p className="text-indigo-100 text-lg mb-8">Join other users who trust Veriview to discover honest reviews and make informed decisions.</p>

            <div className="flex gap-2 md:gap-4 justify-center items-center w-full">
              <Link href='/create-review'>
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 shadow-md">
                  Write a Review
                </button>
              </Link>
              <Link href='/reviews'>
                <button className="w-full sm:w-auto px-6 py-3 bg-indigo-700 text-white font-medium rounded-md hover:bg-indigo-800 border border-indigo-500">
                  Explore Reviews
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className='mx-auto px-8'>
          {Reviews && Reviews.length > 0 ? (
            <div>
              {Reviews.map((review: Review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              <Link href='/reviews'>
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all Reviews
                  </button>
                </div>
              </Link>
            </div>
          ) : (
            <p>No reviews found</p>
          )}
        </div>
        {/* <div className="lg:col-span-2 md:w-3/4 mx-auto bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg shadow-md p-6 text-white"> */}
        <div className="flex flex-col items-center justify-center bg-indigo-600 lg:col-span-2 md:w-3/4 mx-6 md:mx-auto rounded-lg shadow-md p-6 text-white">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold mb-1">Share Your Experience</h2>
            <p className="text-indigo-100">Help others make better decisions by sharing your honest review of brands you&apos;ve experienced.</p>
          </div>
          <Link href='/create-review' className='w-full'>
            <button className="px-6 py-3 w-full bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 shadow-md">
              Write a Review
            </button>
          </Link>
        </div>
        <Faq />
        {/* </div> */}
      </div>

      {/* <hr className='hidden md:flex w-[1px] h-full bg-slate-300 px-0' /> */}

      {/* SIDEBAR */}
      <div className='pb-2 border shadow-md flex flex-col py-6 md:pt-6 md:h-[90vh] w-full md:w-1/3 lg:w-1/4 justify-between'>
        <div className='flex flex-col gap-4 mx-auto px-6 justify-center py-8'>
          <h1 className='text-lg font-bold'>Highest Rated Brands</h1>
          <div className="space-y-4 w-full">
            {/* Brands Sidebar */}
            {Products && Products.length > 0 ? (
              [...Products].sort((a: Product, b: Product) => b.averageRating - a.averageRating).slice(0, 3).map((product: Product) => (
                <Link href={`products/${product.id}`} className='flex flex-col gap-1' key={product.id}>
                  <div className='flex gap-1 items-center'>
                    <p className='hover:text-gray-600 text-sm'>{product.name}</p>
                    <Star
                      className='text-yellow-500 w-4 h-4 ml-1'
                      fill={"currentColor"}
                      stroke="currentColor"
                    />
                    <p className='text-gray-600 text-xs'>{product.averageRating}</p>
                  </div>
                  <p className='text-indigo-600 text-xs'>{product.reviews.length} review(s)</p>
                </Link >
              ))
            ) : (
              <p>No Brands found</p>
            )}
          </div>
        </div>
        {(user && user.loggedIn) &&
          <div className='flex flex-col gap-2 justify-end'>
            <hr className='hidden md:flex w-auto' />
            <div className='rounded-md hover:bg-indigo-200 transition-colors duration-300 mx-2 p-2'>
              <LogoutClient user={user.user} />
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default page