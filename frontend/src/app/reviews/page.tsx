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
    const [sortOptions, setSortOptions] = useState("newest");
    const [sort, setSort] = useState<"createdAt" | "rating">("createdAt");
    const [order, setOrder] = useState<"DESC" | "ASC">("DESC");

    useEffect(() => {
        const FetchReviews = async () => {
            const data = await fetchReviews(currentPage, sort, order)
            setReviews(data?.data);
            setTotalPages(data?.totalPages);
        }
        FetchReviews();
    }, [currentPage, sort, order])

    const handleSortChange = (e: any) => {
        setSortOptions(e.target.value);
        if (e.target.value === "newest") {
            setSort("createdAt");
            setOrder("DESC");
        } else if (e.target.value === "oldest") {
            setSort("createdAt");
            setOrder("ASC");
        } else if (e.target.value === "highest") {
            setSort("rating");
            setOrder("DESC");
        } else if (e.target.value === "lowest") {
            setSort("rating");
            setOrder("ASC");
        }
        setCurrentPage(1);
    };
    return (
        <div className='mx-auto sm:px-6 lg:px-8 md:py-8 px-16'>
            <h1 className='text-center font-bold text-2xl'>Recent Reviews</h1>

            {(Reviews && Reviews.length > 0) && (
                <div className='flex flex-col'>
                    <div className="flex items-center py-10 justify-end">
                        <label htmlFor="sort" className="font-semibold mr-2">Sort by:</label>
                        <select
                            id="sort"
                            value={sortOptions}
                            onChange={handleSortChange}
                            className="border border-gray-400 shadow-sm rounded-md px-3 py-1.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                    {Reviews.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
            {(!Reviews || (Reviews.length === 0)) && (<p>No reviews found</p>)}
        </div>
    )
}

export default page