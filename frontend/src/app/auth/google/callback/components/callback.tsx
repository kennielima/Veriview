"use client"
import { UserTypeProps } from '@/app/Header/HeaderClient';
import { CircleX, Loader, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CallbackPage = ({ user }: { user: UserTypeProps }) => {
    const router = useRouter();
    const [authFailed, setAuthFailed] = useState<boolean>(false);

    useEffect(() => {
        router.refresh();
        if (user && user.loggedIn) {
            router.push('/');
        } else {
            const timer = setTimeout(() => {
                setAuthFailed(true);
            }, 500);
            const redirect = setTimeout(() => {
                router.push('/auth');
            }, 1500);

            return () => {
                clearTimeout(timer);
                clearTimeout(redirect);
            }
        }
    }, [user]);

    return (
        <div className='flex justify-center my-20 font-bold'>
            {authFailed ? (
                <div className='flex flex-col items-center gap-3'>
                    <CircleX className='h-16 w-16 text-red-500' />
                    <p className='text-red-500'>Authentication failed. Please try again.</p>
                    <p className='text-red-500'>Redirecting...</p>
                    {/* <p className='text-red-500'>Authentication failed. Please try again.</p> */}
                </div>
            ) : (
                <div className='flex flex-col items-center gap-6'>
                    <p className='text-indigo-600'>Redirecting...</p>
                    <LoaderCircle className='h-16 w-16 text-indigo-600 animate-spin' />
                    <p className='text-indigo-600'>Please wait...</p>
                </div>
            )}
        </div>
    )
}

export default CallbackPage;
