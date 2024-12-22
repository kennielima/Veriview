"use client"
import { Review } from '@/lib/types';
import React, { Fragment, useEffect, useState } from 'react'
import Card from './Card';

const SearchComponent = ({ searchResults }: { searchResults: Review[] }) => {
    const [Reviews, setReviews] = useState<Review[] | []>([]);
    
    useEffect(() => {
        searchResults && setReviews(searchResults);
    }, [searchResults])
console.log(searchResults)
    return (
        <div className='my-8'>
            {Reviews.map((review: Review) => (
                <Card review={review} key={review.id} />
            ))}
        </div>
    )
}

export default SearchComponent