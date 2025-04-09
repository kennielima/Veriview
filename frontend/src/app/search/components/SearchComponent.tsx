"use client"
import { Review } from '@/lib/types';
import React, { Fragment, useEffect, useState } from 'react'
import Card from '@/components/Card';
import Link from 'next/link';

const SearchComponent = ({ searchResults }: { searchResults: Review[] }) => {
    const [Reviews, setReviews] = useState<Review[] | []>([]);

    useEffect(() => {
        searchResults && setReviews(searchResults);
    }, [searchResults])

    return (
        <div className='my-8'>
            {searchResults.length > 0 ? (
                Reviews.map((review: Review) => (
                    <Card review={review} key={review.id} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 mt-12">
                    <p>No Matches Found</p>
                    <Link href='/'>
                        <button className='py-1 px-3 bg-indigo-600 text-white rounded-md'> Back to Home </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default SearchComponent