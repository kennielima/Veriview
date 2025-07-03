"use client"
import { logout } from '@/app/services/useLogin'
import { User } from '@/lib/types'
import { LogOut } from 'lucide-react'
import React from 'react'

export const LogoutClient = ({ user }: { user: User }) => {
    return (
        <div className='px-4 hidden w-full md:flex justify-start font-semibold text-sm items-start'>
            <button onClick={logout} className='w-fit flex flex-col justify-center items-start gap-1 text-indigo-600'>
                <div className='flex items-center gap-1'>
                    <LogOut size="15" />
                    <span>Log out</span>
                </div>
                <div className='text-gray-600 font-medium'>{user.email}</div>
            </button>
        </div>)
}
