import { fetchReviews } from '@/app/hooks/useGetReviews';
import SearchComponent from '@/components/SearchComponent';
import { Review } from '@/lib/types';
import React from 'react'

const page = async ({ params }: { params: any}) => {
    const searchData = await params;
    const search = (searchData as { searchTerm: string }).searchTerm

    const fetchedReviews = await fetchReviews();

    const searchResults = fetchedReviews.filter((review: Review) => review.content.includes(search) || review.content.includes(search))
    
  return (
    <SearchComponent searchResults={searchResults} />
)
}

export default page