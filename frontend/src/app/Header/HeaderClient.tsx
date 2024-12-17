"use client"
import { Menu, User as UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { logout } from '../hooks/useLogin';
import { User } from '@/lib/types';
import SearchBar from './Searchbar';

export type UserType = {
    loggedIn: boolean;
    user: User
}
const HeaderClient = ({ user }: { user: UserType }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log(user)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const currentUser = user.user;

    return (
        <header className="bg-white shadow-md py-4 sticky z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href='/'>
                    <div className="flex text-2xl font-bold text-gray-800">ReviewMe</div>
                </Link>
                {user.loggedIn &&
                    <nav className="hidden md:flex items-center space-x-6 gap-4">
                        <SearchBar />
                        <Link href='/create-review' className='text-gray-700 hover:text-gray-900 transition'>Post a Review</Link>
                        <button onClick={logout} className='text-gray-700 hover:text-gray-900 transition'>Logout</button>
                    </nav>
                }
                <div className="flex items-center space-x-4">
                    {!user || !user.loggedIn ?
                        <Link href='/login'>
                            <button className='bg-background bg-opacity-50 rounded-md text-white px-4 py-2'> Login </button>
                        </Link>
                        :
                        <p className='flex gap-1 cursor-pointer'>
                            <UserIcon />
                            <span className='hidden sm:flex'>{currentUser.username} </span>
                        </p>
                    }
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50">
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <SearchBar />
                        <Link href='/create-review' className='text-gray-700 hover:text-gray-900 transition'>Post a Review</Link>
                        <button onClick={logout} className='text-gray-700 hover:text-gray-900 transition'>Logout</button>
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


{/* <div className='flex gap-4'>
                        <p className='flex gap-1 cursor-pointer'>
                                <UserIcon />
                                <span>{currentUser.username} </span>
                        </p>
                        <button onClick={logout}>Logout</button>
                    </div> */}