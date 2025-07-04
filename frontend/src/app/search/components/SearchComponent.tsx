
"use client"

import { Product, Review } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import Search from '@/app/services/useSearch';
import Link from 'next/link';
import ReviewCard from '@/components/Card';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { capitalizeFirstLetter } from '@/lib/utils';

const SearchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const category = searchParams.get("category");

    const [searchResults, setSearchResults] = useState([]);
    const [searchCount, setSearchCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                if (q) {
                    const { data, count } = await Search({ q, category: category || "all" });
                    setSearchResults(data);
                    setSearchCount(count);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            finally {
                setIsLoading(false);
            };
        }
        fetch();
        // eslint-disable-next-line no-unused-vars
    }, [searchParams, category, q]);

    return (
        <Suspense fallback={
            <div className='flex w-full items-center justify-center text-indigo-600'>
                <LoaderCircle className='h-16 w-16 animate-spin' />
            </div>
        }>
            <div className='m-8'>
                {isLoading && (
                    <div className='flex w-full items-center justify-center text-indigo-600'>
                        <LoaderCircle className='h-16 w-16 animate-spin' />
                    </div>
                )}
                {!isLoading &&
                    (searchCount > 0 ? (
                        <div className='flex flex-col gap-4 mx-8'>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mx-10 md:mx-16'>
                                <Link
                                    href='#'
                                    onClick={(e) => { e.preventDefault(); router.back() }}>
                                    <button className="flex items-center px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        {category === "all" ? "Go Back" : `Back to ${category && capitalizeFirstLetter(category)}`}
                                    </button>
                                </Link>
                                <p>Showing all <span className='font-semibold'>{searchCount}</span> results</p>
                            </div>
                            {category === "all" &&
                                searchResults.map((review: Review) => (
                                    <ReviewCard review={review} key={review.id} />
                                ))}
                            {category === "brands" &&
                                searchResults.map((brand: Product) => (
                                    <div key={brand.id} className="mx-auto max-w-xl px-8 md:px-4 space-y-4 w-full">
                                        <ProductCard product={brand} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4 mt-12">
                            <p>No Matches Found</p>
                            <Link
                                href='#'
                                onClick={(e) => { e.preventDefault(); router.back() }}
                            >
                                <button className='py-1 px-3 bg-indigo-600 text-white rounded-md'> Go Back </button>
                            </Link>
                        </div>
                    )
                    )}
            </div>
        </Suspense>
    )
}

export default SearchComponent