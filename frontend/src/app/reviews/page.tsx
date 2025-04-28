"use client"
import React, { useEffect, useState } from 'react'
import { fetchReviews } from '../hooks/useGetReviews'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Pagination from '@/components/Pagination'

const page = () => {
    const [Reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(() => {
        const FetchReviews = async () => {
            const data = await fetchReviews(currentPage, sort)
            setReviews(data?.data);
            setTotalPages(data?.totalPages);
            setTotalReviews(data?.totalReviews);
            setHasNextPage(data?.hasNextPage)
            setHasPrevPage(data?.hasPrevPage)
        }
        FetchReviews();
    }, [currentPage, sort])

    const handleSortChange = (e: any) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className='mx-auto sm:px-6 lg:px-8 md:py-8 px-16'>
            <h1 className='text-center font-bold text-2xl'>Recent Reviews</h1>

            {(Reviews && Reviews.length > 0) && (
                <div className='flex flex-col'>
                    <div className="flex items-center p-10 gap-12 justify-between">
                        <p>Showing <span className='font-semibold'>5</span> of <span className='font-semibold'>{totalReviews}</span> reviews</p>
                        <div>
                            <label htmlFor="sort" className="text-sm md:text-base font-semibold mr-2">Sort Reviews by:</label>
                            <select
                                id="sort"
                                value={sort}
                                onChange={handleSortChange}
                                className="border border-gray-400 shadow-sm rounded-md px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest">Highest Rating</option>
                                <option value="lowest">Lowest Rating</option>
                            </select>
                        </div>
                    </div>
                    {Reviews.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
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