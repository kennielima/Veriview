"use client"
import { rateProduct } from '@/app/hooks/useRating';
import { RenderStars } from '@/components/renderStars';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RateProduct = ({ id }: { id: string }) => {
    const router = useRouter();

    const [rating, setRating] = useState(0);

    const submitRating = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        rating != 0 && await rateProduct(rating, id)
        router.push(`/products/${id}`);
    }

    return (
        <form onSubmit={submitRating} className="flex flex-col justify-center gap-3">
            <div className='flex items-center space-x-1'>
                <span className='text-gray-600 text-sm'> Rate this brand: </span>
                <RenderStars rating={rating} setRating={setRating} size='size-5' />
            </div>
            <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 mb-4 md:mb-0 rounded-2xl w-3/6 md:w-full md:mx-auto'>Rate</button>
        </form>
    )
}

export default RateProduct;