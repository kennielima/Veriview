"use client"
import { Menu, User as UserIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { logout } from '../hooks/useLogin';
import { User } from '@/lib/types';
import SearchBar from '../../components/Searchbar';
import { getInitials } from '@/lib/utils';

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
        <header className="bg-white shadow-md py-2 sticky z-10 top-0 font-semibold">
            {/* DESKTOPS */}
            <div className="flex justify-between w-full mx-auto px-6 py-3 items-center">
                <Link href='/' onClick={() => setIsMenuOpen(false)}>
                    <div className="flex text-2xl font-bold text-indigo-600">ReviewHub</div>
                </Link>
                <nav className="hidden md:flex md:w-3/4 mx-4 justify-center items-center space-x-6 lg:space-x-16 text-sm">
                    <SearchBar searchCategory={"all"} setIsMenuOpen={setIsMenuOpen} placeholder={"Search by review, brand..."} />
                    <Link href='/products' className=' text-black hover:text-gray-700 text-base transition'>Brands</Link>
                    <Link href='/reviews' className=' text-black hover:text-gray-700 text-base transition'>Reviews</Link>
                    <Link href='/create-review' className='text-black hover:text-gray-700 text-base transition'>Post a Review</Link>
                </nav>
                <div className="flex items-center space-x-4 text-sm">
                    {!user || !user.loggedIn ?
                        <Link href='/auth' onClick={() => setIsMenuOpen(false)}>
                            <button className='bg-indigo-600 hover:bg-indigo-700 rounded-md text-white px-4 py-2 font-bold'> Get Started </button>
                        </Link>
                        :
                        // <Link href='/dashboard' className='p-3 rounded-full bg-indigo-600 mr-2 text-white'>{getInitials(currentUser.fullName)}}
                        <Link href='/dashboard/me' className='text-base flex gap-1 cursor-pointer items-center text-black hover:text-gray-700 transition font-semibold'>
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
            {
                isMenuOpen && (
                    <div
                        className="md:hidden fixed inset-x-0 inset-t-0 inset-b-16 border border-gray-300 shadow-md top-18 p-8 bg-white z-50"
                        onMouseLeave={() => isMenuOpen && setIsMenuOpen(false)}
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            <SearchBar searchCategory={"all"} setIsMenuOpen={setIsMenuOpen} placeholder={"Search by review, brand..."} />
                            <Link
                                href='/products'
                                onClick={toggleMenu}
                                className='text-black hover:text-gray-700 transition'
                            >
                                Brands
                            </Link>
                            <Link
                                href='/reviews'
                                onClick={toggleMenu}
                                className='text-black hover:text-gray-700 transition'
                            >
                                Reviews
                            </Link>
                            <Link
                                href='/create-review'
                                className='text-black hover:text-gray-700 transition'
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
                )
            }
        </header >
    )
}

export default HeaderClient