"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Sort = ({ param }: { param: { page?: number; sort?: string; } }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSortChange = (e: any) => {
        e.preventDefault()
        // window.location.href = `?sort=${e.target.value}`;
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div>
            <label htmlFor="sort" className="text-sm md:text-base font-semibold mr-2">Sort Reviews by:</label>
            <select
                id="sort"
                value={param.sort || "newest"}
                onChange={handleSortChange}
                className="border border-gray-400 shadow-sm rounded-md px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
            </select>
        </div>)
}

export default Sort