"use client"
import { deleteReview } from '@/app/hooks/useDeleteReview';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteComponent = ({ id }: { id: string }) => {
    const [error, setError] = useState('');
    const router = useRouter()

    const deleteHandler = async () => {
        try {
            await deleteReview(id);
            router.push('/');

        } catch (error) {
            setError((error as Error).message)
        }
    }
    return (
        <div className='grid gap-4'>
            <button
                className='bg-red-600  mx-auto hover:bg-opacity-80 w-fit rounded-md mt-4 text-white px-4 py-2'
                onClick={deleteHandler}
            >
                Delete
            </button>
            {error && (
                <div className="bg-red-100 w-fit mx-auto border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
        </div>
    )
}

export default DeleteComponent



// TODO COMMENTING SYSTEM
// TODO VOTING/rate as helpful SYSTEM
// DROPDOWN TO SELECT BRAND WHEN CREATING REVIEW
// truncate content on review body
// TODO USER PAGE
// optimize search functionality
