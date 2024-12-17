"use client"
import { logout } from '@/app/hooks/useLogin'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex flex-col items-start mt-8'>
            <Link href='/create-review'>
                <button className="w-max mb-6 flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Create Review</button>
            </Link>
            <button onClick={logout} className='w-max bg-background bg-opacity-50 rounded-md text-white px-4 py-2'> Logout </button>
        </div>
    )
}

export default Sidebar