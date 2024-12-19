"use client"
import { deleteReview } from '@/app/hooks/useDeleteReview';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteComponent = ({ id }: { id: string }) => {
    const router = useRouter();
    const deleteHandler = () => {
        deleteReview(id);
        router.push('/');
    }
    return (
        <button
            className='bg-red-600 hover:bg-opacity-80 rounded-md text-white px-4 py-2'
            onClick={deleteHandler}
        >
            Delete
        </button>
    )
}

export default DeleteComponent