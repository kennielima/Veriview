import React from 'react'
import { fetchReviews } from '../hooks/useGetReviews'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Pagination from '@/components/Pagination'
import Sort from '@/components/Sort'

const page = async ({ searchParams }: { searchParams: { page: number, sort: string } }) => {
    const param = await searchParams;

    const FetchReviews = await fetchReviews(param.page, param.sort)
    const { data: Reviews, totalReviews, totalPages, hasNextPage, hasPrevPage } = FetchReviews;
    let offset = (param.page ? param.page : 1) * 5;

    return (
        <div className='mx-auto px-8 my-10'>
            <h1 className='text-center font-bold text-2xl'>Recent Reviews</h1>

            {(Reviews && Reviews.length > 0) && (
                <div className='flex flex-col'>
                    <div className="flex flex-col-reverse md:flex-row md:items-center w-full md:w-4/5 mx-auto pt-8 pb-4 md:py-10 gap-8 max-w-4xl md:justify-between">
                        {Reviews.length > 0 &&
                            <p>Showing
                                <span className='font-semibold'> {hasNextPage ? offset : totalReviews} </span>
                                of
                                <span className='font-semibold'> {totalReviews} </span>
                                reviews
                            </p>
                        }
                        <Sort param={param} />
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
            {(!Reviews || (Reviews.length === 0)) && (<p className='text-center'>No reviews found</p>)}
        </div>
    )
}

export default page