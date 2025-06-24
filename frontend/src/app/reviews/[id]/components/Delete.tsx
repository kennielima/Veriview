"use client"
import { deleteReview } from '@/app/services/useDeleteReview';
import Modal from '@/components/Modal';
import { Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteComponent = ({ id }: { id: string }) => {
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false)

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
            <div
                className='flex items-center gap-2 cursor-pointer hover:text-black'
                onClick={() => setIsOpen(true)}
            >
                <Trash2 className='size-6 cursor-pointer' onClick={() => setIsOpen(true)} />
                <p className=''>Delete</p>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div
                    className='flex w-full justify-end text-gray-600 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                >
                    <X />
                </div>
                <p className="flex w-full justify-center my-4">Are you sure you want to delete this review?</p>
                <div className='flex w-full justify-center'>
                    <button
                        className='bg-indigo-600 mx-auto hover:bg-opacity-80 w-fit rounded-md text-white px-4 py-2'
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
            {error && (
                <div className="bg-red-100 w-fit mx-auto border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
        </div>
    )
}

export default DeleteComponent


//https://www.notion.so/1cea883fc17b80b89eddef5497fc89f4?v=1cea883fc17b81ae95f5000c0f94c10a