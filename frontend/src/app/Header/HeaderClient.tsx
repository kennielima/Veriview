"use client"
import { Menu, User as UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { logout } from '../hooks/useLogin';
import { User } from '@/lib/types';
import SearchBar from '../../components/Searchbar';

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
        <header className="bg-white shadow-md py-4 sticky z-10 top-0 font-bold">
            {/* DESKTOPS */}
            <div className="container mx-auto px-4 md:px-2 lg:px-4 py-3 flex justify-between items-center">
                <Link href='/' onClick={toggleMenu}>
                    <div className="flex text-2xl font-bold text-indigo-600">ReviewHub</div>
                </Link>
                <nav className="hidden md:flex items-center space-x-0 lg:space-x-6 gap-4 text-sm">
                    <SearchBar searchCategory={"all"} setIsMenuOpen={setIsMenuOpen} />
                    <Link href='/products' className='text-gray-800 hover:text-gray-900 text-base transition'>All Brands</Link>
                    <Link href='/create-review' className='text-gray-800 hover:text-gray-900 text-base transition'>Post a Review</Link>
                </nav>
                <div className="flex items-center space-x-4 text-sm">
                    {!user || !user.loggedIn ?
                        <Link href='/login' onClick={toggleMenu}>
                            <button className='bg-indigo-600 hover:bg-indigo-700 rounded-md text-white px-4 py-2 font-bold'> Login </button>
                        </Link>
                        :
                        <Link href='/dashboard' className='text-base flex gap-1 cursor-pointer items-center text-gray-800'>
                            <UserIcon className='sm:w-5 sm:h-5' />
                            <span className='hidden sm:flex'>{currentUser?.username} </span>
                        </Link>
                    }
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* MOBILE/TABS */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-x-0 inset-t-0 inset-b-16 border border-gray-300 shadow-md top-20 p-8 bg-white z-50"
                    onMouseLeave={() => isMenuOpen && setIsMenuOpen(false)}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <SearchBar searchCategory={"all"} setIsMenuOpen={setIsMenuOpen} />
                        <Link
                            href='/products'
                            onClick={toggleMenu}
                            className='text-gray-800 hover:text-gray-900 transition'
                        >
                            All Brands
                        </Link>
                        <Link
                            href='/create-review'
                            className='text-gray-800 hover:text-gray-900 transition'
                            onClick={toggleMenu}
                        >
                            Post a Review
                        </Link>
                        {(user && (user as UserTypeProps).loggedIn) && (
                            <button
                                onClick={() => { logout; toggleMenu }}
                                className='text-white transition w-full bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md'
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default HeaderClient


{/* <div className='flex gap-4'>
                        <p className='flex gap-1 cursor-pointer'>
                                <UserIcon />
                                <span>{currentUser.username} </span>
                        </p>
                        <button onClick={logout}>Logout</button>
                    </div> */}