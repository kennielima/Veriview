"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const BrandSort = ({ param }: { param: { page?: number; sort?: string; } }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortChange = (e: any) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`?${params.toString()}`);
    };
    return (
        <div className="flex items-center justify-end md:justify-center w-full">
            <label htmlFor="sort" className="font-semibold mr-2">Sort by:</label>
            <select
                id="sort"
                value={param.sort || "newest"}
                onChange={handleSortChange}
                className="border border-gray-400 shadow-sm rounded-md px-3 py-1.5 md:py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="recent">Recently Reviewed</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
                <option value="reviewcount-desc">Most Popular</option>
                <option value="reviewcount-asc">Least Popular</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
            </select>
        </div>
    )
}

export default BrandSort