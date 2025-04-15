
"use client"
import { Product, Review } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Search from '../hooks/useSearch';
import Link from 'next/link';
import Card from '@/components/Card';
import { ArrowLeft, Loader } from 'lucide-react';
import ProductCard from '../../components/ProductCard';

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const category = searchParams.get("category");

    const [searchResults, setSearchResults] = useState([]);
    const [searchCount, setSearchCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchFn = async () => {
        setIsLoading(true);
        try {
            if (q) {
                const searchData = await Search({ q, category: category || "all" });
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
                        <div className='flex justify-between'>
                            <Link
                                href='#'
                                onClick={(e) => { e.preventDefault(); router.back() }}>
                                <button className="mb-6 flex items-center px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {category === "all" ? "Go Back" : `Back to ${category}`}
                                </button>
                            </Link>
                            <p>Showing {searchCount} of {searchCount} results</p>
                        </div>
                        {category === "all" &&
                            searchResults.map((review: Review) => (
                                <Card review={review} key={review.id} />
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