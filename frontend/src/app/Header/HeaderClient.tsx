"use client"
import { Menu, User as UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { logout } from '../hooks/useLogin';
import { User } from '@/lib/types';
import SearchBar from './Searchbar';

export type UserTypeProps = {
    loggedIn: boolean;
    user: User
}
const HeaderClient = ({ user }: { user: UserTypeProps }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const currentUser = user?.user;

    return (
        <header className="bg-white shadow-md py-4 sticky z-10 top-0">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href='/'>
                    <div className="flex text-2xl font-bold text-gray-800">ReviewMe</div>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 gap-4 text-sm">
                    <SearchBar />
                    <Link href='/products' className='text-gray-700 hover:text-gray-900 transition'>All Products</Link>
                    <Link href='/create-review' className='text-gray-700 hover:text-gray-900 transition'>Post a Review</Link>
                    {user?.loggedIn &&
                        <button onClick={logout} className='text-gray-700 hover:text-gray-900 transition'>Logout</button>
                    }
                </nav>
                <div className="flex items-center space-x-4 text-sm">
                    {!user || !user.loggedIn ?
                        <Link href='/login'>
                            <button className='bg-slate-800 rounded-md text-white px-4 py-2'> Login </button>
                        </Link>
                        :
                        <p className='flex gap-1 cursor-pointer items-center'>
                            <UserIcon className='sm:w-4 sm:h-4' />
                            <span className='hidden sm:flex'>{currentUser?.username} </span>
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

            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50">
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <SearchBar />
                        <Link href='/products' className='text-gray-700 hover:text-gray-900 transition'>All Products</Link>
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