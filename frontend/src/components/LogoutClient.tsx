"use client"
import { logout } from '@/app/services/useLogin'
import { LogOut } from 'lucide-react'
import React from 'react'

export const LogoutClient = () => {
    return (
        <div className='pr-4 pl-12 hidden w-full md:flex justify-end font-semibold text-sm'>
            <button onClick={logout} className='w-fit flex  items-center gap-1 text-indigo-600 hover:text-indigo-700'>
                <LogOut size="15" /> Logout
            </button>
        </div>)
}
