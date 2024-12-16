"use client"
import { Menu, User as UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { logout } from '../hooks/useLogin';
import { User } from '@/lib/types';

export type UserType = {
    loggedIn: boolean;
    user: User
}
const HeaderClient: React.FC<UserType> = (user) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log(user)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const currentUser = user.user;
    const currentUserState = user.loggedIn;
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex mx-auto text-2xl font-bold text-gray-800">
                    ReviewMe
                </div>

                <div className="flex items-center space-x-4">
                    {!user || !user.loggedIn ?
                        <Link href='/login'>
                            <button className='bg-background bg-opacity-50 rounded-md text-white px-4 py-2'> Login </button>
                        </Link>
                        :
                        <button onClick={logout} className='flex gap-1'>
                            <UserIcon className="cursor-pointer" />
                            <p>{currentUser.username} Logout</p>
                        </button>
                    }
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <X />
                        ) : (
                            <Menu />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50">
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Home</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Products</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">About</a>
                        <a href="#" className="text-xl text-gray-700 hover:text-gray-900">Contact</a>
                        <button
                            onClick={toggleMenu}
                            className="mt-8 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>)
}

export default HeaderClient