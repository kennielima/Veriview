
"use client"
import { Review } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Search from '../hooks/useSearch';
import Link from 'next/link';
import Card from '@/components/Card';
import { Loader } from 'lucide-react';

const page = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const [searchResults, setSearchResults] = useState<Review[]>([]);
    const [searchCount, setSearchCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchFn = async () => {
        setIsLoading(true);
        try {
            if (q) {
                const searchData = await Search(q as string);
                setSearchResults(searchData.data);
                setSearchCount(searchData.count);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        finally {
            setIsLoading(false);
        };
    }
    useEffect(() => {
        searchFn();
    }, [searchParams]);

    return (
        <div className='m-8'>
            {isLoading && (
                <div className='flex w-full items-center justify-center text-indigo-600'>
                    <Loader className='h-16 w-16' />
                </div>
            )}
            {!isLoading &&
                (searchCount > 0 ? (
                    <div className='flex flex-col gap-4 mx-8'>
                        <p>Showing {searchCount} of {searchCount} results</p>
                        {searchResults.map((review: Review) => (
                            <Card review={review} key={review.id} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 mt-12">
                        <p>No Matches Found</p>
                        <Link href='/'>
                            <button className='py-1 px-3 bg-indigo-600 text-white rounded-md'> Back to Home </button>
                        </Link>
                    </div>
                )
                )}
        </div>
    )
}

export default page