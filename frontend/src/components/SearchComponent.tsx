"use client"
import { Review } from '@/lib/types';
import React, { Fragment, useEffect, useState } from 'react'
import Card from './Card';

const SearchComponent = ({ searchResults }: { searchResults: any }) => {
    const [Reviews, setReviews] = useState<Review[] | []>([]);
    
    useEffect(() => {
        searchResults && setReviews(searchResults);
    }, [searchResults])

    return (
        <Fragment>
            {Reviews.map((review: Review) => (
                <Card review={review} key={review.id} />
            ))}
        </Fragment>
    )
}

export default SearchComponent