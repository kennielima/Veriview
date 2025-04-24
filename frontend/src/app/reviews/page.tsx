"use client"
import React, { useEffect, useState } from 'react'
import { fetchReviews } from '../hooks/useGetReviews'
import ReviewCard from '@/components/Card'
import { Review } from '@/lib/types'
import Pagination from '@/components/Pagination'

const page = () => {
    const [Reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [order, setOrder] = useState("DESC");

    useEffect(() => {
        const FetchReviews = async () => {
            const data = await fetchReviews(currentPage)
            setReviews(data?.data);
            setTotalPages(data?.totalPages);
        }
        FetchReviews();
    }, [currentPage])

    return (
        <div className='mx-auto sm:px-6 lg:px-8 md:py-8 px-16'>
            <h1 className='text-center pb-10 font-bold text-2xl'>Recent Reviews</h1>
            {(Reviews && Reviews.length > 0) && (
                <div>
                    {Reviews.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
            {(!Reviews || (Reviews.length === 0)) && (<p>No reviews found</p>)}
        </div>
    )
}

export default page