"use client"
import { rateProduct } from '@/app/hooks/useRating';
import { RenderStars } from '@/components/renderStars';
import React, { useState } from 'react';

const RateProduct = ({ id }: { id: string }) => {
    const [rating, setRating] = useState(0);

    const submitRating = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        rating != 0 && await rateProduct(rating, id)
    }

    return (
        <form onSubmit={submitRating} className="flex flex-col justify-center gap-2">
            <div className='flex items-center space-x-1'>
                <span className='text-gray-600 text-sm'> Rate this product: </span>
                <RenderStars rating={rating} setRating={setRating} size='size-5' />
            </div>
            <button type='submit' className='bg-slate-800 text-white px-4 py-1 mb-4 md:mb-0 rounded-2xl w-3/6 md:w-4/6 md:mx-auto'>Rate</button>
        </form>
    )
}

export default RateProduct;