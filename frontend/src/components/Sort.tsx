"use client"
import React from 'react'

const Sort = ({ param }: { param: { page?: number; sort?: string; } }) => {

    const handleSortChange = (e: any) => {
        e.preventDefault()
        console.log(param)
        // window.location.href = `?${param.page ? `page=${param.page}&` : ""}sort=${e.target.value}`
        window.location.href = `?sort=${e.target.value}`;
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