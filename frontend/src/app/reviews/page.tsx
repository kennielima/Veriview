import React from 'react'
import { fetchReviews } from '../hooks/useGetReviews'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Pagination from '@/components/Pagination'
import Sort from '@/components/Sort'

const page = async ({ searchParams }: { searchParams: { page: number, sort: string } }) => {
    const param = await searchParams;
    // console.log("params", param)
    const FetchReviews = await fetchReviews(param.page, param.sort)

    const Reviews = FetchReviews?.data;
    const totalReviews = FetchReviews?.totalReviews;
    const totalPages = FetchReviews?.totalPages;
    const hasNextPage = FetchReviews?.hasNextPage;
    const hasPrevPage = FetchReviews?.hasPrevPage;
    const offset = (param.page ? param.page : 1) * 5;

    return (
        <div className='mx-auto px-8 my-14'>
            <h1 className='text-center font-bold text-2xl'>Recent Reviews</h1>

            {(Reviews && Reviews.length > 0) && (
                <div className='flex flex-col'>
                    <div className="flex flex-col sm:flex-row md:items-center w-full md:w-4/5 mx-auto py-10 gap-4 md:gap-12 md:justify-between">
                        <p>Showing
                            <span className='font-semibold'> {hasNextPage ? offset : totalReviews} </span>
                            of
                            <span className='font-semibold'> {totalReviews} </span>
                            reviews
                        </p>
                        <div className='w-full flex justify-end'>
                            <Sort param={param} />
                        </div>
                    </div>
                    {Reviews.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                    <Pagination
                        param={param}
                        totalPages={totalPages}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                    />
                </div>
            )}
            {(!Reviews || (Reviews.length === 0)) && (<p>No reviews found</p>)}
        </div>
    )
}

export default page